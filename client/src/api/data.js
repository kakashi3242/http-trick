/**
 * Created by tsxuehu on 17/1/9.
 */

import axios from 'axios';
import uuidV4  from 'uuid/v4';
export default {
  getDataList(){
    return axios.get('/data/getdatalist');
  },

  removeDataFile(content){
    return axios.post('/data/removedatafile', content);
  },

  createDataFile(content){
    return axios.post('/data/createdatafile', content);
  },

  // 获取版本数据
  getDataFile(id){
    return axios.get(`/data/getdatafile?id=${id}`);
  },

  // 保存版本数据
  saveDataFile(id, content){
    var data = new FormData();
    data.append('content', content);
    return axios.post(`/data/savedatafile?id=${id}`, data);
  },
  //
  saveDataEntryFromTraffic(reqId, name, contenttype){
    return axios.post('/data/savedatafromtraffic', {
      id: uuidV4(),
      name: name,
      contenttype: contenttype,
      reqid: reqId
    });
  }
}
