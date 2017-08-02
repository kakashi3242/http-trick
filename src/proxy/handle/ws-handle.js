var dc = require('../../datacenter');
var url = require('url');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    secure: false
});
var log = require('../../utils/log');
var wsMock = require('../ws-mock');

var proxyEvent = require('../../utils/proxyEvent');

proxyEvent.registHandleForWSProxy(proxy);

// websocket请求转发 ws测试服务器ws://echo.websocket.org/
module.exports = function websocketHandler(req, socket, head) {
    // 分配ws mock终端，没有分配到终端的和远程建立连接，分配到mock终端的和mock终端通信
    var host = req.headers.host.split(':')[0];
    var port = req.headers.host.split(':')[1];
    var path = url.parse(req.url).path;
    var protocal = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http";
    var sessionId = wsMock.getFreeSession(req.headers.host + path);

    if (sessionId) {
        // 有监控的客户端
        wsMock.handleUpgrade(req, socket, head, sessionId, req.headers.host + path)
    } else { // 不需要监听ws
        proxy.ws(req, socket, head, {
            target: {
                protocol: protocal,
                hostname: dc.resolveHost(host),
                port: port || (protocal == 'http' ? 80 : 443)
            }
        });
    }
};

