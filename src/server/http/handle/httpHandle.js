const zlib = require("zlib");
const parseUrl = require("../../../utils/parseUrl");
const log = require("../../../utils/log");
const requestResponseUtils = require("../../../utils/requestResponseUtils");
const ServiceRegistry = require("../../../service/index");
const Action = require("../action/index");
const getClientIp = require("../../../utils/getClientIp");
const _ = require("lodash");
const cookie = require("cookie");
const sendSpecificToClient = require("../../../utils/sendSpecificToClient");
// request session id seed
let httpHandle;
module.exports = class HttpHandle {

  static getInstance() {
    if (!httpHandle) {
      httpHandle = new HttpHandle();
    }
    return httpHandle;
  }

  constructor() {
    this.ruleService = ServiceRegistry.getRuleService();
    this.logService = ServiceRegistry.getLogService();
    this.profileService = ServiceRegistry.getProfileService();
    this.appInfoService = ServiceRegistry.getAppInfoService();
    this.filterService = ServiceRegistry.getFilterService();
    this.httpTrafficService = ServiceRegistry.getHttpTrafficService();
  }

  /**
   * 正常的http请求处理流程，
   * 处理流程 更具转发规则、mock规则
   */
  async handle(req, res) {

    let clientIp = ''; // 设备ip
    let deviceId = '';// 设备id
    let userId = '';// 设备绑定的用户id
    let socks5proxy = req.socket.socks5;

    if (socks5proxy) { // socks5协议
      deviceId = req.socket.deviceId;
      clientIp = req.socket.clientIp;
      userId = req.socket.userId;
    } else {// http代理协议
      clientIp = getClientIp(req);
      deviceId = clientIp; // 将设备的ip当做设备的id
      userId = this.profileService.getUserIdBindDevice(deviceId);
    }

    // 解析请求参数
    let urlObj = parseUrl(req);

    // 如果是 ui server请求，则直接转发不做记录
    if (this.appInfoService.isWebUiRequest(urlObj.hostname, urlObj.port)) {
      Action.getBypassAction().run({
        req, res, urlObj, toClientResponse: {
          headers: {},
          requestData: {}
        },
        requestContent: {},
        additionalRequestHeaders: {},
        actualRequestHeaders: {},
        additionalRequestQuery: {},
        actualRequestQuery: {},
        additionalRequestCookies: {},
        actualRequestCookies: {}
      });
      return;
    }

    // 规则处理
    let needRecordTraffic = this.httpTrafficService.hasMonitor(userId)
      && this.profileService.isDeviceEnableMonitor(deviceId);
    let requestId = -1;
    // 如果有客户端监听请求内容，则做记录
    if (needRecordTraffic) {
      // 记录请求
      requestId = this.httpTrafficService.getRequestId(userId, urlObj);
      if (requestId > -1) {
        this.httpTrafficService.requestBegin({
          userId,
          clientIp,
          deviceId,
          id: requestId,
          urlObj,
          method: req.method,
          httpVersion: req.httpVersion,
          headers: req.headers
        });
      }
    }
    try {
      // 是否需要记录请求日志
      let recordResponse = needRecordTraffic && requestId > -1;

      // =====================================================
      // 限流 https://github.com/tjgq/node-stream-throttle

      let enableHost = this.profileService.enableHost(userId);
      // 查找匹配到的过滤规则
      let enableFilter = this.profileService.enableFilter(userId);
      let filterRuleList = await this.filterService.getMatchedRuleList(userId, deviceId, enableFilter, req.method, urlObj);
      // 匹配的规则
      let enableRule = this.profileService.enableRule(userId)
      let matchedRule = this.ruleService.getProcessRule(userId, deviceId, enableRule, req.method, urlObj);

      let toClientResponse = await this._runAtions({
        req, res, urlObj, requestId, recordResponse,
        clientIp, userId, deviceId, enableFilter, enableRule, enableHost,
        rule: matchedRule, filterRuleList
      });

      // 处理结束 记录额外的请求日志(附加的请求头、cookie、body)
      // 请求已经发送给浏览器
      if (recordResponse) {
        toClientResponse.requestEndTime = Date.now();
        this.httpTrafficService.actualRequest({
          userId,
          id: requestId,
          requestData: toClientResponse.requestData
        });
        this.httpTrafficService.serverReturn({
          userId,
          id: requestId,
          toClientResponse: toClientResponse
        });
      }
    } catch (e) {
      console.error(e, urlObj);
    }

  }

  /**
   * 运行规则
   */
  async _runAtions({
                     req, res, urlObj, requestId, recordResponse,
                     clientIp, deviceId, userId, enableFilter, enableRule, enableHost,
                     rule, filterRuleList
                   }) {
    // 原始的请求头部
    let requestContent = {
      hasContent: false,
      method: '',
      protocol: '',
      hostname: '',
      path: '',
      query: {}, // query对象
      port: '',
      headers: {},
      body: ''
    };
    // 额外发送的头部
    let additionalRequestHeaders = {};
    let actualRequestHeaders = {}; // 实际发出的请求的header
    // 额外发送的query
    let additionalRequestQuery = {};
    let actualRequestQuery = {}; // 实际发出的请求的query
    // 额外发送的cookie
    let additionalRequestCookies = {};
    let actualRequestCookies = {}; // 实际发出的请求的cookies

    // 要发送给浏览器的内容
    let toClientResponse = {
      hasContent: false,// 是否存在要发送给浏览器的内容
      sendedToClient: false, // 已经向浏览器发送响应内容
      stopRunAction: false, // 停止运行action
      requestData: {// 发送请求时使用的数据
        method: '',
        protocol: '',
        port: '',
        path: '',
        headers: {},
        body: ''
      },
      remoteIp: '',// 远程服务器器ip
      receiveRequestTime: Date.now(), // 接收到请求的时间
      dnsResolveBeginTime: 0,// dns解析开始时间
      remoteRequestBeginTime: 0,// 请求开始时间
      remoteResponseStartTime: 0,// 服务器响应开始时间
      remoteResponseEndTime: 0,// 服务器响应结束时间
      requestEndTime: 0,// 响应结束时间
      statusCode: 200,
      headers: {},// 要发送给浏览器的header
      body: ''// 要发送给浏览器的body
    };

    // 记录设备新信息
    toClientResponse.headers['proxy-userId'] = userId;
    toClientResponse.headers['proxy-deviceId'] = deviceId;
    toClientResponse.headers['proxy-clientIp'] = clientIp;
    // 记录状态信息
    toClientResponse.headers['proxy-host-enable'] = enableHost ? "true" : "false";
    toClientResponse.headers['proxy-filter-enable'] = enableFilter ? "true" : "false";
    toClientResponse.headers['proxy-rule-enable'] = enableRule ? "true" : "false";

    // 合并所有匹配到的过滤器规则的action列表、请求匹配的规则的 action 列表
    // 动作分为请求前和请求后两种类型, 合并后的顺序，前置过滤器动作 -> 请求匹配到的动作 -> 后置过滤器的动作
    // 合并后的数组 item 格式 {action, rule}， action: 要执行的动作，rule: 动作所属的rule
    let willRunActionList = this._mergeToRunAction(filterRuleList, rule);
    let willRunActionListLength = willRunActionList.length;

    // 执行前置动作
    for (let i = 0; i < willRunActionListLength; i++) {

      // 已经向浏览器发送响应，则停止规则处理
      if (toClientResponse.sendedToClient || toClientResponse.stopRunAction) {
        break;
      }
      // 取出将要运行的动作描述信息
      let actionInfo = willRunActionList[i];
      // 对每一个规则 执行action
      let action = actionInfo.action;
      let rule = actionInfo.rule;
      let actionHandler = Action.getAction(action.type);

      // 若action handle不存在，则处理下一个
      if (!actionHandler) {
        toClientResponse.headers[`proxy-action-${i}`] = encodeURI(`${rule.method}-${rule.match}-${action.type}-not_found`);
        continue;
      }
      // 已经有response, 则不运行获取response的action
      if (actionHandler.willGetContent() && toClientResponse.hasContent) {
        toClientResponse.headers[`proxy-action-${i}`] = encodeURI(`${rule.method}-${rule.match}-${action.type}-not_run`);
        continue;
      }
      // 响应头里面记录运行的动作
      toClientResponse.headers[`proxy-action-${i}`] = encodeURI(`${rule.method}-${rule.match}-${action.type}-run`);

      // 动作需要返回内容，但是当前却没有返回内容
      if (actionHandler.needResponse() && !toClientResponse.hasContent) {
        await Action.getBypassAction().run({
          req,
          res,
          recordResponse,
          urlObj,
          clientIp,
          deviceId,
          userId,
          rule, // 规则
          action, // 规则里的一个动作
          requestContent, // 请求内容 , 动作使用这个参数 需要让needRequestContent函数返回true
          additionalRequestHeaders, // 请求头
          actualRequestHeaders,
          additionalRequestQuery,
          actualRequestQuery,
          additionalRequestCookies, // cookie
          actualRequestCookies,
          toClientResponse, //响应内容,  动作使用这个参数 需要让needResponse函数返回true
          last: false
        });
      }
      // 动作需要请求内容，但是当前却没有请求内容
      if (actionHandler.needRequestContent() && !requestContent.hasContent) {
        requestContent = await requestResponseUtils.getClientRequestContent(
          req,
          urlObj);
      }
      // 运行action
      await actionHandler.run({
        req,
        res,
        recordResponse,
        urlObj,
        clientIp,
        deviceId,
        userId,
        rule, // 规则
        action, // 规则里的一个动作
        requestContent, // 请求内容 , 动作使用这个参数 需要让needRequestContent函数返回true
        additionalRequestHeaders, // 请求头
        actualRequestHeaders,
        additionalRequestQuery,
        actualRequestQuery,
        additionalRequestCookies, // cookie
        actualRequestCookies,
        toClientResponse, //响应内容,  动作使用这个参数 需要让needResponse函数返回true
        last: i == (willRunActionListLength - 1)
      });
    }

    // 动作运行完还没响应浏览器、则响应浏览器
    if (!toClientResponse.sendedToClient && !res.finished) {
      if (toClientResponse.hasContent) {
        try {
          sendSpecificToClient({
            res,
            statusCode: toClientResponse.statusCode,
            headers: toClientResponse.headers,
            content: toClientResponse.body
          });
        } catch (e) {
          this.logService.error(e);
          this.logService.log(toClientResponse)
          this.logService.log(urlObj)
        }
      } else {
        // 自定请求
        toClientResponse.headers['proxy-rule-add'] = 'bypass';
        await Action.getBypassAction().run({
          req,
          res,
          recordResponse,
          urlObj,
          clientIp,
          userId,
          deviceId,
          requestContent, // 请求内容 , 动作使用这个参数 需要让needRequestContent函数返回true
          additionalRequestHeaders, // 请求头
          actualRequestHeaders,
          additionalRequestQuery,
          actualRequestQuery,
          additionalRequestCookies, // cookie
          actualRequestCookies,
          toClientResponse, //响应内容,  动作使用这个参数 需要让needResponse函数返回true
          last: true
        });
      }

    }

    return toClientResponse;
  }

  /**
   * 合并过滤规则，和请求处理规则
   *  生成要执行的action列表
   * @param filterRules
   * @param processRule
   * @private
   */
  _mergeToRunAction(filterRules, processRule) {
    let beforeFilterActionsInfo = [];
    let afterFilterActionsInfo = [];

    _.forEach(filterRules, rule => {
      _.forEach(rule.actionList, action => {
        let actionHandler = Action.getAction(action.type);
        if (actionHandler.needResponse()) {
          afterFilterActionsInfo.push({
            action: action, // 动作
            rule: rule // 动作关联的规则
          });
        } else {
          beforeFilterActionsInfo.push({
            action: action,
            rule: rule
          });
        }
      });
    });

    let ruleActionsInfo = [];
    _.forEach(processRule.actionList, action => {
      ruleActionsInfo.push({
        action: action,
        rule: processRule
      });
    });
    return beforeFilterActionsInfo.concat(ruleActionsInfo).concat(afterFilterActionsInfo);
  }
};
