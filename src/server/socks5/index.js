const net = require('net');
const util = require('util');
const EventEmitter = require('events');
const http = require('http');
const _http_server = require('_http_server');
const _http_common = require('_http_common');
const tls = require('tls');
const crypto = require("crypto");
const updns = require('../dns/index');


let createSecureContext = tls.createSecureContext || crypto.createSecureContext;

const Parser = require('./server.parser');
const ipbytes = require('./utils').ipbytes;
const HttpHandle = require("../http/handle/httpHandle");
const WsHandle = require("../http/handle/wsHandle");

const ServiceRegistry = require("../../service");
const NoneAuth = require("./auth/None");
const UserPassword = require("./auth/UserPassword");

const {ATYP, CMD, REP} = require('./constants');
const kServerResponse = Symbol('ServerResponse');
const kIncomingMessage = Symbol('IncomingMessage');
// -------------- 常量 --------------
// 没有支持的认证
const BUF_AUTH_NO_ACCEPT = Buffer.from([0x05, 0xFF]);

const BUF_REP_INTR_SUCCESS = Buffer.from([0x05,
  REP.SUCCESS,
  0x00,
  0x01,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00]);

const BUF_REP_DISALLOW = Buffer.from([0x05, REP.DISALLOW]);
// 命令不支持
const BUF_REP_CMDUNSUPP = Buffer.from([0x05, REP.CMDUNSUPP]);

/**
 *  forward TCP connection to a new HTTP req/res
 *
 *  解析socks5协议，根据配置信息 将连接转给http处理器，或者远端
 *  调用socket的pause resume方法，控制数据的接受
 */
