import Action from './action'

export default class ModifyResponseHeader extends Action{
    static getModifyResponseHeader(){

    }

    /**
     * 运行处理动作
     */
    run({
            req,
            res,
            urlObj,
            rule, // 规则
            action, // 规则里的一个动作
            extraRequestHeaders, // 请求头
            toClientResponse, //响应内容
            last = true
        }) {

    }
}

var queryString = require('query-string');
var _ = require('lodash');
var errorRes = require('../response/error');
exports.run = function ({req, res, urlObj, action, actionIndex, toSendResponse}) {

    toSendResponse.headers[`fe-proxy-action-${actionIndex}`] = `modifyResponseHeader ${action.data.modifyResponseHeader}`;
    // req.headers.origin || ''
    toSendResponse.headers['Access-Control-Allow-Origin'] = '*';
    // toSendResponse.headers['Vary'] =  'Origin';
    toSendResponse.headers['Access-Control-Allow-Credentials'] = true;
    toSendResponse.headers['Access-Control-Allow-Methods'] = req.headers['Access-Control-Request-Method'] || '';
    toSendResponse.headers['Access-Control-Allow-Headers'] = req.headers['Access-Control-Request-Headers'] || '';


    var method = req.method;
    if (_.lowerCase(method) == 'option') {
        toSendResponse.headers['Access-Control-Max-Age'] = 86400;
    } else if (action.data.modifyResponseHeader == 'return404') {
        errorRes(req, res, 404, 'user want');
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
};


