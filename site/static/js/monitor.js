webpackJsonp([1],{100:function(t,e,n){"use strict";var i=n(12),r=n.n(i),a=n(11),s=n.n(a),c=n(120),o=n.n(c),u=n(146),l=n.n(u),d=n(5),f=n.n(d),v=n(377),p=n(370),h=n(376),m=n(204),_=n(17),g=n(202);e.a={components:{HttpTraffic:v.a,Detail:p.a,DeviceList:h.a},data:function(){return{isDataCenter:!0,appInfo:{},userId:"guest",bindedDeviceList:[],width:0,height:0,recordMap:{},originRecordArray:[],filterdRecordArray:[],selectId:"",rightClickId:"",rightClickDeviceId:"",currentRequestBody:"",currentResponseBody:"",requestingClear:!1,state:{stopRecord:!1,overflow:!1},filter:{host:"",path:""}}},computed:{total:function(){return this.filterdRecordArray.length},currentRow:function(){return this.recordMap[this.selectId]||{}},rightClickRow:function(){return this.recordMap[this.rightClickId]},rightClickDevice:function(){var t=this;return this.bindedDeviceList.find(function(e){return e.id==t.rightClickDeviceId})||{}},originRequestHeader:function(){try{return this.currentRow.originRequest.headers}catch(t){return{}}},originRequestCookie:function(){try{return m.a(this.currentRow.originRequest.headers.cookie||"")}catch(t){return{}}},originRequestQueryParams:function(){try{return m.b(this.currentRow.originRequest.path)}catch(t){return{}}},requestHeader:function(){try{return this.currentRow.requestData.headers}catch(t){return{}}},requestCookie:function(){try{return m.a(this.currentRow.requestData.headers.cookie||"")}catch(t){return{}}},requestQueryParams:function(){try{return m.b(this.currentRow.requestData.path)}catch(t){return{}}},responseHeader:function(){try{var t=o()({},this.currentRow.response.headers);return delete t["set-cookie"],t}catch(t){return{}}},setCookies:function(){try{return this.currentRow.response.headers["set-cookie"]||[]}catch(t){return[]}},timeline:function(){return{"请求":""}}},methods:{changeUser:function(){},requestToggleRecordState:function(){this.state.stopRecord=!this.state.stopRecord,m.c(this.state.stopRecord)},requestClear:function(){this.requestingClear=!0,this.clear(),m.d()},filterRecords:function(){var t=this,e=[],n=this.filter,i=n.host,r=n.path;this.originRecordArray.forEach(function(n){var a=t.recordMap[n],s=a.originRequest;s&&s.host.indexOf(i)>-1&&s.path.indexOf(r)>-1&&e.push(a.id)}),this.filterdRecordArray=e},calcSize:function(){this.width=l()(window).width(),this.height=l()(window).height()-28},receiveTraffic:function(t){var e=this;if(!this.state.stopRecord&&!this.requestingClear){var n=this.filter,i=n.host,r=n.path;f.a.forEach(t,function(t){var n=t.id,a=!!e.recordMap[n],s=e.recordMap[n]||{};o()(s,t),e.$set(e.recordMap,n,s),a||e.originRecordArray.push(n);var c=t.originRequest;c&&c.host.indexOf(i)>-1&&c.path.indexOf(r)>-1&&e.filterdRecordArray.push(n)})}},setCurrentRowIndex:function(t){var e=this;return s()(r.a.mark(function n(){var i;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(e.selectId!=t){n.next=2;break}return n.abrupt("return");case 2:if(e.selectId=t,e.currentRequestBody="",e.currentResponseBody="",i=e.recordMap[t],!/(json)|(x-www-form-urlencoded)/i.test(i.originRequest.headers["content-type"])){n.next=10;break}return n.next=9,m.e(t);case 9:e.currentRequestBody=n.sent;case 10:if(n.prev=10,!/(text)|(javascript)|(json)/i.test(i.response.headers["content-type"])){n.next=15;break}return n.next=14,m.f(t);case 14:e.currentResponseBody=n.sent;case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(10),console.log(n.t0);case 20:case"end":return n.stop()}},n,e,[[10,17]])}))()},setRightClickedRecordId:function(t){this.rightClickId=t},setRightClickedDeviceId:function(t){this.rightClickDeviceId=t},setFilter:function(t){var e=this.filter;e.path==t.path&&e.host==t.host||(this.filter=t)},setState:function(t){this.state=t},clear:function(){this.recordMap={},this.originRecordArray=[],this.filterdRecordArray=[],this.currentRequestBody="",this.currentResponseBody=""}},watch:{filter:{handler:f.a.debounce(function(){this.filterRecords(),m.g(this.filter)},1e3),deep:!0}},created:function(){var t=this;return s()(r.a.mark(function e(){var n,i,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.calcSize(),e.next=3,_.a.getUserId();case 3:return n=e.sent,t.userId=n.data.data.userId,e.next=7,g.a.getAppInfo();case 7:if(i=e.sent,t.appInfo=i.data.data,l()(window).resize(f.a.debounce(t.calcSize,200)),window.io){e.next=12;break}return e.abrupt("return");case 12:a=io("/httptrafic"),a.on("rows",t.receiveTraffic),a.on("filter",function(e){t.setFilter(e)}),a.on("state",t.setState),a.on("clear",function(){t.requestingClear=!1,t.clear()}),a.on("bindedDeviceList",function(e){t.bindedDeviceList=e});case 18:case"end":return e.stop()}},e,t)}))()}}},101:function(t,e,n){"use strict";var i=n(372),r=n(373),a=n(371),s=n(374),c=n(299);n.n(c);e.a={props:["height"],components:{RequestDetail:i.a,ResponseDetail:r.a,Origin:a.a,Timeline:s.a},data:function(){return{activeName:"Origin"}},methods:{tabClick:function(t){this.activeName=t}}}},102:function(t,e,n){"use strict";var i=n(300);n.n(i);e.a={props:["data"]}},103:function(t,e,n){"use strict";var i=n(301),r=(n.n(i),n(45));e.a={components:{KeyValueList:r.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}},104:function(t,e,n){"use strict";var i=n(45),r=n(302);n.n(r);e.a={components:{KeyValueList:i.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}},105:function(t,e,n){"use strict";var i=n(45),r=n(303);n.n(r);e.a={components:{KeyValueList:i.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}},106:function(t,e,n){"use strict";var i=n(45);e.a={components:{KeyValueList:i.a}}},107:function(t,e,n){"use strict";var i=n(304);n.n(i);e.a={name:"Device",props:["device"],methods:{requestRemoveDevice:function(){},requestSetName:function(){},setName:function(t,e){},rightClicked:function(t,e){this.$emit("right-clicked",t,e)}}}},108:function(t,e,n){"use strict";var i,r=n(464),a=n.n(r),s=n(12),c=n.n(s),o=n(11),u=n.n(o),l=n(305),d=(n.n(l),n(375)),f=n(207),v=n.n(f),p=n(71),h=n.n(p),m=n(48),_=n.n(m),g=n(17);e.a={name:"DeviceList",components:{Device:d.a,ContextMenu:v.a},methods:(i={copyBindUrl:function(){_()(this.bindUrl),this.$message("已将设备绑定链接复制到剪切板，在设备中打开此url即可绑定设备")},changeHost:function(){},removeDevice:function(t,e){var n=this;return u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.unBind(t.id);case 2:n.$message("解绑成功");case 3:case"end":return e.stop()}},e,n)}))()},renameDevice:function(){var t=this;this.$prompt("请输入设备名字","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){var e=u()(c.a.mark(function e(n){var i=n.value;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.setDeviceName(t.$dc.rightClickDeviceId,i);case 2:t.$message({type:"success",message:"设备命名成功"});case 3:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}()).catch(function(){})}},a()(i,"removeDevice",function(){var t=this;this.$confirm("此操作将永久删除该设备, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.unBind(t.$dc.rightClickDeviceId);case 2:t.$message({type:"success",message:"删除成功!"});case 3:case"end":return e.stop()}},e,t)}))).catch(function(){})}),a()(i,"disableMonitor",function(){g.a.disableMonitor(this.$dc.rightClickDeviceId)}),a()(i,"enableMonitor",function(){g.a.enableMonitor(this.$dc.rightClickDeviceId)}),a()(i,"onCtxOpen",function(t){this.$dc.setRightClickedDeviceId(t)}),a()(i,"rightClicked",function(t,e){this.$refs.ctx.open(t,e)}),a()(i,"onCtxClose",function(t){}),a()(i,"resetCtxLocals",function(){this.$dc.setRightClickedDeviceId("")}),i),computed:{bindUrl:function(){return"http://"+this.$dc.appInfo.pcIp+":"+this.$dc.appInfo.realUiPort+"/profile/device/bind?userId="+this.$dc.userId},imgUrl:function(){return h.a.toDataURL(this.bindUrl,4)}}}},109:function(t,e,n){"use strict";var i=n(5),r=(n.n(i),n(378)),a=n(48),s=n.n(a),c=n(207),o=n.n(c),u=n(47),l=n(306),d=(n.n(l),n(379));e.a={props:["height"],components:{List:r.a,ContextMenu:o.a,Record:d.a},data:function(){return{}},methods:{saveData:function(){var t=this;if(!this.$dc.rightClickRow.response)return void this.$message({showClose:!0,message:"服务器还没有响应",type:"warning"});this.$prompt("请输入数据文件名","保存为数据文件",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var n=e.value;u.a.saveDataEntryFromTraffic(t.$dc.rightClickId,n,t.$dc.rightClickRow.response.headers["content-type"].split(";")[0]).then(function(e){var n=e.data;0==n.code?t.$message({showClose:!0,type:"success",message:"保存成功!"}):t.$message.error("出错了，"+n.msg)})})},copyUrl:function(){var t=this.$dc.rightClickRow.originRequest;s()(t.protocol+"//"+t.host+":"+t.port+t.path),this.$message("已将url复制到剪切板")},onCtxOpen:function(t){this.$dc.setRightClickedRecordId(t)},rightClicked:function(t,e){this.$refs.ctx.open(t,e)},onCtxClose:function(t){},resetCtxLocals:function(){this.$dc.setRightClickedRecordId("")}}}},110:function(t,e,n){"use strict";var i=n(5),r=n.n(i);e.a={props:{total:{type:Number,required:!0},height:{type:Number,required:!0},rowHeight:{type:Number,required:!0}},data:function(){return{scrollTop:0,start:0}},computed:{ids:function(){for(var t=[],e=this.start;e<this.end;e++)t.push(e);return t},contentHeight:function(){return this.rowHeight*this.total},keeps:function(){return Math.ceil(this.height/this.rowHeight)+2},end:function(){var t=this.start+20+this.keeps-1;return t+=20,t>this.total?this.total:t},top:function(){return this.rowHeight*this.start}},methods:{handleScroll:r.a.throttle(function(){var t=this.$refs.container.scrollTop,e=Math.floor(t/this.rowHeight);this.start=e<20?0:e-20},100)}}},111:function(t,e,n){"use strict";e.a={props:["index","id"],computed:{row:function(){return this.$dc.recordMap[this.id]},status:function(){try{return this.row.response.statusCode}catch(t){return""}},method:function(){return this.row.originRequest.method},protocol:function(){return this.row.originRequest.protocol},host:function(){return this.row.originRequest.host},path:function(){return this.row.originRequest.path},type:function(){try{return this.row.response.headers["content-type"]}catch(t){return""}},duration:function(){try{return this.row.response.remoteResponseEndTime-this.row.response.remoteRequestBeginTime}catch(t){return""}}},methods:{clickRow:function(t){this.$dc.setCurrentRowIndex(t)},rightClicked:function(t,e){this.$emit("right-clicked",t,e)}}}},118:function(t,e,n){"use strict";var i=n(206),r=n.n(i);e.a={name:"context-menu",props:{id:{type:String,default:"default-ctx"},ctxOpen:{type:Function},ctxCancel:{type:Function},ctxClose:{type:Function}},data:function(){var t=this;return{locals:{},align:"left",ctxTop:0,ctxLeft:0,ctxVisible:!1,bodyClickListener:r()(function(e){if(!t.ctxVisible||t.$el.contains(e.target))t.ctxVisible=!1,t.ctxClose&&t.ctxClose(t.locals);else{if(1!==e.which)return e.preventDefault(),e.stopPropagation(),!1;t.ctxVisible=!1,t.ctxCancel&&t.ctxCancel(t.locals),e.stopPropagation()}})}},methods:{setPositionFromEvent:function(t){var e=t.pageX,n=t.pageY;this.ctxTop=n-document.body.scrollTop,this.ctxLeft=e},open:function(t,e){return this.ctxVisible=!0,this.ctxOpen&&this.ctxOpen(e),this.setPositionFromEvent(t),this.$el.setAttribute("tab-index",-1),this.bodyClickListener.start(),this}},watch:{ctxVisible:function(t,e){e===!0&&t===!1&&this.bodyClickListener.stop(function(t){})}},computed:{ctxStyle:function(){return{display:this.ctxVisible?"block":"none",top:(this.ctxTop||0)+"px",left:(this.ctxLeft||0)+"px"}}}}},158:function(t,e){},16:function(t,e){},160:function(t,e,n){"use strict";var i=n(100),r=n(394),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/App.vue",e.a=s.exports},17:function(t,e,n){"use strict";var i=n(10),r=n.n(i);e.a={saveFile:function(t){return r.a.post("/profile/savefile",t)},disableRule:function(){return r.a.post("/profile/setRuleState")},enableRule:function(){return r.a.post("/profile/setRuleState?rulestate=1")},disableHost:function(){return r.a.post("/profile/setHostState")},enableHost:function(){return r.a.post("/profile/setHostState?hoststate=1")},disableFilter:function(){return r.a.post("/profile/setFilterState")},enableFilter:function(){return r.a.post("/profile/setFilterState?filterstate=1")},getUserId:function(){return r.a.get("/profile/getUserId")},setUserId:function(t){return r.a.get("/profile/setUserId?userId="+t)},unBind:function(t){return r.a.get("/profile/device/unbind?deviceId="+t)},setDeviceName:function(t,e){return r.a.get("/profile/device/setName?deviceId="+t+"&name="+encodeURI(e))},disableMonitor:function(t){return r.a.get("/profile/device/disableMonitor?deviceId="+t)},enableMonitor:function(t){return r.a.get("/profile/device/enableMonitor?deviceId="+t)}}},202:function(t,e,n){"use strict";var i=n(10),r=n.n(i),a={getAppInfo:function(){return r.a.get("/app/get-info")}};e.a=a},204:function(t,e,n){"use strict";function i(t,e){try{return e(t)}catch(e){return t}}function r(t,e){if("string"!=typeof t)throw new TypeError("argument str must be a string");for(var n={},r=e||{},a=t.split(C),s=r.decode||x,c=0;c<a.length;c++){var o=a[c],u=o.indexOf("=");if(!(u<0)){var l=o.substr(0,u).trim(),d=o.substr(++u,o.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),void 0==n[l]&&(n[l]=i(d,s))}}return n}function a(t){return!t||t.indexOf("?")<0?{}:v.a.parse(t.split("?")[1])}var s=n(12),c=n.n(s),o=n(11),u=n.n(o),l=n(10),d=n.n(l),f=n(342),v=n.n(f);n.d(e,"f",function(){return p}),n.d(e,"e",function(){return h}),n.d(e,"c",function(){return m}),n.d(e,"d",function(){return _}),n.d(e,"g",function(){return g}),e.a=r,e.b=a;var p=function(){var t=u()(c.a.mark(function t(e){var n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/getResponseBody?id="+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),h=function(){var t=u()(c.a.mark(function t(e){var n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/getRequestBody?id="+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=u()(c.a.mark(function t(e){var n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/stopRecord?stop="+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),_=function(){var t=u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/clear");case 3:return e=t.sent,t.abrupt("return",e.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(){return t.apply(this,arguments)}}(),g=function(){var t=u()(c.a.mark(function t(e){var n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/setfilter?path="+e.path+"&host="+e.host);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),C=/; */,x=decodeURIComponent},206:function(t,e){t.exports=function(t){function e(e){e.preventDefault(),"function"==typeof t&&t(e);try{stop()}catch(t){}}function n(t){27===t.keyCode&&e(t)}var i=!1;return{get isListening(){return i},start:function(t){window.addEventListener("click",e,!0),window.addEventListener("keyup",n,!0),i=!0,"function"==typeof t&&t()},stop:function(t){window.removeEventListener("click",e,!0),window.removeEventListener("keyup",n,!0),i=!1,"function"==typeof t&&t()}}}},207:function(t,e,n){var i=n(351);i.install=function(t){return t.component("context-menu",i)},window.VueContextMenu=i,t.exports=t.exports.default=i},209:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),r=n.n(i),a=n(16),s=(n.n(a),n(1)),c=n(160),o=n(28),u=n.n(o),l=n(158);n.n(l);s.default.use(r.a),s.default.use(u.a),new s.default({el:"#app",render:function(t){return t(c.a)}})},272:function(t,e,n){e=t.exports=n(3)(),e.push([t.i,'\n.ctx {\n  position: relative;\n}\n.ctx-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  font-size: .9rem;\n  color: #373a3c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: .25rem; -webkit-box-shadow:0 0 5px #CCC; box-shadow:0 0 5px #CCC\n}\n.ctx-divider {\n  height: 1px;\n  margin: .5rem 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.ctx-item {\n  display: block;\n  /*width: 100%;*/\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #373a3c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0;\n  cursor: default;\n}\n.ctx-item:focus, .ctx-item:hover {\n  color: #2b2d2f;\n  text-decoration: none;\n  background-color: #f5f5f5;\n  cursor: normal;\n}\n.ctx-item.active, .ctx-item.active:focus, .ctx-item.active:hover {\n  color: #fff;\n  text-decoration: none;\n  background-color: #0275d8;\n  outline: 0;\n}\n.ctx-item.disabled, .ctx-item.disabled:focus, .ctx-item.disabled:hover {\n  color: #818a91;\n}\n.ctx-item.disabled:focus, .ctx-item.disabled:hover {\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n  background-image: none;\n  filter: "progid:DXImageTransform.Microsoft.gradient(enabled = false)";\n}\n.open > .ctx-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.ctx-menu-right {\n  right: 0;\n  left: auto;\n}\n.ctx-menu-left {\n  right: auto;\n  left: 0;\n}\n.ctx-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: .9rem;\n  line-height: 1.5;\n  color: #818a91;\n  white-space: nowrap;\n}\n.ctx-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990;\n}\n.pull-right > .ctx-menu {\n  right: 0;\n  left: auto;\n}\n.ctx-menu-container {\n  position: fixed;\n  padding: 0;\n  border: 1px solid #bbb;\n  background-color: whitesmoke;\n  z-index: 99999;\n  -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n}\n',""])},299:function(t,e){},300:function(t,e){},301:function(t,e){},302:function(t,e){},303:function(t,e){},304:function(t,e){},305:function(t,e){},306:function(t,e){},351:function(t,e,n){"use strict";function i(t){c||n(439)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(118),a=n(418),s=n(0),c=!1,o=i,u=n.i(s.a)(r.a,a.a,a.b,!1,o,null,null);u.options.__file="src/context-menu/index.vue",e.default=u.exports},370:function(t,e,n){"use strict";var i=n(101),r=n(404),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/Detail.vue",e.a=s.exports},371:function(t,e,n){"use strict";var i=n(103),r=n(391),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/Origin.vue",e.a=s.exports},372:function(t,e,n){"use strict";var i=n(104),r=n(416),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/RequestDetail.vue",e.a=s.exports},373:function(t,e,n){"use strict";var i=n(105),r=n(419),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/ResponseDetail.vue",e.a=s.exports},374:function(t,e,n){"use strict";var i=n(106),r=n(386),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/Timeline.vue",e.a=s.exports},375:function(t,e,n){"use strict";var i=n(107),r=n(413),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/device/Device.vue",e.a=s.exports},376:function(t,e,n){"use strict";var i=n(108),r=n(417),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/device/DeviceList.vue",e.a=s.exports},377:function(t,e,n){"use strict";var i=n(109),r=n(411),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/traffic/HttpTraffic.vue",e.a=s.exports},378:function(t,e,n){"use strict";var i=n(110),r=n(420),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/traffic/List.vue",e.a=s.exports},379:function(t,e,n){"use strict";var i=n(111),r=n(415),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/traffic/record.vue",e.a=s.exports},386:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("key-value-list",{attrs:{data:t.$dc.timeline}})],1)},r=[];i._withStripped=!0},391:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"origin"},[n("div",{staticClass:"request__header"},[n("div",{staticClass:"request__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),n("div",{staticClass:"request__tab",class:{active:"Cookie"==t.activeName},on:{click:function(e){t.tabClick("Cookie")}}},[t._v("Cookie")]),t._v(" "),n("div",{staticClass:"request__tab",class:{active:"Query Params"==t.activeName},on:{click:function(e){t.tabClick("Query Params")}}},[t._v("Query Params")])]),t._v(" "),n("div",{staticClass:"request__body"},["Header"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.originRequestHeader}})],1):t._e(),t._v(" "),"Cookie"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.originRequestCookie}})],1):t._e(),t._v(" "),"Query Params"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.originRequestQueryParams}})],1):t._e()])])},r=[];i._withStripped=!0},393:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"keyvalue-wrapper"},[t._l(t.data,function(e,i){return[n("div",{staticClass:"row"},[n("div",{staticClass:"name"},[t._v(t._s(i))]),t._v(" "),n("div",{staticClass:"value"},[t._v(t._s(e))])])]})],2)},r=[];i._withStripped=!0},394:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app",attrs:{id:"app"}},[n("div",{staticClass:"op-bar"},[n("span",{staticClass:"icon-btn",class:{overflow:t.state.overflow},on:{click:t.requestToggleRecordState}},[t.state.stopRecord?n("i",{staticClass:"iconfont icon-bofang bofang"}):n("i",{staticClass:"iconfont icon-zanting zanting"})]),t._v(" "),n("i",{staticClass:"iconfont icon-qingchu icon-btn",on:{click:t.requestClear}}),t._v(" "),n("span",{staticClass:"tips ",style:{visibility:t.state.overflow?"initial":"hidden"}},[t._v("记录已满，请清除历史记录")]),t._v(" "),n("span",{staticClass:"filters"},[t._v("\n            Filter: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.host,expression:"filter.host"}],attrs:{placeholder:"Host"},domProps:{value:t.filter.host},on:{input:function(e){e.target.composing||t.$set(t.filter,"host",e.target.value)}}}),t._v(" / "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.path,expression:"filter.path"}],attrs:{placeholder:"Path"},domProps:{value:t.filter.path},on:{input:function(e){e.target.composing||t.$set(t.filter,"path",e.target.value)}}}),t._v(" "),n("i",{staticClass:"iconfont icon-sousuo search"})]),t._v(" "),t.$dc.appInfo.single?t._e():n("a",{staticClass:"username",attrs:{href:"javascript:void(0)"},on:{click:t.changeUser}},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"点击切换用户",placement:"top"}},[n("el-button",{attrs:{type:"text"}},[t._v(t._s(t.$dc.userId))])],1)],1)]),t._v(" "),n("div",{staticClass:"monitor"},[n("device-list"),t._v(" "),n("http-traffic",{attrs:{height:t.height}}),t._v(" "),n("detail",{attrs:{height:t.height}})],1)])},r=[];i._withStripped=!0},404:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"detail",style:{height:t.height+"px"}},[n("div",{staticClass:"detail__header"},[n("div",{staticClass:"detail__tab",class:{active:"Origin"==t.activeName},on:{click:function(e){t.tabClick("Origin")}}},[t._v("原始请求")]),t._v(" "),n("div",{staticClass:"detail__tab",class:{active:"Request"==t.activeName},on:{click:function(e){t.tabClick("Request")}}},[t._v("Request")]),t._v(" "),n("div",{staticClass:"detail__tab",class:{active:"Response"==t.activeName},on:{click:function(e){t.tabClick("Response")}}},[t._v("Response")]),t._v(" "),n("div",{staticClass:"detail__tab",class:{active:"Timeline"==t.activeName},on:{click:function(e){t.tabClick("Timeline")}}},[t._v("Timeline")])]),t._v(" "),n("div",{staticClass:"detail__body"},["Origin"==t.activeName?n("div",[n("origin")],1):t._e(),t._v(" "),"Request"==t.activeName?n("div",[n("request-detail")],1):t._e(),t._v(" "),"Response"==t.activeName?n("div",[n("response-detail")],1):t._e(),t._v(" "),"Timeline"==t.activeName?n("div",[n("timeline")],1):t._e()])])},r=[];i._withStripped=!0},411:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"traffic"},[t._m(0),t._v(" "),n("list",{attrs:{total:t.$dc.total,height:t.height-28,rowHeight:24},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.ids,function(e){return n("record",{key:e,attrs:{index:e,id:t.$dc.filterdRecordArray[e]},on:{"right-clicked":t.rightClicked}})})}}])}),t._v(" "),n("context-menu",{ref:"ctx",attrs:{id:"testingctx",ctxOpen:t.onCtxOpen,ctxCancel:t.resetCtxLocals,ctxClose:t.onCtxClose}},[n("li",{staticClass:"ctx-item",on:{click:t.saveData}},[t._v("保存为mock数据")]),t._v(" "),n("li",{staticClass:"ctx-item",on:{click:t.copyUrl}},[t._v("复制url")])])],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header row"},[n("div",{staticClass:"cell cell-index"},[t._v("#")]),t._v(" "),n("div",{staticClass:"cell cell-status"},[t._v("Status")]),t._v(" "),n("div",{staticClass:"cell cell-method"},[t._v("Method")]),t._v(" "),n("div",{staticClass:"cell cell-protocol"},[t._v("Protocol")]),t._v(" "),n("div",{staticClass:"cell cell-host"},[t._v("Host")]),t._v(" "),n("div",{staticClass:"cell cell-path"},[t._v("Path")]),t._v(" "),n("div",{staticClass:"cell cell-type"},[t._v("Type")]),t._v(" "),n("div",{staticClass:"cell cell-time"},[t._v("Time")])])}];i._withStripped=!0},413:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"device",on:{contextmenu:function(e){e.preventDefault(),t.rightClicked(e,t.device.id)}}},[n("div",{staticClass:"name"},[t._v(t._s(t.device.name))]),t._v(" "),n("div",{staticClass:"id"},[t._v(t._s(t.device.id))]),t._v(" "),t.device.disableMonitor?n("div",{staticClass:"status offline"}):t._e(),t._v(" "),t.device.disableMonitor?t._e():n("div",{staticClass:"status online"})])},r=[];i._withStripped=!0},415:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"record row",class:{selected:t.$dc.selectId==t.id,"right-clicked":t.$dc.rightClickId==t.id},on:{click:function(e){t.clickRow(t.id)},contextmenu:function(e){e.preventDefault(),t.rightClicked(e,t.id)}}},[n("div",{staticClass:"cell cell-index"},[t._v(t._s(t.index+1))]),t._v(" "),n("div",{staticClass:"cell cell-status"},[t._v(t._s(t.status))]),t._v(" "),n("div",{staticClass:"cell cell-method"},[t._v(t._s(t.method))]),t._v(" "),n("div",{staticClass:"cell cell-protocol"},[t._v(t._s(t.protocol))]),t._v(" "),n("div",{staticClass:"cell cell-host"},[t._v(t._s(t.host))]),t._v(" "),n("div",{staticClass:"cell cell-path"},[t._v(t._s(t.path))]),t._v(" "),n("div",{staticClass:"cell cell-type"},[t._v(t._s(t.type))]),t._v(" "),n("div",{staticClass:"cell cell-time"},[t._v(t._s(t.duration))])])},r=[];i._withStripped=!0},416:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"request"},[n("div",{staticClass:"request__header"},[n("div",{staticClass:"request__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),n("div",{staticClass:"request__tab",class:{active:"Cookie"==t.activeName},on:{click:function(e){t.tabClick("Cookie")}}},[t._v("Cookie")]),t._v(" "),n("div",{staticClass:"request__tab",class:{active:"Query Params"==t.activeName},on:{click:function(e){t.tabClick("Query Params")}}},[t._v("Query Params")]),t._v(" "),n("div",{staticClass:"request__tab",class:{active:"Body"==t.activeName},on:{click:function(e){t.tabClick("Body")}}},[t._v("Body")])]),t._v(" "),n("div",{staticClass:"request__body"},["Header"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.requestHeader}})],1):t._e(),t._v(" "),"Cookie"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.requestCookie}})],1):t._e(),t._v(" "),"Query Params"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.requestQueryParams}})],1):t._e(),t._v(" "),"Body"==t.activeName?n("div",{staticClass:"text-area"},[t._v(t._s(t.$dc.currentRequestBody))]):t._e()])])},r=[];i._withStripped=!0},417:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"device-list"},[n("div",{staticClass:"title"},[t._v("绑定的设备")]),t._v(" "),n("div",{staticClass:"list-wrapper"},t._l(t.$dc.bindedDeviceList,function(e,i){return n("device",{key:i,attrs:{device:e},on:{"right-clicked":t.rightClicked}})})),t._v(" "),n("div",{staticClass:"qr-code-wrapper"},[n("div",{staticClass:"qr-code"},[n("div",{staticClass:"title"},[t._v("扫码绑定设备")]),t._v(" "),n("div",{staticClass:"qrcode"},[n("img",{staticClass:"bind-qrcode",attrs:{src:t.imgUrl}})]),t._v(" "),n("div",{staticClass:"bottom"},[n("el-button",{attrs:{type:"text"},on:{click:t.copyBindUrl}},[t._v("点击复制绑定链接")])],1)])]),t._v(" "),n("context-menu",{ref:"ctx",attrs:{id:"testingctx",ctxOpen:t.onCtxOpen,ctxCancel:t.resetCtxLocals,ctxClose:t.onCtxClose}},[n("li",{staticClass:"ctx-item",on:{click:t.renameDevice}},[t._v("取别名")]),t._v(" "),n("li",{staticClass:"ctx-item",on:{click:t.changeHost}},[t._v("修改host")]),t._v(" "),n("li",{staticClass:"ctx-item",on:{click:t.removeDevice}},[t._v("删除设备")]),t._v(" "),t.$dc.rightClickDevice.disableMonitor?t._e():n("li",{staticClass:"ctx-item",on:{click:t.disableMonitor}},[t._v("停止监控")]),t._v(" "),t.$dc.rightClickDevice.disableMonitor?n("li",{staticClass:"ctx-item",on:{click:t.enableMonitor}},[t._v("开启监控")]):t._e()])],1)},r=[];i._withStripped=!0},418:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"contextMenu",staticClass:"ctx-menu-container",style:t.ctxStyle,attrs:{id:t.id},on:{click:function(t){t.stopPropagation()},contextmenu:function(t){t.stopPropagation()}}},[n("div",{staticClass:"ctx open",staticStyle:{"background-color":"transparent"}},[n("ul",{staticClass:"ctx-menu",class:{"ctx-menu-right":"right"===t.align,"ctx-menu-left":"left"===t.align},attrs:{role:"menu"}},[t._t("default")],2)])])},r=[];i._withStripped=!0},419:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"response"},[n("div",{staticClass:"response__header"},[n("div",{staticClass:"response__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),n("div",{staticClass:"response__tab",class:{active:"Set Cookies"==t.activeName},on:{click:function(e){t.tabClick("Set Cookies")}}},[t._v("Set Cookies")]),t._v(" "),n("div",{staticClass:"response__tab",class:{active:"Body"==t.activeName},on:{click:function(e){t.tabClick("Body")}}},[t._v("Body")])]),t._v(" "),n("div",{staticClass:"response__body"},["Header"==t.activeName?n("div",[n("key-value-list",{attrs:{data:t.$dc.responseHeader}})],1):t._e(),t._v(" "),"Set Cookies"==t.activeName?n("div",{staticClass:"set-cookies"},t._l(t.$dc.setCookies,function(e){return n("div",{staticClass:"cookie-row"},[t._v("\n                "+t._s(e)+"\n            ")])})):t._e(),t._v(" "),"Body"==t.activeName?n("div",{staticClass:"text-area"},[t._v(t._s(t.$dc.currentResponseBody))]):t._e()])])},r=[];i._withStripped=!0},420:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",style:{"overflow-y":"scroll",height:t.height+"px"},on:{scroll:function(e){e.preventDefault(),t.handleScroll(e)}}},[n("div",{style:{height:t.contentHeight+"px"}},[n("div",{style:{transform:"translate3d(0,"+t.top+"px,0)"}},[t._t("default",null,{ids:t.ids})],2)])])},r=[];i._withStripped=!0},439:function(t,e,n){var i=n(272);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(4)("0790a3d4",i,!1)},45:function(t,e,n){"use strict";var i=n(102),r=n(393),a=n(0),s=n.i(a.a)(i.a,r.a,r.b,!1,null,null,null);s.options.__file="src/monitor/components/detail/KeyValueList.vue",e.a=s.exports},47:function(t,e,n){"use strict";var i=n(10),r=n.n(i),a=n(34),s=n.n(a);e.a={getDataList:function(){return r.a.get("/data/getdatalist")},saveDataList:function(t){return r.a.post("/data/savedatalist",t)},getDataFile:function(t){return r.a.get("/data/getdatafile?id="+t)},saveDataFile:function(t,e){var n=new FormData;return n.append("content",e),r.a.post("/data/savedatafile?id="+t,n)},saveDataEntryFromTraffic:function(t,e,n){return r.a.post("/data/savedatafromtraffic",{id:s()(),name:e,contenttype:n,reqid:t})}}}},[209]);
//# sourceMappingURL=monitor.js.map