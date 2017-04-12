//! TrackJS JavaScript error monitoring agent.
//! COPYRIGHT (c) 2017 ALL RIGHTS RESERVED
//! See License at https://trackjs.com/terms/
(function(h,n,l){"use awesome";if(h.trackJs)h.console&&h.console.warn&&h.console.warn("TrackJS global conflict");else{var p=function(a,b,c,d,f){this.util=a;this.onError=b;this.onFault=c;this.options=f;f.enabled&&this.initialize(d)};p.prototype={initialize:function(a){e.forEach(["EventTarget","Node","XMLHttpRequest"],function(b){e.has(a,b+".prototype.addEventListener")&&(b=a[b].prototype,b.hasOwnProperty("addEventListener")&&(this.wrapAndCatch(b,"addEventListener",1),this.wrapRemoveEventListener(b)))},
this);this.wrapAndCatch(a,"setTimeout",0);this.wrapAndCatch(a,"setInterval",0)},wrapAndCatch:function(a,b,c){var d=this,f=a[b];e.isWrappableFunction(f)&&(a[b]=function(){try{var g=Array.prototype.slice.call(arguments),k=g[c],m,h;if(d.options.bindStack)try{throw Error();}catch(l){h=l.stack,m=d.util.isoNow()}var E=function(){try{if(e.isObject(k))return k.handleEvent.apply(k,arguments);if(e.isFunction(k))return k.apply(this,arguments)}catch(a){throw d.onError("catch",a,{bindTime:m,bindStack:h}),e.wrapError(a);
}};if("addEventListener"===b&&(this._trackJsEvt||(this._trackJsEvt=new q),this._trackJsEvt.get(g[0],k,g[2])))return;try{k&&(e.isWrappableFunction(k)||e.isWrappableFunction(k.handleEvent))&&(g[c]=E,"addEventListener"===b&&this._trackJsEvt.add(g[0],k,g[2],g[c]))}catch(l){return f.apply(this,arguments)}return f.apply(this,g)}catch(l){a[b]=f,d.onFault(l)}})},wrapRemoveEventListener:function(a){if(a&&a.removeEventListener&&this.util.hasFunction(a.removeEventListener,"call")){var b=a.removeEventListener;
a.removeEventListener=function(a,d,f){if(this._trackJsEvt){var g=this._trackJsEvt.get(a,d,f);if(g)return this._trackJsEvt.remove(a,d,f),b.call(this,a,g,f)}return b.call(this,a,d,f)}}}};var q=function(){this.events=[]};q.prototype={add:function(a,b,c,d){-1>=this.indexOf(a,b,c)&&(c=this.getEventOptions(c),this.events.push([a,b,c.capture,c.once,c.passive,d]))},get:function(a,b,c){a=this.indexOf(a,b,c);return 0<=a?this.events[a][5]:l},getEventOptions:function(a){var b={capture:!1,once:!1,passive:!1};
return e.isBoolean(a)?e.defaults({},{capture:a},b):e.defaults({},a,b)},indexOf:function(a,b,c){c=this.getEventOptions(c);for(var d=0;d<this.events.length;d++){var f=this.events[d];if(f[0]===a&&f[1]===b&&f[2]===c.capture&&f[3]===c.once&&f[4]===c.passive)return d}return-1},remove:function(a,b,c){a=this.indexOf(a,b,c);0<=a&&this.events.splice(a,1)}};var t=function(a){this.initCurrent(a)};t.prototype={current:{},initOnly:{cookie:!0,enabled:!0,token:!0,callback:{enabled:!0},console:{enabled:!0},navigation:{enabled:!0},
network:{enabled:!0},visitor:{enabled:!0},window:{enabled:!0,promise:!0}},defaults:{application:"",cookie:!1,dedupe:!0,enabled:!0,errorURL:"https://capture.trackjs.com/capture",errorNoSSLURL:"http://capture.trackjs.com/capture",faultURL:"https://usage.trackjs.com/fault.gif",onError:function(){return!0},serialize:function(a){function b(a){for(var c="<"+a.tagName.toLowerCase(),b=0;b<a.attributes.length;b++)c+=" "+a.attributes[b].name+'="'+a.attributes[b].value+'"';return c+">"}if(""===a)return"Empty String";
if(a===l)return"undefined";if(e.isString(a)||e.isNumber(a)||e.isBoolean(a)||e.isFunction(a))return""+a;if(h.HTMLElement&&a instanceof HTMLElement&&a.attributes)return b(a);var c;try{c=JSON.stringify(a,function(a,c){return c===l?"undefined":e.isNumber(c)&&isNaN(c)?"NaN":e.isError(c)?{name:c.name,message:c.message,stack:c.stack}:h.HTMLElement&&c instanceof HTMLElement&&c.attributes?b(c):c})}catch(f){c="";for(var d in a)a.hasOwnProperty(d)&&(c+=',"'+d+'":"'+a[d]+'"');c=c?"{"+c.replace(",","")+"}":"Unserializable Object"}return c.replace(/"undefined"/g,
"undefined").replace(/"NaN"/g,"NaN")},sessionId:"",token:"",userId:"",version:"",callback:{enabled:!0,bindStack:!1},console:{enabled:!0,display:!0,error:!0,warn:!1,watch:["log","debug","info","warn","error"]},navigation:{enabled:!0},network:{enabled:!0,error:!0},visitor:{enabled:!0},usageURL:"https://usage.trackjs.com/usage.gif",window:{enabled:!0,promise:!0}},initCurrent:function(a){if(this.validate(a,this.defaults,"config",{}))return this.current=e.defaultsDeep({},a,this.defaults),!0;this.current=
e.defaultsDeep({},this.defaults);console.log("init current config",this.current);return!1},setCurrent:function(a){return this.validate(a,this.defaults,"config",this.initOnly)?(this.current=e.defaultsDeep({},a,this.current),!0):!1},validate:function(a,b,c,d){var f=!0;c=c||"";d=d||{};for(var g in a)if(a.hasOwnProperty(g))if(b.hasOwnProperty(g)){var e=typeof b[g];e!==typeof a[g]?(console.warn(c+"."+g+": property must be type "+e+"."),f=!1):"[object Array]"!==Object.prototype.toString.call(a[g])||this.validateArray(a[g],
b[g],c+"."+g)?"[object Object]"===Object.prototype.toString.call(a[g])?f=this.validate(a[g],b[g],c+"."+g,d[g]):d.hasOwnProperty(g)&&(console.warn(c+"."+g+": property cannot be set after load."),f=!1):f=!1}else console.warn(c+"."+g+": property not supported."),f=!1;return f},validateArray:function(a,b,c){var d=!0;c=c||"";for(var f=0;f<a.length;f++)e.contains(b,a[f])||(console.warn(c+"["+f+"]: invalid value: "+a[f]+"."),d=!1);return d}};var u=function(a,b,c,d,f,g,e){this.util=a;this.log=b;this.onError=
c;this.onFault=d;this.serialize=f;e.enabled&&(g.console=this.wrapConsoleObject(g.console,e))};u.prototype={wrapConsoleObject:function(a,b){a=a||{};var c=a.log||function(){},d=this,f;for(f=0;f<b.watch.length;f++)(function(f){var k=a[f]||c;a[f]=function(){try{var a=Array.prototype.slice.call(arguments);d.log.add("c",{timestamp:d.util.isoNow(),severity:f,message:d.serialize(1===a.length?a[0]:a)});if(b[f])if(e.isError(a[0])&&1===a.length)d.onError("console",a[0]);else try{throw Error(d.serialize(1===
a.length?a[0]:a));}catch(c){d.onError("console",c)}b.display&&(d.util.hasFunction(k,"apply")?k.apply(this,a):k(a[0]))}catch(c){d.onFault(c)}}})(b.watch[f]);return a},report:function(){return this.log.all("c")}};var v=function(a,b,c,d,f){this.config=a;this.util=b;this.log=c;this.window=d;this.document=f;this.correlationId=this.token=null;this.initialize()};v.prototype={initialize:function(){this.token=this.getCustomerToken();this.correlationId=this.getCorrelationId()},getCustomerToken:function(){if(this.config.current.token)return this.config.current.token;
var a=this.document.getElementsByTagName("script");return a[a.length-1].getAttribute("data-token")},getCorrelationId:function(){var a;if(!this.config.current.cookie)return this.util.uuid();try{a=this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/,"$1"),a||(a=this.util.uuid(),this.document.cookie="TrackJS="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")}catch(b){a=this.util.uuid()}return a},report:function(){return{application:this.config.current.application,correlationId:this.correlationId,
sessionId:this.config.current.sessionId,token:this.token,userId:this.config.current.userId,version:this.config.current.version}}};var w=function(a){this.loadedOn=(new Date).getTime();this.window=a};w.prototype={discoverDependencies:function(){var a,b={};this.window.jQuery&&this.window.jQuery.fn&&this.window.jQuery.fn.jquery&&(b.jQuery=this.window.jQuery.fn.jquery);this.window.jQuery&&this.window.jQuery.ui&&this.window.jQuery.ui.version&&(b.jQueryUI=this.window.jQuery.ui.version);this.window.angular&&
this.window.angular.version&&this.window.angular.version.full&&(b.angular=this.window.angular.version.full);for(a in this.window)if("_trackJs"!==a&&"_trackJS"!==a&&"_trackjs"!==a&&"webkitStorageInfo"!==a&&"webkitIndexedDB"!==a&&"top"!==a&&"parent"!==a&&"frameElement"!==a)try{if(this.window[a]){var c=this.window[a].version||this.window[a].Version||this.window[a].VERSION;"string"===typeof c&&(b[a]=c)}}catch(d){}return b},report:function(){return{age:(new Date).getTime()-this.loadedOn,dependencies:this.discoverDependencies(),
userAgent:this.window.navigator.userAgent,viewportHeight:this.window.document.documentElement.clientHeight,viewportWidth:this.window.document.documentElement.clientWidth}}};var y=function(a){this.util=a;this.appender=[];this.maxLength=30};y.prototype={all:function(a){var b=[],c,d;for(d=0;d<this.appender.length;d++)(c=this.appender[d])&&c.category===a&&b.push(c.value);return b},clear:function(){this.appender.length=0},truncate:function(){this.appender.length>this.maxLength&&(this.appender=this.appender.slice(Math.max(this.appender.length-
this.maxLength,0)))},add:function(a,b){var c=this.util.uuid();this.appender.push({key:c,category:a,value:b});this.truncate();return c},get:function(a,b){var c,d;for(d=0;d<this.appender.length;d++)if(c=this.appender[d],c.category===a&&c.key===b)return c.value;return!1}};var z=function(a,b){this.log=a;this.options=b;b.enabled&&this.watch()};z.prototype={isCompatible:function(a){a=a||h;return!e.has(a,"chrome.app.runtime")&&e.has(a,"addEventListener")&&e.has(a,"history.pushState")},record:function(a,
b,c){this.log.add("h",{type:a,from:e.truncate(b,250),to:e.truncate(c,250),on:e.isoNow()})},report:function(){return this.log.all("h")},watch:function(){if(this.isCompatible()){var a=this,b=e.getLocationURL().relative;h.addEventListener("popstate",function(){var c=e.getLocationURL().relative;a.record("popState",b,c);b=c},!0);e.forEach(["pushState","replaceState"],function(c){e.patch(history,c,function(d){return function(){b=e.getLocationURL().relative;var f=d.apply(this,arguments),g=e.getLocationURL().relative;
a.record(c,b,g);b=g;return f}})})}}};var A=function(a,b,c,d,f,g){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.window=f;this.options=g;g.enabled&&this.initialize(f)};A.prototype={initialize:function(a){a.XMLHttpRequest&&this.util.hasFunction(a.XMLHttpRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XMLHttpRequest);a.XDomainRequest&&this.util.hasFunction(a.XDomainRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XDomainRequest)},watchNetworkObject:function(a){var b=this,
c=a.prototype.open,d=a.prototype.send;a.prototype.open=function(a,b){var d=(b||"").toString();0>d.indexOf("localhost:0")&&(this._trackJs={method:a,url:d});return c.apply(this,arguments)};a.prototype.send=function(){try{if(!this._trackJs)return d.apply(this,arguments);this._trackJs.logId=b.log.add("n",{startedOn:b.util.isoNow(),method:this._trackJs.method,url:this._trackJs.url});b.listenForNetworkComplete(this)}catch(a){b.onFault(a)}return d.apply(this,arguments)};return a},listenForNetworkComplete:function(a){var b=
this;b.window.ProgressEvent&&a.addEventListener&&a.addEventListener("readystatechange",function(){4===a.readyState&&b.finalizeNetworkEvent(a)},!0);a.addEventListener?a.addEventListener("load",function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a)},!0):setTimeout(function(){try{var c=a.onload;a.onload=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof c&&b.util.hasFunction(c,"apply")&&c.apply(a,arguments)};var d=a.onerror;a.onerror=function(){b.finalizeNetworkEvent(a);
b.checkNetworkFault(a);"function"===typeof oldOnError&&d.apply(a,arguments)}}catch(f){b.onFault(f)}},0)},finalizeNetworkEvent:function(a){if(a._trackJs){var b=this.log.get("n",a._trackJs.logId);b&&(b.completedOn=this.util.isoNow(),b.statusCode=1223==a.status?204:a.status,b.statusText=1223==a.status?"No Content":a.statusText)}},checkNetworkFault:function(a){if(this.options.error&&400<=a.status&&1223!=a.status){var b=a._trackJs||{};this.onError("ajax",a.status+" "+a.statusText+": "+b.method+" "+b.url)}},
report:function(){return this.log.all("n")}};var x=function(a,b){this.util=a;this.config=b;this.disabled=!1;this.throttleStats={attemptCount:0,throttledCount:0,lastAttempt:(new Date).getTime()};h.JSON&&h.JSON.stringify||(this.disabled=!0)};x.prototype={errorEndpoint:function(a){var b=this.config.current.errorURL;this.util.testCrossdomainXhr()||-1!==h.location.protocol.indexOf("https")||(b=this.config.current.errorNoSSLURL);return b+"?token="+a},usageEndpoint:function(a){return this.appendObjectAsQuery(a,
this.config.current.usageURL)},trackerFaultEndpoint:function(a){return this.appendObjectAsQuery(a,this.config.current.faultURL)},appendObjectAsQuery:function(a,b){b+="?";for(var c in a)a.hasOwnProperty(c)&&(b+=encodeURIComponent(c)+"="+encodeURIComponent(a[c])+"&");return b},getCORSRequest:function(a,b){var c;this.util.testCrossdomainXhr()?(c=new h.XMLHttpRequest,c.open(a,b),c.setRequestHeader("Content-Type","text/plain")):"undefined"!==typeof h.XDomainRequest?(c=new h.XDomainRequest,c.open(a,b)):
c=null;return c},sendTrackerFault:function(a){this.throttle(a)||((new Image).src=this.trackerFaultEndpoint(a))},sendUsage:function(a){(new Image).src=this.usageEndpoint(a)},sendError:function(a,b){var c=this;if(!this.disabled&&!this.throttle(a))try{var d=this.getCORSRequest("POST",this.errorEndpoint(b));d.onreadystatechange=function(){4===d.readyState&&200!==d.status&&(c.disabled=!0)};d._trackJs=l;d.send(h.JSON.stringify(a))}catch(f){throw this.disabled=!0,f;}},throttle:function(a){var b=(new Date).getTime();
this.throttleStats.attemptCount++;if(this.throttleStats.lastAttempt+1E3>=b){if(this.throttleStats.lastAttempt=b,10<this.throttleStats.attemptCount)return this.throttleStats.throttledCount++,!0}else a.throttled=this.throttleStats.throttledCount,this.throttleStats.attemptCount=0,this.throttleStats.lastAttempt=b,this.throttleStats.throttledCount=0;return!1}};var e=function(){function a(c,d,f,g){f=f||!1;g=g||0;e.forEach(d,function(d){e.forEach(e.keys(d),function(e){null===d[e]||d[e]===l?c[e]=d[e]:f&&
10>g&&"[object Object]"===b(d[e])?(c[e]=c[e]||{},a(c[e],[d[e]],f,g+1)):c.hasOwnProperty(e)||(c[e]=d[e])})});return c}function b(a){return Object.prototype.toString.call(a)}return{addEventListenerSafe:function(a,b,f,e){a.addEventListener?a.addEventListener(b,f,e):a.attachEvent&&a.attachEvent("on"+b,f)},afterDocumentLoad:function(a){var b=!1;"complete"===n.readyState?e.defer(a):(e.addEventListenerSafe(n,"readystatechange",function(){"complete"!==n.readyState||b||(e.defer(a),b=!0)}),setTimeout(function(){b||
(e.defer(a),b=!0)},1E4))},bind:function(a,b){return function(){return a.apply(b,Array.prototype.slice.call(arguments))}},contains:function(a,b){var f;for(f=0;f<a.length;f++)if(a[f]===b)return!0;return!1},defaults:function(c){return a(c,Array.prototype.slice.call(arguments,1),!1)},defaultsDeep:function(c){return a(c,Array.prototype.slice.call(arguments,1),!0)},defer:function(a,b){setTimeout(function(){a.apply(b)})},forEach:function(a,b,f){if(a.forEach)return a.forEach(b,f);for(var e=0;e<a.length;)b.call(f,
a[e],e,a),e++},getLocation:function(){return h.location.toString().replace(/ /g,"%20")},getLocationURL:function(){return e.parseURL(e.getLocation())},has:function(a,b){for(var f=b.split("."),e=a,k=0;k<f.length;k++)if(e[f[k]])e=e[f[k]];else return!1;return!0},hasFunction:function(a,b){try{return!!a[b]}catch(f){return!1}},isArray:function(a){return"[object Array]"===b(a)},isBoolean:function(a){return"boolean"===typeof a||e.isObject(a)&&"[object Boolean]"===b(a)},isBrowserIE:function(a){a=a||h.navigator.userAgent;
var b=a.match(/Trident\/([\d.]+)/);return b&&"7.0"===b[1]?11:(a=a.match(/MSIE ([\d.]+)/))?parseInt(a[1],10):!1},isBrowserSupported:function(){var a=this.isBrowserIE();return!a||8<=a},isError:function(a){if(!e.isObject(a))return!1;var d=b(a);return"[object Error]"===d||"[object DOMException]"===d||e.isString(a.name)&&e.isString(a.message)},isFunction:function(a){return!(!a||"function"!==typeof a)},isNumber:function(a){return"number"===typeof a||e.isObject(a)&&"[object Number]"===b(a)},isObject:function(a){return!(!a||
"object"!==typeof a)},isString:function(a){return"string"===typeof a||!e.isArray(a)&&e.isObject(a)&&"[object String]"===b(a)},isWrappableFunction:function(a){return this.isFunction(a)&&this.hasFunction(a,"apply")},isoNow:function(){var a=new Date;return a.toISOString?a.toISOString():a.getUTCFullYear()+"-"+this.pad(a.getUTCMonth()+1)+"-"+this.pad(a.getUTCDate())+"T"+this.pad(a.getUTCHours())+":"+this.pad(a.getUTCMinutes())+":"+this.pad(a.getUTCSeconds())+"."+String((a.getUTCMilliseconds()/1E3).toFixed(3)).slice(2,
5)+"Z"},keys:function(a){if(!e.isObject(a))return[];var b=[],f;for(f in a)a.hasOwnProperty(f)&&b.push(f);return b},noop:function(){},pad:function(a){a=String(a);1===a.length&&(a="0"+a);return a},parseURL:function(a){var b=a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!b)return{};b={protocol:b[2],host:b[4],path:b[5],query:b[6],hash:b[8]};b.origin=(b.protocol||"")+"://"+(b.host||"");b.relative=(b.path||"")+(b.query||"")+(b.hash||"");b.href=a;return b},patch:function(a,
b,f){a[b]=f(a[b]||e.noop)},testCrossdomainXhr:function(){return"withCredentials"in new XMLHttpRequest},truncate:function(a,b){if(a.length<=b)return a;var f=a.length-b;return a.substr(0,b)+"...{"+f+"}"},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})},wrapError:function(a){if(a.innerError)return a;var b=Error("TrackJS Caught: "+(a.message||a));b.description="TrackJS Caught: "+a.description;b.file=
a.file;b.line=a.line||a.lineNumber;b.column=a.column||a.columnNumber;b.stack=a.stack;b.innerError=a;return b}}}(),B=function(a,b,c,d,f,e){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.options=e;this.document=f;e.enabled&&this.initialize(f)};B.prototype={initialize:function(a){var b=this.util.bind(this.onDocumentClicked,this),c=this.util.bind(this.onInputChanged,this);a.addEventListener?(a.addEventListener("click",b,!0),a.addEventListener("blur",c,!0)):a.attachEvent&&(a.attachEvent("onclick",
b),a.attachEvent("onfocusout",c))},onDocumentClicked:function(a){try{var b=this.getElementFromEvent(a);b&&b.tagName&&(this.isDescribedElement(b,"a")||this.isDescribedElement(b,"button")||this.isDescribedElement(b,"input",["button","submit"])?this.writeVisitorEvent(b,"click"):this.isDescribedElement(b,"input",["checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value,b.checked))}catch(c){this.onFault(c)}},onInputChanged:function(a){try{var b=this.getElementFromEvent(a);if(b&&b.tagName)if(this.isDescribedElement(b,
"textarea"))this.writeVisitorEvent(b,"input",b.value);else if(this.isDescribedElement(b,"select")&&b.options&&b.options.length)this.onSelectInputChanged(b);else this.isDescribedElement(b,"input")&&!this.isDescribedElement(b,"input",["button","submit","hidden","checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value)}catch(c){this.onFault(c)}},onSelectInputChanged:function(a){if(a.multiple)for(var b=0;b<a.options.length;b++)a.options[b].selected&&this.writeVisitorEvent(a,"input",a.options[b].value);
else 0<=a.selectedIndex&&a.options[a.selectedIndex]&&this.writeVisitorEvent(a,"input",a.options[a.selectedIndex].value)},writeVisitorEvent:function(a,b,c,d){"password"===this.getElementType(a)&&(c=l);this.log.add("v",{timestamp:this.util.isoNow(),action:b,element:{tag:a.tagName.toLowerCase(),attributes:this.getElementAttributes(a),value:this.getMetaValue(c,d)}})},getElementFromEvent:function(a){return a.target||n.elementFromPoint(a.clientX,a.clientY)},isDescribedElement:function(a,b,c){if(a.tagName.toLowerCase()!==
b.toLowerCase())return!1;if(!c)return!0;a=this.getElementType(a);for(b=0;b<c.length;b++)if(c[b]===a)return!0;return!1},getElementType:function(a){return(a.getAttribute("type")||"").toLowerCase()},getElementAttributes:function(a){for(var b={},c=0;c<a.attributes.length;c++)"value"!==a.attributes[c].name.toLowerCase()&&(b[a.attributes[c].name]=a.attributes[c].value);return b},getMetaValue:function(a,b){return a===l?l:{length:a.length,pattern:this.matchInputPattern(a),checked:b}},matchInputPattern:function(a){return""===
a?"empty":/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a)?"email":/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a)||/^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a)?"date":/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a)?
"usphone":/^\s*$/.test(a)?"whitespace":/^\d*$/.test(a)?"numeric":/^[a-zA-Z]*$/.test(a)?"alpha":/^[a-zA-Z0-9]*$/.test(a)?"alphanumeric":"characters"},report:function(){return this.log.all("v")}};var C=function(a,b,c,d,f){this.onError=a;this.onFault=b;this.serialize=c;f.enabled&&this.watchWindowErrors(d);f.promise&&this.watchPromiseErrors(d)};C.prototype={watchPromiseErrors:function(a){var b=this;a.addEventListener?a.addEventListener("unhandledrejection",function(a){a=a||{};a=a.detail?a.detail.reason:
a.reason;if(a!==l){if(!e.isError(a))try{throw Error(b.serialize(a));}catch(d){a=d}b.onError("promise",a)}}):a.onunhandledrejection=function(a){b.onError("promise",a)}},watchWindowErrors:function(a){var b=this;e.patch(a,"onerror",function(a){return function(d,f,e,k,m){try{m=m||{},m.message=m.message||b.serialize(d),m.name=m.name||"Error",m.line=m.line||parseInt(e,10)||null,m.column=m.column||parseInt(k,10)||null,"[object Event]"!==Object.prototype.toString.call(d)||f?m.file=m.file||b.serialize(f):
m.file=(d.target||{}).src,b.onError("window",m)}catch(h){b.onFault(h)}a.apply(this,arguments)}})}};var D=function(a,b,c,d,f,g,k,m,h,l,n,p,q,x,t,u,v){try{if(this.window=t,this.document=u,this.util=e,this.onError=this.util.bind(this.onError,this),this.onFault=this.util.bind(this.onFault,this),this.serialize=this.util.bind(this.serialize,this),this.config=new d(a),this.transmitter=new n(this.util,this.config),this.log=new m(this.util),this.api=new b(this.config,this.util,this.onError,this.serialize),
this.metadata=new h(this.serialize),this.environment=new k(this.window),this.customer=new g(this.config,this.util,this.log,this.window,this.document),this.customer.token&&(this.apiConsoleWatcher=new f(this.util,this.log,this.onError,this.onFault,this.serialize,this.api,this.config.defaults.console),this.config.current.enabled&&(this.windowConsoleWatcher=new f(this.util,this.log,this.onError,this.onFault,this.serialize,this.window,this.config.current.console),this.util.isBrowserSupported()))){this.callbackWatcher=
new c(this.util,this.onError,this.onFault,this.window,this.config.current.callback);this.visitorWatcher=new p(this.util,this.log,this.onError,this.onFault,this.document,this.config.current.visitor);this.navigationWatcher=new v(this.log,this.config.current.navigation);this.networkWatcher=new l(this.util,this.log,this.onError,this.onFault,this.window,this.config.current.network);this.windowWatcher=new q(this.onError,this.onFault,this.serialize,this.window,this.config.current.window);var r=this;e.afterDocumentLoad(function(){r.transmitter.sendUsage({token:r.customer.token,
correlationId:r.customer.correlationId,application:r.config.current.application,x:r.util.uuid()})})}}catch(w){this.onFault(w)}};D.prototype={reveal:function(){if(this.customer.token)return this.api.addMetadata=this.metadata.addMetadata,this.api.removeMetadata=this.metadata.removeMetadata,this.api;this.config.current.enabled&&this.window.console&&this.window.console.warn&&this.window.console.warn("TrackJS could not find a token");return l},onError:function(){var a,b=!1;return function(c,d,f){if(e.isBrowserSupported()&&
this.config.current.enabled)try{if(f=f||{bindStack:null,bindTime:null,force:!1},d&&e.isError(d)||(d={name:"Error",message:this.serialize(d,f.force)}),-1===d.message.indexOf("TrackJS Caught"))if(b&&-1!==d.message.indexOf("Script error"))b=!1;else{var g=e.defaultsDeep({},{bindStack:f.bindStack,bindTime:f.bindTime,column:d.column||d.columnNumber,console:this.windowConsoleWatcher.report(),customer:this.customer.report(),entry:c,environment:this.environment.report(),file:d.file||d.fileName,line:d.line||
d.lineNumber,message:d.message,metadata:this.metadata.report(),nav:this.navigationWatcher.report(),network:this.networkWatcher.report(),url:(h.location||"").toString(),stack:d.stack,timestamp:this.util.isoNow(),visitor:this.visitorWatcher.report(),version:"2.7.0"});if(!f.force)try{if(!this.config.current.onError(g,d))return}catch(l){g.console.push({timestamp:this.util.isoNow(),severity:"error",message:l.message});var k=this;setTimeout(function(){k.onError("catch",l,{force:!0})},0)}if(this.config.current.dedupe){var m=
(g.message+g.entry+g.stack).substr(0,1E4);if(m===a)return;a=m}this.log.clear();setTimeout(function(){b=!1});b=!0;this.transmitter.sendError(g,this.customer.token)}}catch(l){this.onFault(l)}}}(),onFault:function(a){var b=this.transmitter||new x;a=a||{};a={token:this.customer.token,file:a.file||a.fileName,msg:a.message||"unknown",stack:(a.stack||"unknown").substr(0,500),url:this.window.location,v:"2.7.0",h:"bc93903b6984215043cab4408eac25240f72e405",x:this.util.uuid()};b.sendTrackerFault(a)},serialize:function(a,
b){if(this.config.current.serialize&&!b)try{return this.config.current.serialize(a)}catch(c){this.onError("catch",c,{force:!0})}return this.config.defaults.serialize(a)}};p=new D(h._trackJs||h._trackJS||h._trackjs||{},function(a,b,c,d){return{attempt:function(a,d){try{var e=Array.prototype.slice.call(arguments,2);return a.apply(d||this,e)}catch(h){throw c("catch",h),b.wrapError(h);}},configure:function(b){return a.setCurrent(b)},track:function(a){var b=d(a);a=a||{};if(!a.stack)try{throw Error(b);
}catch(e){a=e}c("direct",a)},watch:function(a,d){return function(){try{var e=Array.prototype.slice.call(arguments,0);return a.apply(d||this,e)}catch(h){throw c("catch",h),b.wrapError(h);}}},watchAll:function(a){var d=Array.prototype.slice.call(arguments,1),e;for(e in a)"function"===typeof a[e]&&(b.contains(d,e)||function(){var d=a[e];a[e]=function(){try{var a=Array.prototype.slice.call(arguments,0);return d.apply(this,a)}catch(e){throw c("catch",e),b.wrapError(e);}}}());return a},hash:"bc93903b6984215043cab4408eac25240f72e405",
version:"2.7.0"}},p,t,u,v,w,y,function(a){var b={};return{addMetadata:function(a,d){b[a]=d},removeMetadata:function(a){delete b[a]},report:function(){var c=[],d;for(d in b)b.hasOwnProperty(d)&&c.push({key:d,value:a(b[d])});return c},store:b}},A,x,B,C,q,h,n,z);h.trackJs=p.reveal()}})(window,document);
