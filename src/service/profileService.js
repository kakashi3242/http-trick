const EventEmitter = require("events");
const _ = require("lodash");
const fileUtil = require("../utils/file");
const path = require('path');

const defaultProfile = {
  // 转发路劲变量
  "redirectPathVariables": {},
  // 是否启用转发规则
  "enableRule": true,
  // 是否启用host解析
  "enableHost": true,
  // 是否启用filter
  "enableFilter": true,
  // 需要经过代理的域名
  "goThroughProxyConfig": '',
  // 是否使用外部http代理
  "externalProxy": false,
  "externalHttpProxy": false,
  "externalSocks5Proxy": true,
  "httpProxyIp": '',
  "httpProxyPort": 8888,
  "socks5ProxyIp": '',
  "socks5ProxyPort": 8889
};
/**
 * 代理运转需要的规则数据
 * 代理端口、超时时间、gitlab token、工程路径、是否启用转发规则
 * Created by tsxuehu on 8/3/17.
 */
module.exports = class ProfileService extends EventEmitter {
  constructor({appInfoService}) {
    super();
    // userId -> profile
    this.userProfileMap = {};
    // deviceId -> info { userId: , name: '', id: ''}
    this.deviceInfo = {};
    // 用户socks配置缓存
    this._gothroughProxyCahce = {};
    this.appInfoService = appInfoService;
    let proxyDataDir = this.appInfoService.getProxyDataDir();
    this.profileSaveDir = path.join(proxyDataDir, "profile");
    this.deviceInfoSaveFile = path.join(proxyDataDir, "deviceInfo.json");
  }

  async start() {
    defaultProfile.goThroughProxyConfig = await fileUtil.readFile(path.resolve(__dirname, 'go-through-proxy-example.txt'));

    let profileMap = await fileUtil.getJsonFileContentInDir(this.profileSaveDir);
    _.forEach(profileMap, (profile, fileName) => {
      let userId = fileName.slice(0, -5);
      // 补全profile数据
      this.userProfileMap[userId] = _.assign({}, defaultProfile, profile);;
      //this.userProfileMap[userId] = profile;

    });
    // 加载deviceId-> userID映射
    this.deviceInfo = await fileUtil.readJsonFromFile(this.deviceInfoSaveFile);

    // 加载pac文件末班
    let pacTemplateFile = await fileUtil.readFile(path.resolve(__dirname, 'proxy.pac.template.js'));
    this.pacTemplate = _.template(pacTemplateFile);
  }

  getProfile(userId) {
    return this.userProfileMap[userId] || defaultProfile;
  }

  async setProfile(userId, profile) {
    this.userProfileMap[userId] = profile;
    delete  this._gothroughProxyCahce[userId];

    let filePath = path.join(this.profileSaveDir, `${userId}.json`);
    // 将数据写入文件
    await fileUtil.writeJsonToFile(filePath, profile);
    // 发送通知
    this.emit('data-change-profile', userId, profile);
  }

  /**
   * 替换redirect中的变量引用,
   * 如果引用的变量不存在，则不做替换
   * @param clientIp
   * @param href
   * @param match
   * @param target
   */
  calcPath(userId, href, match, target) {
    if (match) {

      let matchList = href.match(new RegExp(match));

      _.forEach(matchList, function (value, index) {
        if (index == 0) return;
        var reg = new RegExp('\\$' + index, 'g');
        if (value === undefined) value = '';
        target = target.replace(reg, value);
      });

      let compiled = _.template(target, {
      //  interpolate: /{{([\s\S]+?)}}/g
      });
      let redirectPathVariables = this.getProfile(userId).redirectPathVariables;
      // 解析应用的变量
      return compiled(redirectPathVariables);
    }
  }

  /**
   *
   * @param userId
   * @param enable
   */
  async setEnableRule(userId, enable) {
    let conf = this.getProfile(userId);
    conf.enableRule = enable;
    await this.setProfile(userId, conf);
  }

  async setEnableHost(userId, enable) {
    let conf = this.getProfile(userId);
    conf.enableHost = enable;
    await this.setProfile(userId, conf);
  }

  async setEnableFilter(userId, enable) {
    let conf = this.getProfile(userId);
    conf.enableFilter = enable;
    await this.setProfile(userId, conf);
  }

  getExternalProxy(userId, deviceId) {
    let device = this.getDevice(deviceId);
    let proxy = this.getExternalHttpProxyByDeviceInfo(device);
    if (proxy) return proxy;
    if (device && !device.externalProxyCanUseUserSetting) {
      return {hasExternalProxy: false};
    }
    proxy = this.getExternalHttpProxyByUserId(userId);
    return proxy || {hasExternalProxy: false};
  }

  getExternalHttpProxyByUserId(userId) {
    let profile = this.getProfile(userId);
    if (!profile.externalProxy) {
      return;
    }
    if (profile.externalSocks5Proxy) {
      return {
        hasExternalProxy: true,
        proxyType: 'socks5',
        proxyIp: profile.socks5ProxyIp,
        proxyPort: profile.socks5ProxyPort
      }
    } else if (profile.externalHttpProxy) {
      return {
        hasExternalProxy: true,
        proxyType: 'http',
        proxyIp: profile.httpProxyIp,
        proxyPort: profile.httpProxyPort
      }
    }
  }

  getExternalHttpProxyByDeviceInfo(device) {
    if (!device || !device.externalProxy) {
      return;
    }
    if (device.externalSocks5Proxy) {
      return {
        hasExternalProxy: true,
        proxyType: 'socks5',
        proxyIp: device.socks5ProxyIp,
        proxyPort: device.socks5ProxyPort
      }
    } else if (device.externalHttpProxy) {
      return {
        hasExternalProxy: true,
        proxyType: 'http',
        proxyIp: device.httpProxyIp,
        proxyPort: device.httpProxyPort
      }
    }
  }

  /**
   * 获取转发规则启用开关
   * @param clientIp
   */
  enableRule(userId) {
    return this.getProfile(userId).enableRule;
  }

  enableHost(userId) {
    return this.getProfile(userId).enableHost;
  }

  enableFilter(userId) {
    return this.getProfile(userId).enableFilter;
  }

  // 获取clientIp对应的user id
  getUserIdBindDevice(deviceId) {
    let info = this.deviceInfo[deviceId];
    if (!info || !info.userId) {
      return 'root'
    }
    return info.userId;
  }

  isDeviceEnableMonitor(deviceId) {
    let info = this.deviceInfo[deviceId];
    if (!info) return true;
    return !info.disableMonitor;
  }

  getDevice(deviceId) {
    return this.deviceInfo[deviceId];
  }

  async setDeviceProxyInfo(deviceId, config) {

    let device = this.getDeviceInfoSetDefaultIfPossible(deviceId);

    device.externalProxyCanUseUserSetting = config.canUseUserSetting || false;
    device.externalProxy = !!config.enable;

    if (config.type) {
      device.externalHttpProxy = config.type == 'http';
      device.externalSocks5Proxy = config.type != 'http';
    }

    let hasIpPort = config.ip && config.port;
    if (device.externalHttpProxy && hasIpPort) {
      device.httpIp = config.ip || device.httpIp;
      device.httpPort = +config.port || device.httpPort;
    }
    if (device.externalSocks5Proxy && hasIpPort) {
      device.socks5Ip = config.ip || device.socks5Ip;
      device.socks5Port = +config.port || device.socks5Port;
    }

    this.deviceInfo[deviceId] = device;

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    let deviceList = this.getDeviceListBindedToUserId(device.userId);
    this.emit('data-change-deviceList', device.userId, deviceList);
  }

  getDeviceProxyInfo(deviceId) {
    let enable = false;
    let type = 'socks5';
    let ip = '';
    let port = '8889';
    let device = this.getDevice(deviceId);

    if (device) {
      enable = !!device.externalProxy;
      type = device.externalSocks5Proxy ? 'socks5' : 'http';
      if (device.externalSocks5Proxy) {
        ip = device.socks5Ip;
        port = device.socks5Port || 8889;
      } else {
        ip = device.httpIp;
        port = device.httpPort || 8888;
      }
    }
    return {
      enable, type, ip: ip + '', port: port + ''
    }
  }

  getDeviceInfoSetDefaultIfPossible(deviceId) {
    let info = this.deviceInfo[deviceId];
    if (!info) {
      info = this.deviceInfo[deviceId] = {
        id: deviceId,
        userId: '',
        name: deviceId,
        disableMonitor: false,
        hostFileName: '',
        externalProxyCanUseUserSetting: true,
        externalProxy: false,
        externalHttpProxy: false,
        externalSocks5Proxy: false,
        httpProxyIp: '',
        httpProxyPort: 8888,
        socks5ProxyIp: '',
        socks5ProxyPort: 8889
      };
    }
    return info;
  }

  async bindDevice(userId, deviceId) {
    let info = this.getDeviceInfoSetDefaultIfPossible(deviceId);
    let originUserId = info.userId;
    if (userId == originUserId) {
      return
    }
    info.userId = userId;
    this.deviceInfo[deviceId] = info;

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    let deviceList = this.getDeviceListBindedToUserId(userId);
    this.emit('data-change-deviceList', userId, deviceList);

    if (originUserId) {
      let originClientIpList = this.getDeviceListBindedToUserId(originUserId);
      this.emit('data-change-deviceList', originUserId, originClientIpList);
    }
  }

  // 解除绑定至用户
  async unbindDevice(deviceId) {
    let info = this.deviceInfo[deviceId];
    delete this.deviceInfo[deviceId];

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    if (info) {
      let originDeviceList = this.getDeviceListBindedToUserId(info.userId);
      this.emit('data-change-deviceList', info.userId, originDeviceList);
    }
  }

  async setDeviceName(deviceId, name) {
    let info = this.getDeviceInfoSetDefaultIfPossible(deviceId);

    info.name = name;

    this.deviceInfo[deviceId] = info;

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    let deviceList = this.getDeviceListBindedToUserId(info.userId);
    this.emit('data-change-deviceList', info.userId, deviceList);
  }


  async setDisableMonitor(deviceId, disableMonitor) {
    let info = this.getDeviceInfoSetDefaultIfPossible(deviceId);

    info.disableMonitor = disableMonitor;

    this.deviceInfo[deviceId] = info;

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    let deviceList = this.getDeviceListBindedToUserId(info.userId);
    this.emit('data-change-deviceList', info.userId, deviceList);
  }

  async setDeviceHostFileName(deviceId, hostFileName) {
    let info = this.getDeviceInfoSetDefaultIfPossible(deviceId);

    info.hostFileName = hostFileName;

    this.deviceInfo[deviceId] = info;

    await fileUtil.writeJsonToFile(this.deviceInfoSaveFile, this.deviceInfo);

    let deviceList = this.getDeviceListBindedToUserId(info.userId);
    this.emit('data-change-deviceList', info.userId, deviceList);
  }

  // 获取用户绑定的clientip
  getDeviceListBindedToUserId(userId) {
    let deviceList = [];
    _.forEach(this.deviceInfo, (info, deviceId) => {
      if (info.userId == userId) {
        deviceList.push(info);
      }
    });
    return deviceList;
  }

  shoudGoThrougProxy(userId, host) {
    let {hostMap, globHostArray} = this._getGoThroughProxyMap(userId);
    if (hostMap['all']) return true;
    if (hostMap[host]) {
      return true;
    }

    let finded = _.find(globHostArray, (value) => {
      return host.endsWith(value);
    });
    return !!finded;
  }
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_(PAC)_file
  generateProxyPacFile(userId, proxyIp) {
    let {
      startSocks5,
      startHttpProxy,
      pcIp,
      socks5ProxyPort,
      httpProxyPort
    } = this.appInfoService.getAppInfo();
    let proxy = 'DIRECT';
    let all = false;
    let {hostMap, globHostArray} = this._getGoThroughProxyMap(userId);
    if (hostMap['all']) {
      all = true;
    }
    if (startSocks5) {
      proxy = `SOCKS5 ${proxyIp || pcIp}:${socks5ProxyPort}`
    } else if (startHttpProxy) {
      proxy = `HTTP ${proxyIp || pcIp}:${httpProxyPort}`
    }
    let pac = this.pacTemplate({
      all,
      proxy,
      hostMap: JSON.stringify(hostMap, null, 2),
      globHostArray: JSON.stringify(globHostArray, null, 2)
    });
    return pac;
  }

  _getGoThroughProxyMap(userId) {
    if (this._gothroughProxyCahce[userId]) {
      return this._gothroughProxyCahce[userId];
    }
    let content = this.getProfile(userId).goThroughProxyConfig;
    this._gothroughProxyCahce[userId] = this._parseHost(content);
    return this._gothroughProxyCahce[userId];
  }

  _parseHost(content) {
    let result = [];
    let lines = content.replace(/#.*/g, '').split(/[\r\n]/);
    for (let i = 0, len = lines.length; i < len; i++) {
      let line = lines[i];
      let host = line.trim();
      if (host) {
        result.push(host);
      }
    }
    let globHostArray = [];
    let hostMap = {};
    _.forEach(result, (host) => {
      if (host.startsWith('*')) {
        globHostArray.push(host.substr(1, host.length));
      } else {
        hostMap[host] = 1;
      }
    });
    return {
      hostMap, globHostArray
    };
  }
};
