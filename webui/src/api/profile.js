/**
 * Created by tsxuehu on 17/1/9.
 */

import axios from 'axios';
export default {
    saveFile(content){
        return axios.post('/profile/savefile', content);
    },
    disableRule(){
        return axios.post(`/profile/setRuleState`);
    },
    enableRule(){
        return axios.post(`/profile/setRuleState?rulestate=1`);
    }
}