module.exports = class Server extends EventEmitter {
  constructor({
                socks5Port,
                dnsPort
              }) {
    super();
    this.httpHandle = HttpHandle.getInstance();
    this.wsHandle = WsHandle.getInstance();

    this.socks5Port = socks5Port;

    this._connections = 0;
    this.maxConnections = 1000;

    this._authMap = {};

    // 引用的服务
    this.hostService = ServiceRegistry.getHostService();
    this.profileService = ServiceRegistry.getProfileService();
    this.certificationService = ServiceRegistry.getCertificationService();
    this.dnsMockService = ServiceRegistry.getDnsMockService();
    this.configureService = ServiceRegistry.getConfigureService();
    this.logService = ServiceRegistry.getLogService();

    this.useAuth(new UserPassword());
    this.useAuth(new NoneAuth());
  }

  async start() {

    let logService = ServiceRegistry.getLogService();
    // 创建socket
    let server = this.server = new net.Server();
    // 为server绑定ServerResponse、IncomingMessage类
    let httpServer = http.createServer();
    let symbolKeys = Object.getOwnPropertySymbols(httpServer);
    for (let symbolKey of symbolKeys) {
      if (!server[symbolKey]) {
        server[symbolKey] = httpServer[symbolKey];
      }
    }
    // server[_http_server.kServerResponse] = http.ServerResponse;
    // server[_http_common.kIncomingMessage] = http.IncomingMessage;

    server.on('connection', socket => {
      if (this._connections >= this.maxConnections) { // 超过最大连接数拒绝连接
        socket.destroy();
        return;
      }
      ++this._connections;
      socket.once('close', had_err => {
        --this._connections;
      });
      // 处理请求链接
      this._handleSocks5Connection(socket);
    });
    server.on('error', err => {
      logService.error(err);
    });
    server.on('listening', err => {
      logService.info('socks5 proxy listening');
    });
    server.on('close', err => {
      logService.info('socks5 proxy closed');
    });

    server.on('request', (req, res) => {
      this.httpHandle.handle(req, res).catch(err => {
        logService.error('socks5 server process request error', err);
        handleProxyError(req.socket, err);
      });
    });

    server.on('upgrade', (req, res) => {
      this.wsHandle.handle(req, res).catch(err => {
        logService.error('socks5 server process upgrade error', err);
        handleProxyError(req.socket, err);
      });
    });


    server.on('error', function (err) {
      logService.error('socks5 server error', err);
    });

    server.on('clientError', (err, socket) => {
      logService.error('socks5 server clientError', err);
      handleProxyError(socket, err);
    });

    server.listen(this.socks5Port);
  }

  /**
   * 处理socket链接
   * @param socket
   * @private
   */
  _handleSocks5Connection(socket) {
    let logService = ServiceRegistry.getLogService();
    let self = this;
    let parser = new Parser(socket);
    parser.on('error', function (err) {
      logService.error(err)
      if (socket.writable)
        socket.end();
    });
    parser.on('methods', function (methods) { // 验证
      let authsMap = self._authMap;
      let auth = null;
      for (let i = 0; i < methods.length; i++) {
        let method = methods[i];
        auth = authsMap[method];
        if (auth && auth.needUserName) break;
      }
      if (auth) {
        auth.server(socket, function (result, user, pass) {
          if (result === true) {
            parser.authed = true;
            parser.username = user;
            parser.password = pass;
            parser.start();
          } else {
            if (util.isError(result)) {

            }
            socket.end();
          }
        });
        socket.write(Buffer.from([0x05, auth.METHOD]));
        socket.resume();
      } else {
        socket.end(BUF_AUTH_NO_ACCEPT);
      }
    });
    parser.on('request', function (reqInfo) { // 请求数据
      if (reqInfo.cmd !== 'connect') {
        return socket.end(BUF_REP_CMDUNSUPP);
      } else {
        socket.write(BUF_REP_INTR_SUCCESS)
      }
      self.proxySocket(socket, reqInfo);
    });

    function onClose() {
      if (socket.dstSock && socket.dstSock.writable)
        socket.dstSock.end();
      socket.dstSock = undefined;
    }

    // 为客户端连接绑定事件
    socket.on('error', onErrorNoop);
    socket.on('end', onClose);
    socket.on('close', onClose);
  }

  /**
   * 代理socket请求
   * @param socket
   * @param req
   */
  async proxySocket(socket, req) {
    let logService = this.logService;
    let profileService = this.profileService;
    let dnsMockService = this.dnsMockService;
    // 通过默认端口号判断通信协议
    try {
      let needResume = true;// 对于透传，pipe函数会自动resume
      let clientIp = req.srcAddr;
      let deviceId = req.username;// 将认证的username当做deviceId
      if (!deviceId) { // 如果没有认证，则拿clientIp作为deviceId
        deviceId = clientIp;
      }
      let userId = this.profileService.getUserIdBindDevice(deviceId);
      let isIp = this.hostService.isIp(req.dstAddr);
      let hostName = '';
      let targetIp = '';
      if (isIp) {
        hostName = dnsMockService.resolveMockedDomain(req.dstAddr);
      }

      let goThroughProxy = false;

      if (isIp && hostName) { // 连接代理dns的情况
        goThroughProxy = true;
        targetIp = await this.hostService.resolveHostDirect(userId, hostName, deviceId);
      } else { // 未连接代理dns的情况
        if (isIp) {
          goThroughProxy = true;
          targetIp = req.dstAddr;
        } else if (profileService.shoudGoThrougProxy(userId, req.dstAddr)) {
          hostName = req.dstAddr;
          goThroughProxy = true;
          targetIp = await this.hostService.resolveHostDirect(userId, req.dstAddr, deviceId);
        } else { // 透传
          targetIp = await this.hostService.resolveHostWithoutProfile(req.dstAddr);
        }
      }

      // 请求socket
      if (goThroughProxy) {
        if (req.dstPort == 443) {
          // tls
          let context = await this.certificationService.getHostSecurityContext(hostName);
          let tlsSocket = new tls.TLSSocket(socket, {
            isServer: true,
            key: context.keyPem,
            cert: context.certPem
          });

          tlsSocket.deviceId = deviceId;
          tlsSocket.clientIp = clientIp;
          tlsSocket.userId = userId;
          tlsSocket.socks5 = true;
          http._connectionListener.call(this.server, tlsSocket);
          /* tlsSocket.on('data', data => {
               console.log('tlsSocket ------- ', data.toString())
           })*/
          tlsSocket.on('error', e => {
            console.log(e)
            handleProxyError(tlsSocket, e);
          })
        } else {
          socket.deviceId = deviceId;
          socket.clientIp = clientIp;
          socket.userId = userId;
          socket.socks5 = true;
          http._connectionListener.call(this.server, socket);
        }
      } else {
        needResume = false;
        let targetPort = req.dstPort;

        let dstSock = new net.Socket();
        dstSock.setKeepAlive(false);
        let connected = false;
        dstSock.on('error', (err) => {
          if (!connected)
            handleProxyError(socket, err);
        });
        dstSock.on('connect', function () {
          connected = true;
          if (socket.writable) {
            socket.pipe(dstSock).pipe(socket);
            socket.resume();
          } else if (dstSock.writable)
            dstSock.end();
        });
        dstSock.connect(targetPort, targetIp);
        socket.dstSock = dstSock;
      }

      if (needResume) {
        socket.resume();
      }
    } catch (err) {
      console.error('socks ', err);
      handleProxyError(socket, err);
    }
  }

  useAuth(auth) {
    this._authMap[auth.METHOD] = auth;
  }

  close(cb) {
    this.server.close(cb);
  }
};


function onErrorNoop(err) {
}

function handleProxyError(socket, err) {
  if (socket.writable) {
    var errbuf = Buffer.from([0x05, REP.GENFAIL]);
    if (err.code) {
      switch (err.code) {
        case 'ENOENT':
        case 'ENOTFOUND':
        case 'ETIMEDOUT':
        case 'EHOSTUNREACH':
          errbuf[1] = REP.HOSTUNREACH;
          break;
        case 'ENETUNREACH':
          errbuf[1] = REP.NETUNREACH;
          break;
        case 'ECONNREFUSED':
          errbuf[1] = REP.CONNREFUSED;
          break;
      }
    }
    socket.end(errbuf);
  }
}
