webpackJsonp([1],{100:function(t,e,i){"use strict";var n=i(42),r=i(277);i.n(r);e.a={components:{KeyValueList:n.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}},101:function(t,e,i){"use strict";var n=i(42);e.a={components:{KeyValueList:n.a}}},102:function(t,e,i){"use strict";e.a={props:["index","id"],computed:{row:function(){return this.$dc.recordMap[this.id]},status:function(){try{return this.row.response.statusCode}catch(t){return""}},method:function(){return this.row.originRequest.method},protocol:function(){return this.row.originRequest.protocol},host:function(){return this.row.originRequest.host},path:function(){return this.row.originRequest.path},type:function(){try{return this.row.response.headers["content-type"]}catch(t){return""}},duration:function(){try{return this.row.response.remoteResponseEndTime-this.row.response.remoteRequestBeginTime}catch(t){return""}}},methods:{clickRow:function(t){this.$dc.setCurrentRowIndex(t)},rightClicked:function(t,e){this.$emit("right-clicked",t,e)}}}},110:function(t,e,i){"use strict";var n=i(197),r=i.n(n);e.a={name:"context-menu",props:{id:{type:String,default:"default-ctx"},ctxOpen:{type:Function},ctxCancel:{type:Function},ctxClose:{type:Function}},data:function(){var t=this;return{locals:{},align:"left",ctxTop:0,ctxLeft:0,ctxVisible:!1,bodyClickListener:r()(function(e){if(!t.ctxVisible||t.$el.contains(e.target))t.ctxVisible=!1,t.ctxClose&&t.ctxClose(t.locals);else{if(1!==e.which)return e.preventDefault(),e.stopPropagation(),!1;t.ctxVisible=!1,t.ctxCancel&&t.ctxCancel(t.locals),e.stopPropagation()}})}},methods:{setPositionFromEvent:function(t){var e=t.pageX,i=t.pageY;this.ctxTop=i-document.body.scrollTop,this.ctxLeft=e},open:function(t,e){return this.ctxVisible=!0,this.ctxOpen&&this.ctxOpen(e),this.setPositionFromEvent(t),this.$el.setAttribute("tab-index",-1),this.bodyClickListener.start(),this}},watch:{ctxVisible:function(t,e){e===!0&&t===!1&&this.bodyClickListener.stop(function(t){})}},computed:{ctxStyle:function(){return{display:this.ctxVisible?"block":"none",top:(this.ctxTop||0)+"px",left:(this.ctxLeft||0)+"px"}}}}},150:function(t,e){},152:function(t,e,i){"use strict";var n=i(93),r=i(384),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},195:function(t,e,i){"use strict";function n(t,e){try{return e(t)}catch(e){return t}}function r(t,e){if("string"!=typeof t)throw new TypeError("argument str must be a string");for(var i={},r=e||{},a=t.split(g),s=r.decode||y,c=0;c<a.length;c++){var o=a[c],u=o.indexOf("=");if(!(u<0)){var l=o.substr(0,u).trim(),d=o.substr(++u,o.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),void 0==i[l]&&(i[l]=n(d,s))}}return i}function a(t){return!t||t.indexOf("?")<0?{}:f.a.parse(t.split("?")[1])}var s=i(12),c=i.n(s),o=i(11),u=i.n(o),l=i(8),d=i.n(l),v=i(329),f=i.n(v);i.d(e,"f",function(){return h}),i.d(e,"e",function(){return p}),i.d(e,"c",function(){return _}),i.d(e,"d",function(){return m}),i.d(e,"g",function(){return C}),e.a=r,e.b=a;var h=function(){var t=u()(c.a.mark(function t(e){var i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/getResponseBody?id="+e);case 3:return i=t.sent,t.abrupt("return",i.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=u()(c.a.mark(function t(e){var i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/getRequestBody?id="+e);case 3:return i=t.sent,t.abrupt("return",i.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),_=function(){var t=u()(c.a.mark(function t(e){var i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/stopRecord?stop="+e);case 3:return i=t.sent,t.abrupt("return",i.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/clear");case 3:return e=t.sent,t.abrupt("return",e.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(){return t.apply(this,arguments)}}(),C=function(){var t=u()(c.a.mark(function t(e){var i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/traffic/setfilter?path="+e.path+"&host="+e.host);case 3:return i=t.sent,t.abrupt("return",i.data);case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return","");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),g=/; */,y=decodeURIComponent},197:function(t,e){t.exports=function(t){function e(e){e.preventDefault(),"function"==typeof t&&t(e);try{stop()}catch(t){}}function i(t){27===t.keyCode&&e(t)}var n=!1;return{get isListening(){return n},start:function(t){window.addEventListener("click",e,!0),window.addEventListener("keyup",i,!0),n=!0,"function"==typeof t&&t()},stop:function(t){window.removeEventListener("click",e,!0),window.removeEventListener("keyup",i,!0),n=!1,"function"==typeof t&&t()}}}},198:function(t,e,i){var n=i(337);n.install=function(t){return t.component("context-menu",n)},window.VueContextMenu=n,t.exports=t.exports.default=n},200:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(23),r=i.n(n),a=i(31),s=(i.n(a),i(1)),c=i(152),o=i(24),u=i.n(o),l=i(150);i.n(l);s.default.use(r.a),s.default.use(u.a),new s.default({el:"#app",render:function(t){return t(c.a)}})},272:function(t,e){},273:function(t,e){},274:function(t,e){},275:function(t,e){},276:function(t,e){},277:function(t,e){},292:function(t,e){},31:function(t,e){},337:function(t,e,i){"use strict";function n(t){i(292)}Object.defineProperty(e,"__esModule",{value:!0});var r=i(110),a=i(391),s=i(0),c=n,o=i.i(s.a)(r.a,a.a,a.b,!1,c,null,null);e.default=o.exports},355:function(t,e,i){"use strict";var n=i(94),r=i(380),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},356:function(t,e,i){"use strict";var n=i(95),r=i(389),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},357:function(t,e,i){"use strict";var n=i(97),r=i(368),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},358:function(t,e,i){"use strict";var n=i(98),r=i(394),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},359:function(t,e,i){"use strict";var n=i(99),r=i(386),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},360:function(t,e,i){"use strict";var n=i(100),r=i(378),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},361:function(t,e,i){"use strict";var n=i(101),r=i(397),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},362:function(t,e,i){"use strict";var n=i(102),r=i(369),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},368:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"container",style:{"overflow-y":"scroll",height:t.height+"px"},on:{scroll:function(e){e.preventDefault(),t.handleScroll(e)}}},[i("div",{style:{height:t.contentHeight+"px"}},[i("div",{style:{transform:"translate3d(0,"+t.top+"px,0)"}},[t._t("default",null,{ids:t.ids})],2)])])},r=[]},369:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"record row",class:{selected:t.$dc.selectId==t.id,"right-clicked":t.$dc.rightClickId==t.id},on:{click:function(e){t.clickRow(t.id)},contextmenu:function(e){e.preventDefault(),t.rightClicked(e,t.id)}}},[i("div",{staticClass:"cell cell-index"},[t._v(t._s(t.index+1))]),t._v(" "),i("div",{staticClass:"cell cell-status"},[t._v(t._s(t.status))]),t._v(" "),i("div",{staticClass:"cell cell-method"},[t._v(t._s(t.method))]),t._v(" "),i("div",{staticClass:"cell cell-protocol"},[t._v(t._s(t.protocol))]),t._v(" "),i("div",{staticClass:"cell cell-host"},[t._v(t._s(t.host))]),t._v(" "),i("div",{staticClass:"cell cell-path"},[t._v(t._s(t.path))]),t._v(" "),i("div",{staticClass:"cell cell-type"},[t._v(t._s(t.type))]),t._v(" "),i("div",{staticClass:"cell cell-time"},[t._v(t._s(t.duration))])])},r=[]},375:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"keyvalue-wrapper"},[t._l(t.data,function(e,n){return[i("div",{staticClass:"row"},[i("div",{staticClass:"name"},[t._v(t._s(n))]),t._v(" "),i("div",{staticClass:"value"},[t._v(t._s(e))])])]})],2)},r=[]},378:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"response"},[i("div",{staticClass:"response__header"},[i("div",{staticClass:"response__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),i("div",{staticClass:"response__tab",class:{active:"Set Cookies"==t.activeName},on:{click:function(e){t.tabClick("Set Cookies")}}},[t._v("Set Cookies")]),t._v(" "),i("div",{staticClass:"response__tab",class:{active:"Body"==t.activeName},on:{click:function(e){t.tabClick("Body")}}},[t._v("Body")])]),t._v(" "),i("div",{staticClass:"response__body"},["Header"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.responseHeader}})],1):t._e(),t._v(" "),"Set Cookies"==t.activeName?i("div",{staticClass:"set-cookies"},t._l(t.$dc.setCookies,function(e){return i("div",{staticClass:"cookie-row"},[t._v("\n                "+t._s(e)+"\n            ")])})):t._e(),t._v(" "),"Body"==t.activeName?i("div",{staticClass:"text-area"},[t._v(t._s(t.$dc.currentResponseBody))]):t._e()])])},r=[]},380:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"detail",style:{height:t.height+"px"}},[i("div",{staticClass:"detail__header"},[i("div",{staticClass:"detail__tab",class:{active:"Origin"==t.activeName},on:{click:function(e){t.tabClick("Origin")}}},[t._v("原始请求")]),t._v(" "),i("div",{staticClass:"detail__tab",class:{active:"Request"==t.activeName},on:{click:function(e){t.tabClick("Request")}}},[t._v("Request")]),t._v(" "),i("div",{staticClass:"detail__tab",class:{active:"Response"==t.activeName},on:{click:function(e){t.tabClick("Response")}}},[t._v("Response")]),t._v(" "),i("div",{staticClass:"detail__tab",class:{active:"Timeline"==t.activeName},on:{click:function(e){t.tabClick("Timeline")}}},[t._v("Timeline")])]),t._v(" "),i("div",{staticClass:"detail__body"},["Origin"==t.activeName?i("div",[i("origin")],1):t._e(),t._v(" "),"Request"==t.activeName?i("div",[i("request-detail")],1):t._e(),t._v(" "),"Response"==t.activeName?i("div",[i("response-detail")],1):t._e(),t._v(" "),"Timeline"==t.activeName?i("div",[i("timeline")],1):t._e()])])},r=[]},384:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app",attrs:{id:"app"}},[i("div",{staticClass:"op-bar"},[i("span",{staticClass:"icon-btn",class:{overflow:t.state.overflow},on:{click:t.requestToggleRecordState}},[t.state.stopRecord?i("i",{staticClass:"iconfont icon-bofang"}):i("i",{staticClass:"iconfont icon-zanting"})]),t._v(" "),i("i",{staticClass:"iconfont icon-qingchu icon-btn",on:{click:t.requestClear}}),t._v(" "),i("span",{staticClass:"tips ",style:{visibility:t.state.overflow?"initial":"hidden"}},[t._v("记录已满，请清除历史记录")]),t._v(" "),i("span",{staticClass:"filters"},[t._v("Filter:\n            "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.host,expression:"filter.host"}],attrs:{placeholder:"Host"},domProps:{value:t.filter.host},on:{input:function(e){e.target.composing||t.$set(t.filter,"host",e.target.value)}}}),t._v("\n            / "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.path,expression:"filter.path"}],attrs:{placeholder:"Path"},domProps:{value:t.filter.path},on:{input:function(e){e.target.composing||t.$set(t.filter,"path",e.target.value)}}}),t._v(" "),i("i",{staticClass:"iconfont icon-sousuo search"})])]),t._v(" "),i("div",{staticClass:"monitor"},[i("http-traffic",{attrs:{height:t.height}}),t._v(" "),i("detail",{attrs:{height:t.height}})],1)])},r=[]},386:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"request"},[i("div",{staticClass:"request__header"},[i("div",{staticClass:"request__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),i("div",{staticClass:"request__tab",class:{active:"Cookie"==t.activeName},on:{click:function(e){t.tabClick("Cookie")}}},[t._v("Cookie")]),t._v(" "),i("div",{staticClass:"request__tab",class:{active:"Query Params"==t.activeName},on:{click:function(e){t.tabClick("Query Params")}}},[t._v("Query Params")]),t._v(" "),i("div",{staticClass:"request__tab",class:{active:"Body"==t.activeName},on:{click:function(e){t.tabClick("Body")}}},[t._v("Body")])]),t._v(" "),i("div",{staticClass:"request__body"},["Header"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.requestHeader}})],1):t._e(),t._v(" "),"Cookie"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.requestCookie}})],1):t._e(),t._v(" "),"Query Params"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.requestQueryParams}})],1):t._e(),t._v(" "),"Body"==t.activeName?i("div",{staticClass:"text-area"},[t._v(t._s(t.$dc.currentRequestBody))]):t._e()])])},r=[]},389:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"traffic"},[t._m(0),t._v(" "),i("list",{attrs:{total:t.$dc.total,height:t.height-28,rowHeight:24},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.ids,function(e){return i("record",{key:e,attrs:{index:e,id:t.$dc.filterdRecordArray[e]},on:{"right-clicked":t.rightClicked}})})}}])}),t._v(" "),i("context-menu",{ref:"ctx",attrs:{id:"testingctx",ctxOpen:t.onCtxOpen,ctxCancel:t.resetCtxLocals,ctxClose:t.onCtxClose}},[i("li",{staticClass:"ctx-item",on:{click:t.saveData}},[t._v("保存为mock数据")]),t._v(" "),i("li",{staticClass:"ctx-item",on:{click:t.copyUrl}},[t._v("复制url")])])],1)},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header row"},[i("div",{staticClass:"cell cell-index"},[t._v("#")]),t._v(" "),i("div",{staticClass:"cell cell-status"},[t._v("Status")]),t._v(" "),i("div",{staticClass:"cell cell-method"},[t._v("Method")]),t._v(" "),i("div",{staticClass:"cell cell-protocol"},[t._v("Protocol")]),t._v(" "),i("div",{staticClass:"cell cell-host"},[t._v("Host")]),t._v(" "),i("div",{staticClass:"cell cell-path"},[t._v("Path")]),t._v(" "),i("div",{staticClass:"cell cell-type"},[t._v("Type")]),t._v(" "),i("div",{staticClass:"cell cell-time"},[t._v("Time")])])}]},391:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"contextMenu",staticClass:"ctx-menu-container",style:t.ctxStyle,attrs:{id:t.id},on:{click:function(t){t.stopPropagation()},contextmenu:function(t){t.stopPropagation()}}},[i("div",{staticClass:"ctx open",staticStyle:{"background-color":"transparent"}},[i("ul",{staticClass:"ctx-menu",class:{"ctx-menu-right":"right"===t.align,"ctx-menu-left":"left"===t.align},attrs:{role:"menu"}},[t._t("default")],2)])])},r=[]},394:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"origin"},[i("div",{staticClass:"request__header"},[i("div",{staticClass:"request__tab",class:{active:"Header"==t.activeName},on:{click:function(e){t.tabClick("Header")}}},[t._v("Header")]),t._v(" "),i("div",{staticClass:"request__tab",class:{active:"Cookie"==t.activeName},on:{click:function(e){t.tabClick("Cookie")}}},[t._v("Cookie")]),t._v(" "),i("div",{staticClass:"request__tab",class:{active:"Query Params"==t.activeName},on:{click:function(e){t.tabClick("Query Params")}}},[t._v("Query Params")])]),t._v(" "),i("div",{staticClass:"request__body"},["Header"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.originRequestHeader}})],1):t._e(),t._v(" "),"Cookie"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.originRequestCookie}})],1):t._e(),t._v(" "),"Query Params"==t.activeName?i("div",[i("key-value-list",{attrs:{data:t.$dc.originRequestQueryParams}})],1):t._e()])])},r=[]},397:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("key-value-list",{attrs:{data:t.$dc.timeline}})],1)},r=[]},42:function(t,e,i){"use strict";var n=i(96),r=i(375),a=i(0),s=i.i(a.a)(n.a,r.a,r.b,!1,null,null,null);e.a=s.exports},44:function(t,e,i){"use strict";var n=i(8),r=i.n(n),a=i(30),s=i.n(a);e.a={getDataList:function(){return r.a.get("/data/getdatalist")},saveDataList:function(t){return r.a.post("/data/savedatalist",t)},getDataFile:function(t){return r.a.get("/data/getdatafile?id="+t)},saveDataFile:function(t,e){var i=new FormData;return i.append("content",e),r.a.post("/data/savedatafile?id="+t,i)},saveDataEntryFromTraffic:function(t,e,i){return r.a.post("/data/savedatafromtraffic",{id:s()(),name:e,contenttype:i,reqid:t})}}},93:function(t,e,i){"use strict";var n=i(12),r=i.n(n),a=i(11),s=i.n(a),c=i(112),o=i.n(c),u=i(138),l=i.n(u),d=i(3),v=i.n(d),f=i(356),h=i(355),p=i(195);e.a={components:{HttpTraffic:f.a,Detail:h.a},data:function(){return{isDataCenter:!0,width:0,height:0,recordMap:{},originRecordArray:[],filterdRecordArray:[],selectId:"",rightClickId:"",currentRequestBody:"",currentResponseBody:"",requestingClear:!1,state:{stopRecord:!1,overflow:!1},filter:{host:"",path:""}}},computed:{total:function(){return this.filterdRecordArray.length},currentRow:function(){return this.recordMap[this.selectId]||{}},rightClickRow:function(){return this.recordMap[this.rightClickId]},originRequestHeader:function(){try{return this.currentRow.originRequest.headers}catch(t){return{}}},originRequestCookie:function(){try{return p.a(this.currentRow.originRequest.headers.cookie||"")}catch(t){return{}}},originRequestQueryParams:function(){try{return p.b(this.currentRow.originRequest.path)}catch(t){return{}}},requestHeader:function(){try{return this.currentRow.requestData.headers}catch(t){return{}}},requestCookie:function(){try{return p.a(this.currentRow.requestData.headers.cookie||"")}catch(t){return{}}},requestQueryParams:function(){try{return p.b(this.currentRow.requestData.path)}catch(t){return{}}},responseHeader:function(){try{var t=o()({},this.currentRow.response.headers);return delete t["set-cookie"],t}catch(t){return{}}},setCookies:function(){try{return this.currentRow.response.headers["set-cookie"]||[]}catch(t){return[]}},timeline:function(){return{"请求":""}}},methods:{requestToggleRecordState:function(){this.state.stopRecord=!this.state.stopRecord,p.c(this.state.stopRecord)},requestClear:function(){this.requestingClear=!0,this.clear(),p.d()},filterRecords:function(){var t=this,e=[],i=this.filter,n=i.host,r=i.path;this.originRecordArray.forEach(function(i){var a=t.recordMap[i],s=a.originRequest;s&&s.host.indexOf(n)>-1&&s.path.indexOf(r)>-1&&e.push(a.id)}),this.filterdRecordArray=e},calcSize:function(){this.width=l()(window).width(),this.height=l()(window).height()-28},receiveTraffic:function(t){var e=this;if(!this.state.stopRecord&&!this.requestingClear){var i=this.filter,n=i.host,r=i.path;v.a.forEach(t,function(t){var i=t.id,a=!!e.recordMap[i],s=e.recordMap[i]||{};o()(s,t),e.$set(e.recordMap,i,s),a||e.originRecordArray.push(i);var c=t.originRequest;c&&c.host.indexOf(n)>-1&&c.path.indexOf(r)>-1&&e.filterdRecordArray.push(i)})}},setCurrentRowIndex:function(t){var e=this;return s()(r.a.mark(function i(){var n;return r.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(e.selectId!=t){i.next=2;break}return i.abrupt("return");case 2:if(e.selectId=t,e.currentRequestBody="",e.currentResponseBody="",n=e.recordMap[t],!/(json)|(x-www-form-urlencoded)/i.test(n.originRequest.headers["content-type"])){i.next=10;break}return i.next=9,p.e(t);case 9:e.currentRequestBody=i.sent;case 10:if(i.prev=10,!/(text)|(javascript)|(json)/i.test(n.response.headers["content-type"])){i.next=15;break}return i.next=14,p.f(t);case 14:e.currentResponseBody=i.sent;case 15:i.next=20;break;case 17:i.prev=17,i.t0=i.catch(10),console.log(i.t0);case 20:case"end":return i.stop()}},i,e,[[10,17]])}))()},setRightClickedRecordId:function(t){this.rightClickId=t},setFilter:function(t){var e=this.filter;e.path==t.path&&e.host==t.host||(this.filter=t)},setState:function(t){this.state=t},clear:function(){this.recordMap={},this.originRecordArray=[],this.filterdRecordArray=[],this.currentRequestBody="",this.currentResponseBody=""}},watch:{filter:{handler:v.a.debounce(function(){this.filterRecords(),p.g(this.filter)},1e3),deep:!0}},created:function(){var t=this;if(this.calcSize(),l()(window).resize(v.a.debounce(this.calcSize,200)),window.io){var e=io("/httptrafic");e.on("rows",this.receiveTraffic),e.on("filter",function(e){t.setFilter(e)}),e.on("state",this.setState),e.on("clear",function(){t.requestingClear=!1,t.clear()})}}}},94:function(t,e,i){"use strict";var n=i(359),r=i(360),a=i(358),s=i(361),c=i(272);i.n(c);e.a={props:["height"],components:{RequestDetail:n.a,ResponseDetail:r.a,Origin:a.a,Timeline:s.a},data:function(){return{activeName:"Origin"}},methods:{tabClick:function(t){this.activeName=t}}}},95:function(t,e,i){"use strict";var n=i(3),r=(i.n(n),i(357)),a=i(209),s=i.n(a),c=i(198),o=i.n(c),u=i(44),l=i(273),d=(i.n(l),i(362));e.a={props:["height"],components:{List:r.a,ContextMenu:o.a,Record:d.a},data:function(){return{}},methods:{saveData:function(){var t=this;if(!this.$dc.rightClickRow.response)return void this.$message({message:"服务器还没有响应",type:"warning"});this.$prompt("请输入数据文件名","保存为数据文件",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var i=e.value;u.a.saveDataEntryFromTraffic(t.$dc.rightClickId,i,t.$dc.rightClickRow.response.headers["content-type"].split(";")[0]).then(function(e){var i=e.data;0==i.code?t.$message({type:"success",message:"保存成功!"}):t.$message.error("出错了，"+i.msg)})})},copyUrl:function(){var t=this.$dc.rightClickRow.originRequest;s()(t.protocol+"//"+t.host+":"+t.port+t.path),this.$message("已将url复制到剪切板")},onCtxOpen:function(t){this.$dc.setRightClickedRecordId(t)},rightClicked:function(t,e){this.$refs.ctx.open(t,e)},onCtxClose:function(t){},resetCtxLocals:function(){this.$dc.setRightClickedRecordId("")}}}},96:function(t,e,i){"use strict";var n=i(274);i.n(n);e.a={props:["data"]}},97:function(t,e,i){"use strict";var n=i(3),r=i.n(n);e.a={props:{total:{type:Number,required:!0},height:{type:Number,required:!0},rowHeight:{type:Number,required:!0}},data:function(){return{scrollTop:0,start:0}},computed:{ids:function(){for(var t=[],e=this.start;e<this.end;e++)t.push(e);return t},contentHeight:function(){return this.rowHeight*this.total},keeps:function(){return Math.ceil(this.height/this.rowHeight)+2},end:function(){var t=this.start+20+this.keeps-1;return t+=20,t>this.total?this.total:t},top:function(){return this.rowHeight*this.start}},methods:{handleScroll:r.a.throttle(function(){var t=this.$refs.container.scrollTop,e=Math.floor(t/this.rowHeight);this.start=e<20?0:e-20},100)}}},98:function(t,e,i){"use strict";var n=i(275),r=(i.n(n),i(42));e.a={components:{KeyValueList:r.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}},99:function(t,e,i){"use strict";var n=i(42),r=i(276);i.n(r);e.a={components:{KeyValueList:n.a},data:function(){return{activeName:"Header"}},methods:{tabClick:function(t){this.activeName=t}}}}},[200]);
//# sourceMappingURL=monitor.js.map