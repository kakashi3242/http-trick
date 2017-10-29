const EventEmitter = require("events");
const _ = require("lodash");
const path = require("path");
const fileUtil = require("../../core/utils/file");

/**
 * 数据mock
 */
module.exports = class MockDataService extends EventEmitter {
    constructor({userService, appInfoService}) {
        super();
        this.userService = userService;
        this.appInfoService = appInfoService;

        let proxyDataDir = this.appInfoService.getProxyDataDir();

        // 存放mock data的目录
        this.mockDataDir = path.join(proxyDataDir, "mock-data");
        // userId -> datalist
        this.mockDataList = {};
    }

    start(){

    }

    /**
     * 获取数据文件内容
     * @param clientIp
     * @param dataId
     */
    async getDataContent(userId, dataId) {
        let dataFilePath = this._getDataFilePath(userId, dataId);
        return await fileUtil.readFile(dataFilePath);
    }


    /**
     * 获取数据文件的 content type
     * {id:'',contenttype:'',name:''}
     * @returns {*}
     */
    async getDataFileContentType(userId, dataId) {
        let list = this.mockDataList[userId];
        // 寻找
        let finded = _.find(list, entry => {
            return entry.id == dataId;
        });
        if (!finded) return '';
        return finded.contenttype + ';charset=utf-8';
    }

    /**
     * 获取某个用户的数据列表
     * @param userId
     * @returns {*}
     */
    getMockDataList(userId) {
        return this.mockDataList[userId];
    }

    /**
     * 保存数据文件列表，清除无用的数据文件
     * @param userId
     * @param dataList
     */
    async saveMockDataList(userId, dataList) {
        // 找出要被被删除的数据文件, 老的数据文件里有，而新的没有
        let newDataKeys = new Set();
        let toRemove = [];
        dataList.forEach(data => {
            newDataKeys.add(data.id)
        });
        this.mockDataList[userId].forEach(data => {
            if (!newDataKeys.has(data.id)) {
                toRemove.push(data.id);
            }
        });
        // 设置新值
        this.mockDataList[userId] = dataList;
        let listFilePath = this._getListFilePath(userId);
        fileUtil.writeJsonToFile(listFilePath, content);

        // 删除文件
        for (let data of toRemove) {
            let dataPath = this._getDataFilePath(userId, data.id);
            await fileUtil.readFile(dataPath);
        }
    }

    /**
     * 用户保存数据文件
     * @param userId
     * @param dataFileId
     * @param content
     */
    async saveDataFileContent(userId, dataFileId, content) {
        let dataFilePath = this._getDataFilePath(userId, dataFileId);
        await fileUtil.writeFile(dataFilePath, content);
    }

    /**
     * 用户获取数据文件详情
     * @param userId
     * @param dataFileId
     */
    async getDataFileContent(userId, dataFileId) {
        let dataFilePath = this._getDataFilePath(userId, dataFileId);
        return await fileUtil.readFile(dataFilePath);
    }

    /**
     * 用户从监控窗保存一个数据文件
     */
    async saveDataEntryFromTraffic(userId, dataFileId, fileName, contentType, content) {
        let dataList = this.mockDataList[userId];
        dataList.push({
            id: dataFileId,
            name: fileName,
            contenttype: contentType
        });
        // 保存mock数据文件列表
        let listFilePath = this._getListFilePath(userId);
        fileUtil.writeJsonToFile(listFilePath, content);
        // 保存数据文件
        let dataFilePath = this._getDataFilePath(userId, dataFileId);
        await fileUtil.writeFile(dataFilePath, content);
    }

    /**
     * 获取数据文件路径
     * @param userId
     * @param dataId
     * @private
     */
    _getDataFilePath(userId, dataId) {
        return path.join(this.mockDataDir, "data", userId + "_" + dataId);
    }

    /**
     * 获取数据文件列表
     * @param userId
     * @private
     */
    _getListFilePath(userId) {
        return path.join(this.mockDataDir, "list", userId + ".json");
    }
}