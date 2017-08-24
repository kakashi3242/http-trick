import url from "url";
import HttpProxy from "../../utils/httpProxy";
import Log from "../../utils/log";
import WsMock from "../wsmock";

let wsHandle;
export default class WsHandle {
    static getWsHandle() {
        if (!wsHandle) {
            wsHandle = new WsHandle();
        }
        return wsHandle;
    }

    constructor() {
        this.log = Log.getLog();
        // 创建httpProxy
        this.proxy = HttpProxy.getHttpProxy();
        this.wsMock = WsMock.getWsMock();
    }

    // websocket请求转发 ws测试服务器ws://echo.websocket.org/
    handle(req, socket, head) {
        // 分配ws mock终端，没有分配到终端的和远程建立连接，分配到mock终端的和mock终端通信
        var host = req.headers.host.split(':')[0];
        var port = req.headers.host.split(':')[1];
        var path = url.parse(req.url).path;
        var protocal = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http";
        var sessionId = this.wsMock.getFreeSession(req.headers.host + path);

        if (sessionId) {
            // 有监控的客户端
            this.wsMock.handleUpgrade(req, socket, head, sessionId, req.headers.host + path)
        } else { // 不需要监听ws
            this.proxy.ws(req, socket, head, {
                target: {
                    protocol: protocal,
                    hostname: dc.resolveHost(host),
                    port: port || (protocal == 'http' ? 80 : 443)
                }
            });
        }
    }
}
