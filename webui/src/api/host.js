/**
 * Created by tsxuehu on 17/1/9.
 */

import axios from 'axios';
import debounce from 'lodash/debounce';
var api = {
    /**
     * 创建规则文件
     */
    createFile(name, description){
        return axios.post('/host/create',{
            name:name,
            description:description
        });
    },
    /**
     * 获取规则文件列表
     */
    getFileList(){
        return axios.get('/host/filelist');
    },
    deleteFile(name){
        return axios.get(`/host/deletefile?name=${name}`);
    },
    useFile(name){
        return axios.get(`/host/usefile?name=${name}`);
    },
    getFileContent(name){
        return axios.get(`/host/getfile?name=${name}`);
    },
    saveFile(name,content){
        return axios.post(`/host/savefile?name=${name}`,content);
    }
};
api.debouncedUseFile = debounce(function (name, callback) {
    api.useFile(name).then((response) => {
        callback(response)
    });
}, 500);
export default  api;
