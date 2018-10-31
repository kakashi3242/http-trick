/**
 * Created by tsxuehu on 17/1/9.
 */

import axios from 'axios';

export default {
    saveFile(content) {
        return axios.post('/profile/savefile', content);
    },
    disableRule() {
        return axios.post(`/profile/setRuleState`);
    },
    enableRule() {
        return axios.post(`/profile/setRuleState?rulestate=1`);
    },
    disableHost() {
        return axios.post(`/profile/setHostState`);
    },
    enableHost() {
        return axios.post(`/profile/setHostState?hoststate=1`);
    },
    disableFilter() {
        return axios.post(`/profile/setFilterState`);
    },
    enableFilter() {
        return axios.post(`/profile/setFilterState?filterstate=1`);
    },
    getUserId() {
        return axios.get(`/profile/getUserId`);
    },
    setUserId(userId) {
        return axios.get(`/profile/setUserId?userId=${userId}`);
    },
    unBind(id) {
        return axios.get(`/profile/device/unbind?deviceId=${id}`);
    },
    setDeviceName(deviceId, name) {
        return axios.get(`/profile/device/setName?deviceId=${deviceId}&name=${encodeURI(name)}`);
    },
    disableMonitor(deviceId) {
        return axios.get(`/profile/device/disableMonitor?deviceId=${deviceId}`);
    },
    enableMonitor(deviceId) {
        return axios.get(`/profile/device/enableMonitor?deviceId=${deviceId}`);
    }
}
