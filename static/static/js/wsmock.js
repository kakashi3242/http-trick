webpackJsonp([2],{156:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(306),i=s.n(n),o=s(307),c=s.n(o),a=s(309),r=s.n(a),u=s(308),d=s.n(u),l=s(5),f=s.n(l),p=null,v=1;t.default={components:{Card:i.a,List:c.a,Textinput:r.a,Message:d.a},data:function(){return{isDataCenter:!0,sessions:[],currentSessionLocalId:1,filterKey:""}},methods:{search:function(e){this.filterKey=e},selectSession:function(e){this.currentSessionLocalId=e,this.currentSession.hasNewMsg=!1},comingMsg:function(e){e.localId!=this.currentSession.localId&&(e.hasNewMsg=!0)},openSession:function(e){var t=v++;this.currentSessionLocalId=t,this.sessions.push({localId:t,sessionId:"",hasNewMsg:!1,urlPattern:e,messages:[{content:"等待服务器分配调试会话ID",date:new Date,type:"cmd"}]}),p.emit("opensession",e)},closeSession:function(e){var t=f.a.findIndex(this.sessions,function(t){return t.localId==e}),s=this.sessions[t].sessionId;this.sessions.splice(t,1),p.emit("closesession",s),this.currentSessionLocalId==e&&(t>0&&t--,this.currentSessionLocalId=this.sessions[t]&&this.sessions[t].localId)},assignedSessionId:function(e,t){var s=f.a.find(this.sessions,function(t){return t.urlPattern==e});s&&(s.sessionId=t,this.comingMsg(s),s.messages.push({content:"分配到调试会话ID: "+t,date:new Date,type:"cmd"}))},connectionBuild:function(e){var t=f.a.find(this.sessions,function(t){return t.sessionId==e});t&&(this.comingMsg(t),t.messages.push({content:"和目标页面建立调试连接",date:new Date,type:"cmd"}))},sendMsg:function(e){this.currentSession&&(this.currentSession.messages.push({content:e,date:new Date,type:"me"}),p.emit("debuggermsg",this.currentSession.sessionId,e))},recieve:function(e,t){var s=f.a.find(this.sessions,function(t){return t.sessionId==e});s&&(this.comingMsg(s),s.messages.push({content:t,date:new Date,type:"page"}))},connectionBreak:function(e){var t=f.a.find(this.sessions,function(t){return t.sessionId==e});t&&(this.comingMsg(t),t.messages.push({content:"页面终止调试会话，等待新的页面接入调试会话",date:new Date,type:"cmd"}))}},computed:{currentSession:function(){var e=this;return f.a.find(this.sessions,function(t){return t.localId==e.currentSessionLocalId})}},created:function(){window.io&&(p=io("/wsmock"),p.on("assignedsessionid",this.assignedSessionId),p.on("page-msg",this.recieve),p.on("page-connected",this.connectionBuild),p.on("page-closed",this.connectionBreak))}}},157:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{onKeyup:function(e){this.$dc.search(e.target.value)},requestAddSession:function(){var e=this;this.$prompt("请输入要拦截的WebSocket url特征","新建调试会话",{confirmButtonText:"新建会话",cancelButtonText:"取消"}).then(function(t){var s=t.value;e.$dc.openSession(s)})}}}},158:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},159:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2);t.default={methods:{showTime:function(e,t){return"cmd"==e.type||0==t||e.date.getTime()-this.$dc.currentSession.messages[t-1].date.getTime()>3e5}},filters:{time:function(e){return"string"==typeof e&&(e=new Date(e)),e.getHours()+":"+e.getMinutes()}},directives:{"scroll-bottom":{componentUpdated:function(e){n.default.nextTick(function(){e.scrollTop=e.scrollHeight-e.clientHeight})}}}}},160:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{content:""}},methods:{onKeyup:function(e){e.ctrlKey&&13===e.keyCode&&this.content.length&&(this.$dc.sendMsg(this.content),this.content="")}}}},167:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2),i=s(94),o=s.n(i),c=s(18),a=s.n(c),r=s(17),u=s.n(r),d=s(8);s.n(d);n.default.use(u.a),n.default.use(a.a),new n.default({el:"#app",render:function(e){return e(o.a)}})},235:function(e,t){},240:function(e,t){},241:function(e,t){},242:function(e,t){},243:function(e,t){},306:function(e,t,s){s(241);var n=s(0)(s(157),s(330),"data-v-75813fd3",null);e.exports=n.exports},307:function(e,t,s){s(240);var n=s(0)(s(158),s(329),"data-v-7398033e",null);e.exports=n.exports},308:function(e,t,s){s(235);var n=s(0)(s(159),s(319),"data-v-308cedd8",null);e.exports=n.exports},309:function(e,t,s){s(242);var n=s(0)(s(160),s(331),"data-v-79eddb8a",null);e.exports=n.exports},319:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"scroll-bottom",rawName:"v-scroll-bottom"}],staticClass:"message"},[e.$dc.currentSession?s("ul",e._l(e.$dc.currentSession.messages,function(t,n){return s("li",[e.showTime(t,n)?s("p",{staticClass:"time"},[s("span",[e._v(e._s(e._f("time")(t.date))+" "+e._s("cmd"==t.type?"- "+t.content:""))])]):e._e(),e._v(" "),"cmd"!=t.type?s("div",{staticClass:"main",class:{self:"me"==t.type}},[s("span",{staticClass:"avatar avatar-img"},[e._v("\n            "+e._s("me"==t.type?"我":e.$dc.currentSession.urlPattern.charAt(0))+"\n          ")]),e._v(" "),s("div",{staticClass:"text"},[e._v(e._s(t.content))])]):e._e()])})):e._e()])},staticRenderFns:[]}},329:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"list"},[s("ul",e._l(e.$dc.sessions,function(t){return s("li",{staticClass:"session-row",class:{active:t.localId===e.$dc.currentSession.localId,newmsg:t.hasNewMsg},on:{click:function(s){e.$dc.selectSession(t.localId)}}},[s("span",{staticClass:"avatar avatar-img"},[e._v("\n        "+e._s(t.urlPattern.charAt(0))+"\n      ")]),e._v(" "),s("p",{staticClass:"name"},[e._v(e._s(t.urlPattern))]),e._v(" "),s("p",{staticClass:"msg-state"}),e._v(" "),s("p",{staticClass:"close",on:{click:function(s){e.$dc.closeSession(t.localId)}}},[e._v("X")])])}))])},staticRenderFns:[]}},330:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card"},[s("div",{staticClass:"header"},[s("p",{staticClass:"name"},[e._v("WebSocket Mock")]),e._v(" "),s("p",{staticClass:"add",on:{click:e.requestAddSession}},[e._v("+")])])])},staticRenderFns:[]}},331:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],attrs:{placeholder:"按 Ctrl + Enter 发送"},domProps:{value:e.content},on:{keyup:e.onKeyup,input:function(t){t.target.composing||(e.content=t.target.value)}}})])},staticRenderFns:[]}},334:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"sidebar"},[s("card"),e._v(" "),s("list")],1),e._v(" "),s("div",{staticClass:"main"},[s("message"),e._v(" "),s("textinput")],1)])},staticRenderFns:[]}},8:function(e,t){},94:function(e,t,s){s(243);var n=s(0)(s(156),s(334),null,null);e.exports=n.exports}},[167]);
//# sourceMappingURL=wsmock.js.map