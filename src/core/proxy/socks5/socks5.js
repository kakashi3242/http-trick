const net = require('net');
const util = require('util');
const EventEmitter = require('events');
const http = require('http');
const tls = require('tls');
const crypto = require("crypto");
const updns = require('updns');
const randomIpv4 = require('random-ipv4');

let createSecureContext = tls.createSecureContext || crypto.createSecureContext;

const Parser = require('./server.parser');
const ipbytes = require('./utils').ipbytes;

const HttpHandle = require("../http/handle/httpHandle");

const ServiceRegistry = require("../../service");
const NoneAuth = require("./auth/None");
const UserPassword = require("./auth/UserPassword");

const ATYP = require('./constants').ATYP;
const CMD = require('./constants').CMD;
const REP = require('./constants').REP;

// -------------- 常量 --------------
// 没有支持的认证
const BUF_AUTH_NO_ACCEPT = new Buffer([0x05, 0xFF]);

const BUF_REP_INTR_SUCCESS = new Buffer([0x05,
    REP.SUCCESS,
    0x00,
    0x01,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00]);

const BUF_REP_DISALLOW = new Buffer([0x05, REP.DISALLOW]);
// 命令不支持
const BUF_REP_CMDUNSUPP = new Buffer([0x05, REP.CMDUNSUPP]);

/**
 *  forward TCP connection to a new HTTP req/res
 */
module.exports = class Server extends EventEmitter {
    constructor({
                    socks5Port,
                    httpPort,
                    httpsPort,
                    dnsPort
                }) {
        super();
        this.httpHandle = HttpHandle.getInstance();

        this.socks5Port = socks5Port;
        this.httpPort = httpPort;
        this.httpsPort = httpsPort;
        this._connections = 0;
        this.maxConnections = 1000;
        this._authMap = {};
        this.hostService = ServiceRegistry.getHostService();
        this.profileService = ServiceRegistry.getProfileService();
        this.certificationService = ServiceRegistry.getCertificationService();
        this.configureService = ServiceRegistry.getConfigureService();

        this.dnsPort = dnsPort;
        this._dnsHostIpCache = {};
        this._dnsIpHostCache = {};

        let self = this;

        // 创建socket
        this._srv = new net.Server(function (socket) {
            if (self._connections >= self.maxConnections) { // 超过最大连接数拒绝连接
                socket.destroy();
                return;
            }
            ++self._connections;
            socket.once('close', function (had_err) {
                --self._connections;
            });
            // 处理请求链接
            self._handleSocks5Connection(socket);
        }).on('error', function (err) {
            self.emit('error', err);
        }).on('listening', function () {
            self.emit('listening');
        }).on('close', function () {
            self.emit('close');
        });

        this._srv.on('request', (req, res) => {
            this.httpHandle.handle(req, res).catch(e => {
                console.error(e);
            });

        });
        this._srv.on('error', function (err) {
            console.log(err);
        });

    }

    /**
     * 处理socket链接
     * @param socket
     * @private
     */
    _handleSocks5Connection(socket) {
        let self = this;
        let parser = new Parser(socket);
        parser.on('error', function (err) {
            console.log(err)
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
                socket.write(new Buffer([0x05, auth.METHOD]));
                socket.resume();
            } else {
                socket.end(BUF_AUTH_NO_ACCEPT);
            }
        });
        parser.on('request', function (reqInfo) { // 请求数据
            if (reqInfo.cmd !== 'connect')
                return socket.end(BUF_REP_CMDUNSUPP);
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
        // 通过默认端口号判断通信协议
        try {
            let needResume = true;// 对于透传，等远程连接建立后再resume
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
                targetIp = req.dstAddr;
                hostName = this._dnsIpHostCache[targetIp];
            } else {
                hostName = req.dstAddr;
                targetIp = await this.hostService.resolveHostDirect(userId, req.dstAddr);
            }

            let canSocksProxy = (isIp && hostName) || !isIp;
            // 请求socket
            if (canSocksProxy && (req.dstPort == 80 || req.dstPort == 12345)) {
                socket.deviceId = deviceId;
                socket.clientIp = clientIp;
                socket.userId = userId;
                socket.socks5 = true;
                http._connectionListener.call(this._srv, socket);

            } else if (canSocksProxy && req.dstPort == 443) {
                // tls
                let context = await this.certificationService.getCertificationForHost(hostName);
                let tlsSocket = new tls.TLSSocket(socket, {
                    isServer: true,
                    key: context.key,
                    cert: context.cert
                });

                tlsSocket.deviceId = deviceId;
                tlsSocket.clientIp = clientIp;
                tlsSocket.userId = userId;
                tlsSocket.socks5 = true;
                http._connectionListener.call(this._srv, tlsSocket);
                /* tlsSocket.on('data', data => {
                     console.log('tlsSocket ------- ', data.toString())
                 })
                 tlsSocket.on('error', e => {
                     console.log(e)
                 })*/
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
            // 向client发送连接成功消息
            let localbytes = ipbytes('0.0.0.0'),
                len = localbytes.length,
                bufrep = new Buffer(6 + len),
                p = 4;
            bufrep[0] = 0x05;
            bufrep[1] = REP.SUCCESS;
            bufrep[2] = 0x00;
            bufrep[3] = (len === 4 ? ATYP.IPv4 : ATYP.IPv6);
            for (let i = 0; i < len; ++i, ++p)
                bufrep[p] = localbytes[i];
            bufrep.writeUInt16BE(0, p, true);
            socket.write(bufrep);
            if (needResume) {
                socket.resume();
            }
        } catch (err) {
            handleProxyError(socket, err);
        }
    }

    useAuth(auth) {
        this._authMap[auth.METHOD] = auth;
        return this;
    }

    async start() {

        this.useAuth(new UserPassword());
        this.useAuth(new NoneAuth());
        this._srv.listen(this.socks5Port);


        let server = updns.createServer(this.dnsPort);
        this.server = server;
        server.on('error', error => {
            console.log(error)
        });

        server.on('listening', server => {
            console.log('DNS service has started')
        });

        server.on('message', (domain, send, proxy) => {
            if (this._dnsHostIpCache[domain]) {
                send(this._dnsHostIpCache[domain]);
                return;
            }
            let can = this.profileService.canSocksProxy('root', domain);
            // 如果是要抓包的域名 则解析
            if (can) {
                while (true) {
                    let ip = randomIpv4('198.18.{token}.{token}');
                    if (!this._dnsIpHostCache[ip]) {
                        this._dnsIpHostCache[ip] = domain;
                        this._dnsHostIpCache[domain] = ip;
                        send(ip);
                        return;
                    }
                }
            } else {
                proxy('172.17.1.236')
            }
        });


        return this;
    }

    address() {
        return this._srv.address();
    }

    getConnections(cb) {
        this._srv.getConnections(cb);
    }

    close(cb) {
        this._srv.close(cb);
        return this;
    }
};


function onErrorNoop(err) {
}

function handleProxyError(socket, err) {
    if (socket.writable) {
        var errbuf = new Buffer([0x05, REP.GENFAIL]);
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
