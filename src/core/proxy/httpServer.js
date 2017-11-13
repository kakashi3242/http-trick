/**
 * Created by tsxuehu on 8/22/17.
 */

const http = require("http");
const HttpHandle = require("./handle/httpHandle");
const ConnectHandle = require("./handle/connectHandle");
const WsHandle = require("./handle/wsHandle");


/**
 * 1、接受浏览器发出的connect请求（ws、wss、https）
 * 2、转发http请求
 * 3、转发 ws请求
 */
module.exports = class HttpServer {
    constructor(httpPort, httpsPort) {
        this.httpPort = httpPort;
        this.httpsPort = httpsPort;
        this.httpHandle = HttpHandle.getInstance();
        this.connectHandle = ConnectHandle.getInstance(this.httpPort, this.httpsPort);
        this.wsHandle = WsHandle.getInstance();
    }

    start() {
        //creat proxy server
        this.httpProxyServer = http.createServer(this.httpHandle.handle);
        // handle CONNECT request for https over http
        this.httpProxyServer.on('connect', this.connectHandle.handle);
        // websocket 请求处理
        this.httpProxyServer.on('upgrade', this.wsHandle.handle);
        //start proxy server 捕获端口冲突

        this.httpProxyServer.on('error', function (err) {
            console.log(err);
            process.exit(0);
        });

        this.httpProxyServer.listen(this.httpPort, "0.0.0.0");
    }
}