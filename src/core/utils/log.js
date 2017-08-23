var path = require('path');

var log4js = require('log4js');
var dc = require('../datacenter');
var conf = dc.getConf();
var file = require('./file');

log4js.configure(path.join(__dirname, '../../conf/log4js.json'), {cwd: file.getUserHomeConfDir()});

export default class Log {
    static getLog() {

    }

    getExceptionLog() {
        var log = log4js.getLogger('exception');
        log.setLevel(conf.exceptionLogLevel || 'error');
        return log;
    }

    getConnectLog() {
        var log = log4js.getLogger('connect');
        log.setLevel(conf.connectLogLevel || 'error');
        return log;
    }

    getRequestLog() {
        var log = log4js.getLogger('request');
        log.setLevel(conf.requestLogLevel || 'error');
        return log;
    }
}