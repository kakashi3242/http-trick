webpackJsonp([2],{122:function(n,t,e){"use strict";var s=e(397),i=e(398),a=e(400),o=e(399),r=e(5),c=e.n(r),d=null,l=1;t.a={components:{Card:s.a,List:i.a,Textinput:a.a,Message:o.a},data:function(){return{isDataCenter:!0,sessions:[],currentSessionLocalId:1,filterKey:""}},methods:{search:function(n){this.filterKey=n},selectSession:function(n){this.currentSessionLocalId=n,this.currentSession.hasNewMsg=!1},comingMsg:function(n){n.localId!=this.currentSession.localId&&(n.hasNewMsg=!0)},openSession:function(n){var t=l++;this.currentSessionLocalId=t,this.sessions.push({localId:t,sessionId:"",hasNewMsg:!1,urlPattern:n,messages:[{content:"等待服务器分配调试会话ID",date:new Date,type:"cmd"}]}),d.emit("opensession",n)},closeSession:function(n){var t=c.a.findIndex(this.sessions,function(t){return t.localId==n}),e=this.sessions[t].sessionId;this.sessions.splice(t,1),d.emit("closesession",e),this.currentSessionLocalId==n&&(t>0&&t--,this.currentSessionLocalId=this.sessions[t]&&this.sessions[t].localId)},assignedSessionId:function(n,t){var e=c.a.find(this.sessions,function(t){return t.urlPattern==n});e&&(e.sessionId=t,this.comingMsg(e),e.messages.push({content:"分配到调试会话ID: "+t,date:new Date,type:"cmd"}))},connectionBuild:function(n){var t=c.a.find(this.sessions,function(t){return t.sessionId==n});t&&(this.comingMsg(t),t.messages.push({content:"和目标页面建立调试连接",date:new Date,type:"cmd"}))},sendMsg:function(n){this.currentSession&&(this.currentSession.messages.push({content:n,date:new Date,type:"me"}),d.emit("debuggermsg",this.currentSession.sessionId,n))},recieve:function(n,t){var e=c.a.find(this.sessions,function(t){return t.sessionId==n});e&&(this.comingMsg(e),e.messages.push({content:t,date:new Date,type:"page"}))},connectionBreak:function(n){var t=c.a.find(this.sessions,function(t){return t.sessionId==n});t&&(this.comingMsg(t),t.messages.push({content:"页面终止调试会话，等待新的页面接入调试会话",date:new Date,type:"cmd"}))}},computed:{currentSession:function(){var n=this;return c.a.find(this.sessions,function(t){return t.localId==n.currentSessionLocalId})}},created:function(){window.io&&(d=io("/wsmock"),d.on("assignedsessionid",this.assignedSessionId),d.on("page-msg",this.recieve),d.on("page-connected",this.connectionBuild),d.on("page-closed",this.connectionBreak))}}},123:function(n,t,e){"use strict";t.a={methods:{onKeyup:function(n){this.$dc.search(n.target.value)},requestAddSession:function(){var n=this;this.$prompt("请输入要拦截的WebSocket url特征","新建调试会话",{confirmButtonText:"新建会话",cancelButtonText:"取消"}).then(function(t){var e=t.value;n.$dc.openSession(e)})}}}},124:function(n,t,e){"use strict";t.a={}},125:function(n,t,e){"use strict";var s=e(1);t.a={methods:{showTime:function(n,t){return"cmd"==n.type||0==t||n.date.getTime()-this.$dc.currentSession.messages[t-1].date.getTime()>3e5}},filters:{time:function(n){return"string"==typeof n&&(n=new Date(n)),n.getHours()+":"+n.getMinutes()}},directives:{"scroll-bottom":{componentUpdated:function(n){s.default.nextTick(function(){n.scrollTop=n.scrollHeight-n.clientHeight})}}}}},126:function(n,t,e){"use strict";t.a={data:function(){return{content:""}},methods:{onKeyup:function(n){n.ctrlKey&&13===n.keyCode&&this.content.length&&(this.$dc.sendMsg(this.content),this.content="")}}}},173:function(n,t,e){"use strict";function s(n){r||e(445)}var i=e(122),a=e(409),o=e(0),r=!1,c=s,d=e.i(o.a)(i.a,a.a,a.b,!1,c,null,null);d.options.__file="src/wsmock/App.vue",t.a=d.exports},21:function(n,t){},219:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e(1),i=e(173),a=e(30),o=e.n(a),r=e(29),c=e.n(r),d=e(21);e.n(d);s.default.use(c.a),s.default.use(o.a),new s.default({el:"#app",render:function(n){return n(i.a)}})},269:function(n,t,e){t=n.exports=e(3)(),t.push([n.i,'\n.message[data-v-21e0bf4e] {\n  padding: 10px 15px;\n  overflow-y: scroll;\n}\n.message li[data-v-21e0bf4e] {\n  margin-bottom: 15px;\n}\n.message .time[data-v-21e0bf4e] {\n  margin: 7px 0;\n  text-align: center;\n}\n.message .time >\nspan[data-v-21e0bf4e] {\n  display: inline-block;\n  padding: 0 18px;\n  font-size: 12px;\n  color: #fff;\n  border-radius: 2px;\n  background-color: #dcdcdc;\n}\n.message .avatar[data-v-21e0bf4e] {\n  float: left;\n  margin: 0 10px 0 0;\n}\n.message .text[data-v-21e0bf4e] {\n  display: inline-block;\n  position: relative;\n  padding: 0 10px;\n  max-width: calc(100% - 40px);\n  min-height: 30px;\n  line-height: 2.5;\n  font-size: 12px;\n  text-align: left;\n  word-break: break-all;\n  background-color: #fafafa;\n  border-radius: 4px\n}\n.message .text[data-v-21e0bf4e]\n:before {\n  content: " ";\n  position: absolute;\n  top: 9px;\n  right: 100%;\n  border: 6px solid transparent;\n  border-right-color: #fafafa;\n}\n.message .self[data-v-21e0bf4e] {\n  text-align: right;\n}\n.message .self .avatar[data-v-21e0bf4e] {\n  float: right;\n  margin: 0 0 0 10px;\n}\n.message .self .text[data-v-21e0bf4e] {\n  background-color: #b2e281\n}\n.message .self .text[data-v-21e0bf4e]\n:before {\n  right: inherit;\n  left: 100%;\n  border-right-color: transparent;\n  border-left-color: #b2e281;\n}\n.avatar-img[data-v-21e0bf4e] {\n  width: 30px;\n  height: 30px;\n  display: inline-block;\n  border-radius: 15px;\n  line-height: 30px;\n  text-align: center;\n  background-color: #808080;\n  -webkit-transform: rotate(20deg);\n          transform: rotate(20deg);\n  color: #fff;\n}\n.message[data-v-21e0bf4e] {\n  height: calc(100% - 160px);\n}\n',""])},270:function(n,t,e){t=n.exports=e(3)(),t.push([n.i,"\n.card[data-v-560e43d9] {\n  padding: 12px;\n  border-bottom: solid 1px #24272C;\n}\n.card .header[data-v-560e43d9] {\n  line-height: 45px;\n  height: 45px;\n}\n.card .header .name[data-v-560e43d9] {\n  display: inline-block;\n  margin: 0 0 0 5px;\n  font-size: 16px;\n  vertical-align: top;\n}\n.card .header .add[data-v-560e43d9] {\n  line-height: 1;\n  display: inline-block;\n  font-weight: bold;\n  font-size: 30px;\n  height: 30px;\n  vertical-align: top;\n  margin-top:3px;\n  margin-left: 5px;\n  cursor: pointer;\n}\n.card .search-container[data-v-560e43d9] {\n  margin-top: 10px;\n}\n.card .search[data-v-560e43d9] {\n  padding: 0 10px;\n  width: 100%;\n  font-size: 12px;\n  color: #fff;\n  height: 30px;\n  line-height: 30px;\n  border: solid 1px #3a3a3a;\n  border-radius: 4px;\n  outline: none;\n  background-color: #26292E;\n}\n\n",""])},271:function(n,t,e){t=n.exports=e(3)(),t.push([n.i,'\n.text[data-v-71bf2978] {\n    height: 160px;\n    border-top: solid 1px #ddd;\n}\n.text textarea[data-v-71bf2978] {\n    padding: 10px;\n    height: 100%;\n    width: 100%;\n    border: none;\n    outline: none;\n    font-family: "Micrsofot Yahei";\n    resize: none;\n}\n.text[data-v-71bf2978] {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n}\n\n',""])},272:function(n,t,e){t=n.exports=e(3)(),t.push([n.i,"\n.list li[data-v-b27dfb32] {\n  padding: 12px 15px;\n  border-bottom: 1px solid #292C33;\n  cursor: pointer;\n  -webkit-transition: background-color .1s;\n  transition: background-color .1s\n}\n.list li[data-v-b27dfb32]:hover {\n  background-color: rgba(255, 255, 255, 0.03)\n}\n.list li.active[data-v-b27dfb32] {\n  background-color: rgba(255, 255, 255, 0.1)\n}\n.list .avatar[data-v-b27dfb32], .list .name[data-v-b27dfb32] {\n  vertical-align: middle;\n}\n.list .name[data-v-b27dfb32] {\n  display: inline-block;\n  margin: 0 0 0 5px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 120px;\n}\n.session-row[data-v-b27dfb32] {\n  position: relative;\n}\n.newmsg .msg-state[data-v-b27dfb32] {\n  position: absolute;\n  background-color: #00ff00;\n  width: 8px;\n  height: 8px;\n  border-radius: 4px;\n  top: 22px;\n  right: 25px;\n}\n.close[data-v-b27dfb32]{\n  position: absolute;\n  top: 18px;\n  right: 5px;\n}\n",""])},274:function(n,t,e){t=n.exports=e(3)(),t.push([n.i,"\n.avatar-img {\n  width: 30px;\n  height: 30px;\n  display: inline-block;\n  border-radius: 15px;\n  line-height: 30px;\n  text-align: center;\n  background-color: #808080;\n  -webkit-transform: rotate(20deg);\n          transform: rotate(20deg);\n  color: #fff;\n}\n#app {\n  margin: 20px auto;\n  width: 800px;\n  height: 600px;\n\n  overflow: hidden;\n  border-radius: 3px;\n}\n#app .sidebar, #app .main {\n  height: 100%;\n}\n#app .sidebar {\n  float: left;\n  width: 200px;\n  color: #f4f4f4;\n  background-color: #2e3238;\n}\n#app .main {\n  position: relative;\n  overflow: hidden;\n  background-color: #eee;\n}\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\nbody, html {\n  height: 100%;\n  overflow: hidden;\n}\nbody, ul {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  color: #4d4d4d;\n  font: 14px/1.4em 'Helvetica Neue', Helvetica, 'Microsoft Yahei', Arial, sans-serif;\n  background-size: cover;\n  font-smoothing: antialiased;\n}\nul {\n  list-style: none;\n}\n\n",""])},397:function(n,t,e){"use strict";function s(n){r||e(441)}var i=e(123),a=e(421),o=e(0),r=!1,c=s,d=e.i(o.a)(i.a,a.a,a.b,!1,c,"data-v-560e43d9",null);d.options.__file="src/wsmock/components/card.vue",t.a=d.exports},398:function(n,t,e){"use strict";function s(n){r||e(443)}var i=e(124),a=e(431),o=e(0),r=!1,c=s,d=e.i(o.a)(i.a,a.a,a.b,!1,c,"data-v-b27dfb32",null);d.options.__file="src/wsmock/components/list.vue",t.a=d.exports},399:function(n,t,e){"use strict";function s(n){r||e(440)}var i=e(125),a=e(407),o=e(0),r=!1,c=s,d=e.i(o.a)(i.a,a.a,a.b,!1,c,"data-v-21e0bf4e",null);d.options.__file="src/wsmock/components/message.vue",t.a=d.exports},400:function(n,t,e){"use strict";function s(n){r||e(442)}var i=e(126),a=e(424),o=e(0),r=!1,c=s,d=e.i(o.a)(i.a,a.a,a.b,!1,c,"data-v-71bf2978",null);d.options.__file="src/wsmock/components/textinput.vue",t.a=d.exports},407:function(n,t,e){"use strict";e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{directives:[{name:"scroll-bottom",rawName:"v-scroll-bottom"}],staticClass:"message"},[n.$dc.currentSession?e("ul",n._l(n.$dc.currentSession.messages,function(t,s){return e("li",[n.showTime(t,s)?e("p",{staticClass:"time"},[e("span",[n._v(n._s(n._f("time")(t.date))+" "+n._s("cmd"==t.type?"- "+t.content:""))])]):n._e(),n._v(" "),"cmd"!=t.type?e("div",{staticClass:"main",class:{self:"me"==t.type}},[e("span",{staticClass:"avatar avatar-img"},[n._v("\n            "+n._s("me"==t.type?"我":n.$dc.currentSession.urlPattern.charAt(0))+"\n          ")]),n._v(" "),e("div",{staticClass:"text"},[n._v(n._s(t.content))])]):n._e()])})):n._e()])},i=[];s._withStripped=!0},409:function(n,t,e){"use strict";e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"sidebar"},[e("card"),n._v(" "),e("list")],1),n._v(" "),e("div",{staticClass:"main"},[e("message"),n._v(" "),e("textinput")],1)])},i=[];s._withStripped=!0},421:function(n,t,e){"use strict";e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"card"},[e("div",{staticClass:"header"},[e("p",{staticClass:"name"},[n._v("WebSocket Mock")]),n._v(" "),e("p",{staticClass:"add",on:{click:n.requestAddSession}},[n._v("+")])])])},i=[];s._withStripped=!0},424:function(n,t,e){"use strict";e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"text"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:n.content,expression:"content"}],attrs:{placeholder:"按 Ctrl + Enter 发送"},domProps:{value:n.content},on:{keyup:n.onKeyup,input:function(t){t.target.composing||(n.content=t.target.value)}}})])},i=[];s._withStripped=!0},431:function(n,t,e){"use strict";e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"list"},[e("ul",n._l(n.$dc.sessions,function(t){return e("li",{staticClass:"session-row",class:{active:t.localId===n.$dc.currentSession.localId,newmsg:t.hasNewMsg},on:{click:function(e){n.$dc.selectSession(t.localId)}}},[e("span",{staticClass:"avatar avatar-img"},[n._v("\n        "+n._s(t.urlPattern.charAt(0))+"\n      ")]),n._v(" "),e("p",{staticClass:"name"},[n._v(n._s(t.urlPattern))]),n._v(" "),e("p",{staticClass:"msg-state"}),n._v(" "),e("p",{staticClass:"close",on:{click:function(e){n.$dc.closeSession(t.localId)}}},[n._v("X")])])}))])},i=[];s._withStripped=!0},440:function(n,t,e){var s=e(269);"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e(4)("33fbb76c",s,!1)},441:function(n,t,e){var s=e(270);"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e(4)("05316dc8",s,!1)},442:function(n,t,e){var s=e(271);"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e(4)("0fb40abb",s,!1)},443:function(n,t,e){var s=e(272);"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e(4)("2131502c",s,!1)},445:function(n,t,e){var s=e(274);"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e(4)("133fdf92",s,!1)}},[219]);
//# sourceMappingURL=wsmock.js.map