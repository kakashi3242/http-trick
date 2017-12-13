webpackJsonp([1],{11:function(e,t){},155:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),r=n.n(o),s=n(13),i=n.n(s),a=n(84),c=n.n(a),l=n(6),u=n.n(l),d=n(310),p=n.n(d),f=n(309),h=n.n(f),x=n(167);t.default={components:{HttpTraffic:p.a,Detail:h.a},data:function(){return{isDataCenter:!0,width:0,height:0,rows:{},smallId:3e3,bigId:0,rightClickRow:{},selectId:"",currentRequestBody:"",currentResponseBody:""}},methods:{calcSize:function(){this.width=c()(window).width(),this.height=c()(window).height()-300},receiveTraffic:function(e){var t=this;u.a.forEach(e,function(e){t.smallId>e.id&&(t.smallId=e.id),t.bigId<e.id&&(t.bigId=e.id),e.start?t.rows[e.id]=e:t.rows[e.id]=u.a.assign({},t.rows[e.id],e)})},setCurrentRowIndex:function(e){var t=this;return i()(r.a.mark(function n(){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t.selectId!=e){n.next=2;break}return n.abrupt("return");case 2:if(t.selectId=e,t.currentRequestBody="",t.currentResponseBody="",/(json)|(x-www-form-urlencoded)/i.test(t.currentRow.reqHeaders["content-type"])&&(t.currentRequestBody=t.currentRow.reqBody),!/(text)|(javascript)|(json)/i.test(t.currentRow.contentType)){n.next=10;break}return n.next=9,x.a(e);case 9:t.currentResponseBody=n.sent;case 10:case"end":return n.stop()}},n,t)}))()}},computed:{total:function(){return this.bigId-this.smallId+1},currentRow:function(){return this.rows[this.selectId]||{}},requestHeader:function(){var e=u.a.assign({},this.currentRow.reqHeaders);return delete e.cookie,e},requestCookie:function(){return this.currentRow.reqHeaders?x.b(this.currentRow.reqHeaders.cookie||""):{}},requestQueryParams:function(){return x.c(this.currentRow.path)},requestRawHeader:function(){var e=this.currentRow;if(!this.currentRow.resHeaders)return"";var t=e.method+" "+e.protocol+"/"+e.httpVersion+" "+e.path+"\n";return u.a.forEach(this.requestHeader,function(e,n){t+=n+"    "+e+"\n"}),t},responseHeader:function(){var e=u.a.assign({},this.currentRow.resHeaders);return delete e["set-cookie"],e},setCookies:function(){return this.currentRow.resHeaders?this.currentRow.resHeaders["set-cookie"]:[]},responseRawHeader:function(){var e=this.currentRow;if(!this.currentRow.resHeaders)return"";var t=e.protocol+"/"+e.httpVersion+" "+e.result+"\n";return u.a.forEach(this.responseHeader,function(e,n){t+=n+"    "+e+"\n"}),t}},created:function(){if(this.calcSize(),c()(window).resize(u.a.debounce(this.calcSize,200)),window.io){io("/httptrafic").on("rows",this.receiveTraffic)}}}},156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(312),r=n.n(o),s=n(313),i=n.n(s);t.default={components:{RequestDetail:r.a,ResponseDetail:i.a}}},157:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),r=(n.n(o),n(311)),s=n.n(r),i=n(180),a=n.n(i),c=n(171),l=n.n(c),u=n(37);t.default={props:["height","width"],components:{List:s.a,ContextMenu:l.a},data:function(){return{resizeProxyVisible:!1,dragging:!1,draggingColumn:null,dragState:{},cols:[{id:"result",name:"state",width:60},{id:"protocol",name:"protocol",width:70},{id:"method",name:"method",width:70},{id:"host",name:"host",width:250},{id:"contentType",name:"content-type",width:200},{id:"body",name:"body",width:100},{id:"path",name:"path",width:0}]}},computed:{columns:function(){for(var e=this.cols,t=0,n=0;n<e.length-1;n++)t+=e[n].width;return e[e.length-1].width=this.width-t,e}},methods:{saveData:function(){var e=this;if(!this.$dc.rightClickRow.resTime)return void this.$message({message:"服务器还没有响应",type:"warning"});this.$prompt("请输入数据文件名","保存为数据文件",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var n=t.value;u.a.saveDataEntryFromTraffic(e.$dc.rightClickRow.idx,n,e.$dc.rightClickRow.contentType.split(";")[0]).then(function(t){var n=t.data;0==n.code?e.$message({type:"success",message:"保存成功!"}):e.$message.error("出错了，"+n.msg)})})},copyUrl:function(){a()(this.$dc.rightClickRow.protocol+"://"+this.$dc.rightClickRow.host+this.$dc.rightClickRow.path),this.$message("已将url复制到剪切板")},clickRow:function(e){this.$dc.setCurrentRowIndex(e)},onCtxOpen:function(e){this.$dc.rightClickRow=this.$dc.rows[e]},onCtxClose:function(e){},resetCtxLocals:function(){this.$dc.rightClickRow={}},handleMouseMove:function(e,t){for(var n=e.target;n&&"TH"!==n.tagName;)n=n.parentNode;if(!this.dragging){var o=n.getBoundingClientRect(),r=document.body.style;o.width>12&&o.right-e.pageX<8?(r.cursor="col-resize",this.draggingColumn=t):(r.cursor="",this.draggingColumn=null)}},handleMouseDown:function(e,t,n){var o=this;if(this.draggingColumn){this.dragging=!0,this.resizeProxyVisible=!0;var r=this.$el,s=r.getBoundingClientRect().left,i=this.$el.querySelector("\t#column_"+n),a=i.getBoundingClientRect(),c=a.left-s+30;this.dragState={startMouseLeft:e.clientX,startLeft:a.right-s,startColumnLeft:a.left-s,tableLeft:s};var l=this.$refs.resizeProxy;l.style.left=this.dragState.startLeft+"px",document.onselectstart=function(){return!1},document.ondragstart=function(){return!1};var u=function(e){var t=e.clientX-o.dragState.startMouseLeft,n=o.dragState.startLeft+t;l.style.left=Math.max(c,n)+"px"},d=function e(){if(o.dragging){var n=parseInt(l.style.left,10),r=n-o.dragState.startColumnLeft;t.width=r,document.body.style.cursor="",o.dragging=!1,o.draggingColumn=null,o.dragState={},o.resizeProxyVisible=!1}document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",e),document.onselectstart=null,document.ondragstart=null};document.addEventListener("mousemove",u),document.addEventListener("mouseup",d)}},handleMouseOut:function(e,t){document.body.style.cursor=""}}}},158:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["data"]}},159:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{total:{type:Number,required:!0},height:{type:Number,required:!0},rowHeight:{type:Number,required:!0}},data:function(){return{scrollTop:0,start:0}},computed:{ids:function(){for(var e=[],t=this.start;t<this.end;t++)e.push(t);return e},contentHeight:function(){return this.rowHeight*this.total},keeps:function(){return Math.ceil(this.height/this.rowHeight)+2},end:function(){var e=this.start+this.keeps-1;return e>this.total?this.total:e},top:function(){return this.rowHeight*this.start}},methods:{handleScroll:_.debounce(function(){this.scrollTop=this.$refs.container.scrollTop;var e=Math.floor(this.scrollTop/this.rowHeight);this.start=e},100)}}},160:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(92),r=n.n(o);t.default={components:{KeyValueList:r.a}}},161:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(92),r=n.n(o);t.default={components:{KeyValueList:r.a}}},167:function(e,t,n){"use strict";function o(e,t){try{return t(e)}catch(t){return e}}function r(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var n={},r=t||{},s=e.split(x),i=r.decode||v,a=0;a<s.length;a++){var c=s[a],l=c.indexOf("=");if(!(l<0)){var u=c.substr(0,l).trim(),d=c.substr(++l,c.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),void 0==n[u]&&(n[u]=o(d,i))}}return n}function s(e){return!e||e.indexOf("?")<0?{}:f.a.parse(e.split("?")[1])}var i=n(14),a=n.n(i),c=n(13),l=n.n(c),u=n(10),d=n.n(u),p=n(286),f=n.n(p);n.d(t,"a",function(){return h}),t.b=r,t.c=s;var h=function(){var e=l()(a.a.mark(function e(t){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/traffic/getResponseBody?id="+t);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return","");case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t){return e.apply(this,arguments)}}(),x=/; */,v=decodeURIComponent},169:function(e,t){e.exports=function(e){function t(t){t.preventDefault(),"function"==typeof e&&e(t);try{stop()}catch(e){}}function n(e){27===e.keyCode&&t(e)}var o=!1;return{get isListening(){return o},start:function(e){window.addEventListener("click",t,!0),window.addEventListener("keyup",n,!0),o=!0,"function"==typeof e&&e()},stop:function(e){window.removeEventListener("click",t,!0),window.removeEventListener("keyup",n,!0),o=!1,"function"==typeof e&&e()}}}},170:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(169),r=n.n(o);t.default={name:"context-menu",props:{id:{type:String,default:"default-ctx"},ctxOpen:{type:Function},ctxCancel:{type:Function},ctxClose:{type:Function}},data:function(){var e=this;return{locals:{},align:"left",ctxTop:0,ctxLeft:0,ctxVisible:!1,bodyClickListener:r()(function(t){if(!e.ctxVisible||e.$el.contains(t.target))e.ctxVisible=!1,e.ctxClose&&e.ctxClose(e.locals);else{if(1!==t.which)return t.preventDefault(),t.stopPropagation(),!1;e.ctxVisible=!1,e.ctxCancel&&e.ctxCancel(e.locals),t.stopPropagation()}})}},methods:{setPositionFromEvent:function(e){var t=e.pageX,n=e.pageY;this.ctxTop=n-document.body.scrollTop,this.ctxLeft=t},open:function(e,t){return this.ctxVisible=!0,this.ctxOpen&&this.ctxOpen(t),this.setPositionFromEvent(e),this.$el.setAttribute("tab-index",-1),this.bodyClickListener.start(),this}},watch:{ctxVisible:function(e,t){t===!0&&e===!1&&this.bodyClickListener.stop(function(e){})}},computed:{ctxStyle:function(){return{display:this.ctxVisible?"block":"none",top:(this.ctxTop||0)+"px",left:(this.ctxLeft||0)+"px"}}}}},171:function(e,t,n){var o=n(292);o.install=function(e){return e.component("context-menu",o)},window.VueContextMenu=o,e.exports=e.exports.default=o},173:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(97),s=n.n(r),i=n(22),a=n.n(i),c=n(21),l=n.n(c),u=n(11);n.n(u);o.default.use(l.a),o.default.use(a.a),new o.default({el:"#app",render:function(e){return e(s.a)}})},217:function(e,t,n){t=e.exports=n(3)(),t.push([e.i,"\n.cookie-row {\n  border-bottom: solid 1px #dfe6ec;\n  font-size: 12px;\n  padding-left: 5px;\n}\n",""])},219:function(e,t,n){t=e.exports=n(3)(),t.push([e.i,"\n.el-table .el-table__header-wrapper .el-table__header .cell {\n\n    padding: 0;\n\n    text-align: center;\n\n    white-space: nowrap;\n\n    font-size: 12px;\n\n    line-height: 22px;\n}\n.el-table .el-table__body-wrapper .el-table__body td {\n\n    height: 22px;\n}\n.el-table .el-table__body-wrapper .el-table__body .cell {\n\n    padding: 0;\n\n    white-space: nowrap;\n\n    font-size: 12px;\n\n    line-height: 22px;\n\n    text-align: left;\n\n    overflow: hidden;\n\n    text-overflow: ellipsis;\n}\n.el-table--enable-row-hover tr:hover > td {\n\n    background-color: #eef1f6\n}\n.el-table--enable-row-hover .user-selected > td {\n\n    background-color: #eef1f6\n}\n\n",""])},224:function(e,t,n){t=e.exports=n(3)(),t.push([e.i,'\n.ctx {\n  position: relative;\n}\n.ctx-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  font-size: .9rem;\n  color: #373a3c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: .25rem; box-shadow:0 0 5px #CCC\n}\n.ctx-divider {\n  height: 1px;\n  margin: .5rem 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.ctx-item {\n  display: block;\n  /*width: 100%;*/\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #373a3c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0;\n  cursor: default;\n}\n.ctx-item:focus, .ctx-item:hover {\n  color: #2b2d2f;\n  text-decoration: none;\n  background-color: #f5f5f5;\n  cursor: normal;\n}\n.ctx-item.active, .ctx-item.active:focus, .ctx-item.active:hover {\n  color: #fff;\n  text-decoration: none;\n  background-color: #0275d8;\n  outline: 0;\n}\n.ctx-item.disabled, .ctx-item.disabled:focus, .ctx-item.disabled:hover {\n  color: #818a91;\n}\n.ctx-item.disabled:focus, .ctx-item.disabled:hover {\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n  background-image: none;\n  filter: "progid:DXImageTransform.Microsoft.gradient(enabled = false)";\n}\n.open > .ctx-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.ctx-menu-right {\n  right: 0;\n  left: auto;\n}\n.ctx-menu-left {\n  right: auto;\n  left: 0;\n}\n.ctx-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: .9rem;\n  line-height: 1.5;\n  color: #818a91;\n  white-space: nowrap;\n}\n.ctx-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990;\n}\n.pull-right > .ctx-menu {\n  right: 0;\n  left: auto;\n}\n.ctx-menu-container {\n  position: fixed;\n  padding: 0;\n  border: 1px solid #bbb;\n  background-color: whitesmoke;\n  z-index: 99999;\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n}\n',""])},225:function(e,t,n){t=e.exports=n(3)(),t.push([e.i,"\n.el-tabs--border-card {\n    height: 100%;\n}\n.el-tabs__content {\n    height: calc(100% - 42px);\n}\n.detail .el-tabs--border-card .el-tabs__content {\n    padding: 0;\n}\n.detail .el-tabs--border-card .el-tabs__content .el-tab-pane {\n    height: 100%;\n}\n.text-area {\n    width: 100%;\n    background: none 0px 0px repeat scroll rgb(254, 254, 254);\n    height: 100%;\n    border: none;\n}\n",""])},227:function(e,t,n){t=e.exports=n(3)(),t.push([e.i,"\n.keyvalue-wrapper {\n  height: 100%;\n  width: 100%;\n  overflow: scroll;\n  font-size: 12px;\n}\n.keyvalue-row {\n  border-bottom: solid 1px #dfe6ec;\n  height: 22px;\n  line-height: 22px;\n  white-space: nowrap;\n}\n.keyvalue-key {\n  display: inline-block;\n  width: 200px;\n  overflow: hidden;\n  border-right: solid 1px #dfe6ec;\n  padding-left: 5px;\n}\n.keyvalue-value {\n  display: inline-block;\n  padding-left: 5px;\n  vertical-align: top;\n}\n",""])},292:function(e,t,n){n(358);var o=n(0)(n(170),n(333),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/context-menu/index.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},309:function(e,t,n){var o=n(0)(n(156),n(318),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/Detail.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] Detail.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},310:function(e,t,n){n(353);var o=n(0)(n(157),n(323),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/HttpTraffic.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] HttpTraffic.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},311:function(e,t,n){var o=n(0)(n(159),n(332),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/List.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] List.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},312:function(e,t,n){var o=n(0)(n(160),n(324),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/RequestDetail.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] RequestDetail.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},313:function(e,t,n){n(351);var o=n(0)(n(161),n(321),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/ResponseDetail.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] ResponseDetail.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},318:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{height:"100%",width:"100%","font-size":"0"}},[n("div",{staticStyle:{width:"50%",height:"100%",display:"inline-block"}},[n("request-detail")],1),e._v(" "),n("div",{staticStyle:{width:"50%",height:"100%",display:"inline-block"}},[n("response-detail")],1)])},staticRenderFns:[]},e.exports.render._withStripped=!0},321:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{attrs:{type:"border-card"}},[n("el-tab-pane",{attrs:{label:"Response Header"}},[n("key-value-list",{attrs:{data:e.$dc.responseHeader}})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"Response Set Cookie"}},e._l(e.$dc.setCookies,function(t){return n("div",{staticClass:"cookie-row"},[e._v("\n      "+e._s(t)+"\n    ")])})),e._v(" "),n("el-tab-pane",{attrs:{label:"Response Raw Header"}},[n("textarea",{staticClass:"text-area"},[e._v(e._s(e.$dc.responseRawHeader))])]),e._v(" "),n("el-tab-pane",{attrs:{label:"Response Body"}},[n("textarea",{staticClass:"text-area"},[e._v(e._s(e.$dc.currentResponseBody))])])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},323:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition",staticStyle:{width:"100%",height:"250px"},style:{width:"100%",height:e.height+"px"}},[n("div",{staticClass:"el-table__header-wrapper"},[n("table",{staticClass:"el-table__header",staticStyle:{width:"100%"},attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[n("colgroup",e._l(e.columns,function(e,t){return n("col",{attrs:{name:"head_col_"+t,width:e.width}})})),e._v(" "),n("thead",[n("tr",e._l(e.columns,function(t,o){return n("th",{staticStyle:{height:"22px"},attrs:{id:"column_"+o},on:{mousemove:function(n){e.handleMouseMove(n,t,o)},mousedown:function(n){e.handleMouseDown(n,t,o)},mouseout:function(n){e.handleMouseOut(n,t,o)}}},[n("div",{staticClass:"cell"},[e._v(e._s(t.name))])])}))])])]),e._v(" "),n("div",{staticClass:"el-table__body-wrapper"},[n("list",{attrs:{total:e.$dc.total,height:e.height-22,rowHeight:23},scopedSlots:e._u([{key:"default",fn:function(t){return[n("table",{staticClass:"el-table__body",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[n("colgroup",e._l(e.columns,function(e,t){return n("col",{attrs:{name:"body_col_"+t,width:e.width}})})),e._v(" "),e._l(t.ids,function(t){return n("tr",{class:{"user-selected":e.$dc.selectId==t+e.$dc.smallId},on:{click:function(n){e.clickRow(t+e.$dc.smallId)},contextmenu:function(n){n.preventDefault(),e.$refs.ctx.open(n,t+e.$dc.smallId)}}},e._l(e.columns,function(o){return n("td",[n("div",{staticClass:"cell",style:{width:o.width+"px"}},[e._v("\n                "+e._s(e.$dc.rows[t+e.$dc.smallId][o.id])+"\n              ")])])}))})],2)]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.resizeProxyVisible,expression:"resizeProxyVisible"}],ref:"resizeProxy",staticClass:"el-table__column-resize-proxy"}),e._v(" "),n("context-menu",{ref:"ctx",attrs:{id:"testingctx",ctxOpen:e.onCtxOpen,ctxCancel:e.resetCtxLocals,ctxClose:e.onCtxClose}},[n("li",{staticClass:"ctx-item",on:{click:e.saveData}},[e._v("保存为mock数据")]),e._v(" "),n("li",{staticClass:"ctx-item",on:{click:e.copyUrl}},[e._v("复制url")])])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},324:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{attrs:{type:"border-card"}},[n("el-tab-pane",{attrs:{label:"Header"}},[n("key-value-list",{attrs:{data:e.$dc.requestHeader}})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"Cookie"}},[n("key-value-list",{attrs:{data:e.$dc.requestCookie}})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"Query Params"}},[n("key-value-list",{attrs:{data:e.$dc.requestQueryParams}})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"Raw Header"}},[n("textarea",{staticClass:"text-area"},[e._v(e._s(e.$dc.requestRawHeader))])]),e._v(" "),n("el-tab-pane",{attrs:{label:"Body"}},[n("textarea",{staticClass:"text-area"},[e._v(e._s(e.$dc.currentRequestBody))])])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},332:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"container",style:{"overflow-y":"auto",height:e.height+"px"},on:{scroll:e.handleScroll}},[n("div",{style:{height:e.contentHeight+"px"}},[n("div",{style:{transform:"translate3d(0,"+e.top+"px,0)"}},[e._t("default",null,{ids:e.ids})],2)])])},staticRenderFns:[]},e.exports.render._withStripped=!0},333:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"contextMenu",staticClass:"ctx-menu-container",style:e.ctxStyle,attrs:{id:e.id},on:{click:function(e){e.stopPropagation()},contextmenu:function(e){e.stopPropagation()}}},[n("div",{staticClass:"ctx open",staticStyle:{"background-color":"transparent"}},[n("ul",{staticClass:"ctx-menu",class:{"ctx-menu-right":"right"===e.align,"ctx-menu-left":"left"===e.align},attrs:{role:"menu"}},[e._t("default")],2)])])},staticRenderFns:[]},e.exports.render._withStripped=!0},334:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{height:"100%"},attrs:{id:"app"}},[n("http-traffic",{attrs:{height:e.height,width:e.width}}),e._v(" "),n("div",{staticClass:"detail",staticStyle:{height:"300px"}},[n("detail")],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},336:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"keyvalue-wrapper"},[e._l(e.data,function(t,o){return[n("div",{staticClass:"keyvalue-row"},[n("div",{staticClass:"keyvalue-key"},[e._v("\n        "+e._s(o)+"\n      ")]),e._v(" "),n("div",{staticClass:"keyvalue-value"},[e._v("\n        "+e._s(t)+"\n      ")])])]})],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},351:function(e,t,n){var o=n(217);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(4)("db10da4a",o,!1)},353:function(e,t,n){var o=n(219);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(4)("ac7a7504",o,!1)},358:function(e,t,n){var o=n(224);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(4)("2a7f9533",o,!1)},359:function(e,t,n){var o=n(225);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(4)("fdd06594",o,!1)},361:function(e,t,n){var o=n(227);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(4)("6e56a767",o,!1)},37:function(e,t,n){"use strict";var o=n(10),r=n.n(o),s=n(26),i=n.n(s);t.a={getDataList:function(){return r.a.get("/data/getdatalist")},saveDataList:function(e){return r.a.post("/data/savedatalist",e)},getDataFile:function(e){return r.a.get("/data/getdatafile?id="+e)},saveDataFile:function(e,t){var n=new FormData;return n.append("content",t),r.a.post("/data/savedatafile?id="+e,n)},saveDataEntryFromTraffic:function(e,t,n){return r.a.post("/data/savedatafromtraffic",{id:i()(),name:t,contenttype:n,reqid:e})}}},92:function(e,t,n){n(361);var o=n(0)(n(158),n(336),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/components/KeyValueList.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] KeyValueList.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},97:function(e,t,n){n(359);var o=n(0)(n(155),n(334),null,null);o.options.__file="/Users/tsxuehu/workspace-mock/fe-proxy/webui/src/monitor/App.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports}},[173]);
//# sourceMappingURL=monitor.js.map