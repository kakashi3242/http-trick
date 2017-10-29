const path = require("path");
const EventEmitter = require("events");
const _ = require("lodash");
module.exports = class AppInfoService extends EventEmitter {

    constructor(single) {
        super();
        // 用户home目录
        let userHome = process.env.HOME || process.env.USERPROFILE;
        // proxy data存放目录
        this.proxyDataDir = path.join(userHome, ".front-end-proxy");
        // app信息
        this.appInfo = {
            "single": single,
            "realUiPort": "",
            "realProxyPort": "",
            "pcIp": "",
        };

        this.appDir = path.join(__dirname, "../../../")
    }

    start(){

    }

    getAppDir() {
        return this.appDir;
    }

    /**
     * 设置app 运行信息
     * @param info
     */
    setAppInfo(info) {
        _.assign(this.appInfo, info);
        this.emit('data-change', this.appInfo)
    }

    /**
     * 是否是单用户模式
     * @returns {boolean|*}
     */
    isSingle() {
        return this.appInfo.single;
    }

    /**
     * 本地存放数据的目录
     * @returns {*}
     */
    getProxyDataDir() {
        return this.proxyDataDir;
    }

    /**
     * 真实的 ui 端口
     * @returns {string}
     */
    getRealUiPort() {
        return this.appInfo.realUiPort;
    }

    /**
     * 设置真实的 ui 端口
     * @param uiport
     */
    setRealUiPort(uiport) {
        this.setAppInfo({
            realUiPort: uiport
        });
    }

    /**
     * 真实的代理端口
     * @returns {string}
     */
    getRealProxyPort() {
        return this.appInfo.realProxyPort;
    }

    /**
     * 设置正在运行的代理端口
     * @param proxyport
     */
    setRealProxyPort(proxyport) {
        this.setAppInfo({
            realProxyPort: proxyport
        });
    }

    /**
     * 设置机器ip
     * @param pcIp
     */
    setPcIp(pcIp) {
        this.setAppInfo({
            pcIp: pcIp
        });
    }

    /**
     * 获取机器ip
     * @returns {string}
     */
    getPcIp() {
        return this.appInfo.pcIp;
    }
}