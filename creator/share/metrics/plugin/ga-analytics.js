(function(){var t=function(t){this.w=t||[]};t.prototype.set=function(t){this.w[t]=!0},t.prototype.encode=function(){for(var t=[],e=0;e<this.w.length;e++)this.w[e]&&(t[Math.floor(e/6)]^=1<<e%6);for(e=0;e<t.length;e++)t[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t[e]||0);return t.join("")+"~"};var e=new t;function n(t){e.set(t)}var i=function(e,n){var i=new t(a(e));i.set(n),e.set(ee,i.w)},r=function(n){n=a(n),n=new t(n);for(var i=e.w.slice(),r=0;r<n.w.length;r++)i[r]=i[r]||n.w[r];return new t(i).encode()},a=function(t){return t=t.get(ee),s(t)||(t=[]),t},o=function(t){return"function"==typeof t},s=function(t){return"[object Array]"==Object.prototype.toString.call(Object(t))},c=function(t){return void 0!=t&&-1<(t.constructor+"").indexOf("String")},u=function(t,e){return 0==t.indexOf(e)},h=function(t){return t?t.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""):""},l=function(t){var e=k.createElement("img");return e.width=1,e.height=1,e.src=t,e},f=function(){},g=function(t){return encodeURIComponent instanceof Function?encodeURIComponent(t):(n(28),t)},v=function(t,e,i,r){try{t.addEventListener?t.addEventListener(e,i,!!r):t.attachEvent&&t.attachEvent("on"+e,i)}catch(t){n(27)}},p=function(t,e){if(t){var n=k.createElement("script");n.type="text/javascript",n.async=!0,n.src=t,e&&(n.id=e);var i=k.getElementsByTagName("script")[0];i.parentNode.insertBefore(n,i)}},d=function(){return"https:"==k.location.protocol},m=function(){var t=""+k.location.hostname;return 0==t.indexOf("www.")?t.substring(4):t},w=function(t,e){if(1==e.length&&null!=e[0]&&"object"==typeof e[0])return e[0];for(var n={},i=Math.min(t.length+1,e.length),r=0;r<i;r++){if("object"==typeof e[r]){for(var a in e[r])e[r].hasOwnProperty(a)&&(n[a]=e[r][a]);break}r<t.length&&(n[t[r]]=e[r])}return n},b=function(){this.keys=[],this.values={},this.m={}};b.prototype.set=function(t,e,n){this.keys.push(t),n?this.m[":"+t]=e:this.values[":"+t]=e},b.prototype.get=function(t){return this.m.hasOwnProperty(":"+t)?this.m[":"+t]:this.values[":"+t]},b.prototype.map=function(t){for(var e=0;e<this.keys.length;e++){var n=this.keys[e],i=this.get(n);i&&t(n,i)}};var y=window,k=document,_=function(t){var e=y._gaUserPrefs;if(e&&e.ioo&&e.ioo()||t&&!0===y["ga-disable-"+t])return!0;try{var n=y.external;if(n&&n._gaUserPrefs&&"oo"==n._gaUserPrefs)return!0}catch(t){}return!1},x=function(t){var e=[],n=k.cookie.split(";");t=new RegExp("^\\s*"+t+"=\\s*(.*?)\\s*$");for(var i=0;i<n.length;i++){var r=n[i].match(t);r&&e.push(r[1])}return e},j=function(t,e,i,r,a,o){if(!(a=!_(a)&&!(C.test(k.location.hostname)||"/"==i&&S.test(r))))return!1;if(e&&1200<e.length&&(e=e.substring(0,1200),n(24)),i=t+"="+e+"; path="+i+"; ",o&&(i+="expires="+new Date((new Date).getTime()+o).toGMTString()+"; "),r&&"none"!=r&&(i+="domain="+r+";"),r=k.cookie,k.cookie=i,!(r=r!=k.cookie))t:{for(t=x(t),r=0;r<t.length;r++)if(e==t[r]){r=!0;break t}r=!1}return r},O=function(t){return g(t).replace(/\(/g,"%28").replace(/\)/g,"%29")},S=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,C=/(^|\.)doubleclick\.net$/i,A=function(){return(ot||d()?"https:":"http:")+"//www.google-analytics.com"},T=function(t,e,n){if(n=n||f,2036>=e.length)L(t,e,n);else{if(!(8192>=e.length))throw P("len",e.length),new function(t){this.name="len",this.message=t+"-8192"}(e.length);I(t,e,n)||E(t,e,n)||L(t,e,n)}},L=function(t,e,n){var i=l(t+"?"+e);i.onload=i.onerror=function(){i.onload=null,i.onerror=null,n()}},E=function(t,e,n){var i=y.XMLHttpRequest;if(!i)return!1;var r=new i;return"withCredentials"in r&&(r.open("POST",t,!0),r.withCredentials=!0,r.setRequestHeader("Content-Type","text/plain"),r.onreadystatechange=function(){4==r.readyState&&(n(),r=null)},r.send(e),!0)},I=function(t,e,n){return!!y.navigator.sendBeacon&&(!!y.navigator.sendBeacon(t,e)&&(n(),!0))},P=function(t,e,n){1<=100*Math.random()||_("?")||(t=["t=error","_e="+t,"_v=j41","sr=1"],e&&t.push("_f="+e),n&&t.push("_m="+g(n.substring(0,100))),t.push("aip=1"),t.push("z="+B()),L(A()+"/collect",t.join("&"),f))},V=function(){this.M=[]};function M(t){if(100!=t.get(Le)&&Pn(Y(t,we))%1e4>=100*Z(t,Le))throw"abort"}function N(t){if(_(Y(t,ye)))throw"abort"}function D(){var t=k.location.protocol;if("http:"!=t&&"https:"!=t)throw"abort"}function R(t){try{y.navigator.sendBeacon?n(42):y.XMLHttpRequest&&"withCredentials"in new y.XMLHttpRequest&&n(40)}catch(t){}t.set(te,r(t),!0),t.set(dt,Z(t,dt)+1);var e=[];W.map(function(n,i){if(i.F){var r=t.get(n);void 0!=r&&r!=i.defaultValue&&("boolean"==typeof r&&(r*=1),e.push(i.F+"="+g(""+r)))}}),e.push("z="+z()),t.set(gt,e.join("&"),!0)}function F(t){var e=Y(t,Pe)||A()+"/collect",n=Y(t,pt);if(!n&&t.get(vt)&&(n="beacon"),n){var i=Y(t,gt),r=(r=t.get(ft))||f;"image"==n?L(e,i,r):"xhr"==n&&E(e,i,r)||"beacon"==n&&I(e,i,r)||T(e,i,r)}else T(e,Y(t,gt),t.get(ft));t.set(ft,f,!0)}function H(t){var e=y.gaData;e&&(e.expId&&t.set(qt,e.expId),e.expVar&&t.set(Xt,e.expVar))}function $(){if(y.navigator&&"preview"==y.navigator.loadPurpose)throw"abort"}function G(t){var e=y.gaDevIds;s(e)&&0!=e.length&&t.set("&did",e.join(","),!0)}function U(t){if(!t.get(ye))throw"abort"}V.prototype.add=function(t){this.M.push(t)},V.prototype.D=function(t){try{for(var e=0;e<this.M.length;e++){var n=t.get(this.M[e]);n&&o(n)&&n.call(y,t)}}catch(t){}(e=t.get(ft))!=f&&o(e)&&(t.set(ft,f,!0),setTimeout(e,10))};var B=function(){return Math.round(2147483647*Math.random())},z=function(){try{var t=new Uint32Array(1);return y.crypto.getRandomValues(t),2147483647&t[0]}catch(t){return B()}};function q(t){var e=Z(t,Zt);if(500<=e&&n(15),"transaction"!=(i=Y(t,lt))&&"item"!=i){var i=Z(t,Qt),r=(new Date).getTime(),a=Z(t,Jt);if(0==a&&t.set(Jt,r),0<(a=Math.round(2*(r-a)/1e3))&&(i=Math.min(i+a,20),t.set(Jt,r)),0>=i)throw"abort";t.set(Qt,--i)}t.set(Zt,++e)}var X=function(){this.data=new b},W=new b,K=[];X.prototype.get=function(t){var e=tt(t),n=this.data.get(t);return e&&void 0==n&&(n=o(e.defaultValue)?e.defaultValue():e.defaultValue),e&&e.Z?e.Z(this,t,n):n};var Y=function(t,e){var n=t.get(e);return void 0==n?"":""+n},Z=function(t,e){var n=t.get(e);return void 0==n||""===n?0:1*n};X.prototype.set=function(t,e,n){if(t)if("object"==typeof t)for(var i in t)t.hasOwnProperty(i)&&J(this,i,t[i],n);else J(this,t,e,n)};var J=function(t,e,n,i){if(void 0!=n)switch(e){case ye:mn.test(n)}var r=tt(e);r&&r.o?r.o(t,e,n,i):t.data.set(e,n,i)},Q=function(t,e,n,i,r){this.name=t,this.F=e,this.Z=i,this.o=r,this.defaultValue=n},tt=function(t){var e=W.get(t);if(!e)for(var n=0;n<K.length;n++){var i=K[n],r=i[0].exec(t);if(r){e=i[1](r),W.set(e.name,e);break}}return e},et=function(t,e,n,i,r){return t=new Q(t,e,n,i,r),W.set(t.name,t),t.name},nt=function(t,e){K.push([new RegExp("^"+t+"$"),e])},it=function(t,e,n){return et(t,e,n,void 0,rt)},rt=function(){},at=c(window.GoogleAnalyticsObject)&&h(window.GoogleAnalyticsObject)||"ga",ot=!1,st=et("_br"),ct=it("apiVersion","v"),ut=it("clientVersion","_v");et("anonymizeIp","aip");var ht=et("adSenseId","a"),lt=et("hitType","t"),ft=et("hitCallback"),gt=et("hitPayload");et("nonInteraction","ni"),et("currencyCode","cu"),et("dataSource","ds");var vt=et("useBeacon",void 0,!1),pt=et("transport");et("sessionControl","sc",""),et("sessionGroup","sg"),et("queueTime","qt");var dt=et("_s","_s");et("screenName","cd");var mt=et("location","dl",""),wt=et("referrer","dr"),bt=et("page","dp","");et("hostname","dh");var yt=et("language","ul"),kt=et("encoding","de");et("title","dt",function(){return k.title||void 0}),nt("contentGroup([0-9]+)",function(t){return new Q(t[0],"cg"+t[1])});var _t=et("screenColors","sd"),xt=et("screenResolution","sr"),jt=et("viewportSize","vp"),Ot=et("javaEnabled","je"),St=et("flashVersion","fl");et("campaignId","ci"),et("campaignName","cn"),et("campaignSource","cs"),et("campaignMedium","cm"),et("campaignKeyword","ck"),et("campaignContent","cc");var Ct=et("eventCategory","ec"),At=et("eventAction","ea"),Tt=et("eventLabel","el"),Lt=et("eventValue","ev"),Et=et("socialNetwork","sn"),It=et("socialAction","sa"),Pt=et("socialTarget","st"),Vt=et("l1","plt"),Mt=et("l2","pdt"),Nt=et("l3","dns"),Dt=et("l4","rrt"),Rt=et("l5","srt"),Ft=et("l6","tcp"),Ht=et("l7","dit"),$t=et("l8","clt"),Gt=et("timingCategory","utc"),Ut=et("timingVar","utv"),Bt=et("timingLabel","utl"),zt=et("timingValue","utt");et("appName","an"),et("appVersion","av",""),et("appId","aid",""),et("appInstallerId","aiid",""),et("exDescription","exd"),et("exFatal","exf");var qt=et("expId","xid"),Xt=et("expVar","xvar"),Wt=et("_utma","_utma"),Kt=et("_utmz","_utmz"),Yt=et("_utmht","_utmht"),Zt=et("_hc",void 0,0),Jt=et("_ti",void 0,0),Qt=et("_to",void 0,20);nt("dimension([0-9]+)",function(t){return new Q(t[0],"cd"+t[1])}),nt("metric([0-9]+)",function(t){return new Q(t[0],"cm"+t[1])}),et("linkerParam",void 0,void 0,function(t){var e=rn(t=t.get(we),0);return"_ga=1."+g(e+"."+t)},rt);var te=et("usage","_u"),ee=et("_um");et("forceSSL",void 0,void 0,function(){return ot},function(t,e,i){n(34),ot=!!i});var ne=et("_j1","jid");nt("\\&(.*)",function(t){var e=new Q(t[0],t[1]),n=function(t){var e;return W.map(function(n,i){i.F==t&&(e=i)}),e&&e.name}(t[0].substring(1));return n&&(e.Z=function(t){return t.get(n)},e.o=function(t,e,i,r){t.set(n,i,r)},e.F=void 0),e});var ie=it("_oot"),re=et("previewTask"),ae=et("checkProtocolTask"),oe=et("validationTask"),se=et("checkStorageTask"),ce=et("historyImportTask"),ue=et("samplerTask"),he=et("_rlt"),le=et("buildHitTask"),fe=et("sendHitTask"),ge=et("ceTask"),ve=et("devIdTask"),pe=et("timingTask"),de=et("displayFeaturesTask"),me=it("name"),we=it("clientId","cid"),be=et("userId","uid"),ye=it("trackingId","tid"),ke=it("cookieName",void 0,"_ga"),_e=it("cookieDomain"),xe=it("cookiePath",void 0,"/"),je=it("cookieExpires",void 0,63072e3),Oe=it("legacyCookieDomain"),Se=it("legacyHistoryImport",void 0,!0),Ce=it("storage",void 0,"cookie"),Ae=it("allowLinker",void 0,!1),Te=it("allowAnchor",void 0,!0),Le=it("sampleRate","sf",100),Ee=it("siteSpeedSampleRate",void 0,1),Ie=it("alwaysSendReferrer",void 0,!1),Pe=et("transportUrl"),Ve=et("_r","_r");function Me(t,e,i,r){e[t]=function(){try{return r&&n(r),i.apply(this,arguments)}catch(e){throw P("exc",t,e&&e.name),e}}}var Ne=function(t,e,n){this.V=1e4,this.fa=t,this.$=!1,this.B=e,this.ea=n||1},De=function(t,e){var n;if(t.fa&&t.$)return 0;if(t.$=!0,e){if(t.B&&Z(e,t.B))return Z(e,t.B);if(0==e.get(Ee))return 0}return 0==t.V?0:(void 0===n&&(n=z()),0==n%t.V?Math.floor(n/t.V)%t.ea+1:0)},Re=new Ne(!0,st,7);var Fe=function(t,e){var n=Math.min(Z(t,Ee),100);if(!(Pn(Y(t,we))%100>=n)&&(He(n={})||$e(n))){var i=n[Vt];void 0==i||1/0==i||isNaN(i)||(0<i?(Ge(n,Nt),Ge(n,Ft),Ge(n,Rt),Ge(n,Mt),Ge(n,Dt),Ge(n,Ht),Ge(n,$t),e(n)):v(y,"load",function(){Fe(t,e)},!1))}},He=function(t){var e;if(!(e=(e=y.performance||y.webkitPerformance)&&e.timing))return!1;var n=e.navigationStart;return 0!=n&&(t[Vt]=e.loadEventStart-n,t[Nt]=e.domainLookupEnd-e.domainLookupStart,t[Ft]=e.connectEnd-e.connectStart,t[Rt]=e.responseStart-e.requestStart,t[Mt]=e.responseEnd-e.responseStart,t[Dt]=e.fetchStart-n,t[Ht]=e.domInteractive-n,t[$t]=e.domContentLoadedEventStart-n,!0)},$e=function(t){if(y.top!=y)return!1;var e=y.external,n=e&&e.onloadT;return e&&!e.isValidLoadTime&&(n=void 0),2147483648<n&&(n=void 0),0<n&&e.setPageReadyTime(),void 0!=n&&(t[Vt]=n,!0)},Ge=function(t,e){var n=t[e];(isNaN(n)||1/0==n||0>n)&&(t[e]=void 0)},Ue=!1,Be=function(t){if("cookie"==Y(t,Ce)){var e=Y(t,ke),i=Xe(t),r=Ze(Y(t,xe)),a=Ke(Y(t,_e)),o=1e3*Z(t,je),s=Y(t,ye);if("auto"!=a)j(e,i,r,a,s,o)&&(Ue=!0);else{var c;if(n(32),i=[],4!=(a=m().split(".")).length||(c=a[a.length-1],parseInt(c,10)!=c)){for(c=a.length-2;0<=c;c--)i.push(a.slice(c).join("."));i.push("none"),c=i}else c=["none"];for(var u=0;u<c.length;u++)if(a=c[u],t.data.set(_e,a),i=Xe(t),j(e,i,r,a,s,o))return Ue=!0,void 0;t.data.set(_e,"auto")}}},ze=function(t){if("cookie"==Y(t,Ce)&&!Ue&&(Be(t),!Ue))throw"abort"},qe=function(t){if(t.get(Se)){var e=Y(t,_e),i=Y(t,Oe)||m(),r=Qe("__utma",i,e);r&&(n(19),t.set(Yt,(new Date).getTime(),!0),t.set(Wt,r.R),(e=Qe("__utmz",i,e))&&r.hash==e.hash&&t.set(Kt,e.R))}},Xe=function(t){var e=O(Y(t,we)),n=Ye(Y(t,_e));return 1<(t=Je(Y(t,xe)))&&(n+="-"+t),["GA1",n,e].join(".")},We=function(t,e,n){for(var i,r=[],a=[],o=0;o<t.length;o++){var s=t[o];s.H[n]==e?r.push(s):void 0==i||s.H[n]<i?(a=[s],i=s.H[n]):s.H[n]==i&&a.push(s)}return 0<r.length?r:a},Ke=function(t){return 0==t.indexOf(".")?t.substr(1):t},Ye=function(t){return Ke(t).split(".").length},Ze=function(t){return t?(1<t.length&&t.lastIndexOf("/")==t.length-1&&(t=t.substr(0,t.length-1)),0!=t.indexOf("/")&&(t="/"+t),t):"/"},Je=function(t){return"/"==(t=Ze(t))?1:t.split("/").length};function Qe(t,e,n){"none"==e&&(e="");var i=[],r=x(t);t="__utma"==t?6:2;for(var a=0;a<r.length;a++){var o=(""+r[a]).split(".");o.length>=t&&i.push({hash:o[0],R:r[a],O:o})}return 0==i.length?void 0:1==i.length?i[0]:tn(e,i)||tn(n,i)||tn(null,i)||i[0]}function tn(t,e){var n,i;null==t?n=i=1:(n=Pn(t),i=Pn(u(t,".")?t.substring(1):"."+t));for(var r=0;r<e.length;r++)if(e[r].hash==n||e[r].hash==i)return e[r]}var en=new RegExp(/^https?:\/\/([^\/:]+)/),nn=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;function rn(t,e){for(var n=new Date,i=(r=y.navigator).plugins||[],r=(n=[t,r.userAgent,n.getTimezoneOffset(),n.getYear(),n.getDate(),n.getHours(),n.getMinutes()+e],0);r<i.length;++r)n.push(i[r].description);return Pn(n.join("."))}var an=function(t){n(48),this.target=t,this.T=!1};an.prototype.ca=function(t,e){if(t.tagName){if("a"==t.tagName.toLowerCase())return t.href&&(t.href=on(this,t.href,e)),void 0;if("form"==t.tagName.toLowerCase())return sn(this,t)}if("string"==typeof t)return on(this,t,e)};var on=function(t,e,n){(r=nn.exec(e))&&3<=r.length&&(e=r[1]+(r[3]?r[2]+r[3]:"")),t=t.target.get("linkerParam");var i=e.indexOf("?"),r=e.indexOf("#");return n?e+=(-1==r?"#":"&")+t:(n=-1==i?"?":"&",e=-1==r?e+(n+t):e.substring(0,r)+n+t+e.substring(r)),e.replace(/&+_ga=/,"&_ga=")},sn=function(t,e){if(e&&e.action){var n=t.target.get("linkerParam").split("=")[1];if("get"==e.method.toLowerCase()){for(var i=e.childNodes||[],r=0;r<i.length;r++)if("_ga"==i[r].name)return i[r].setAttribute("value",n),void 0;(i=k.createElement("input")).setAttribute("type","hidden"),i.setAttribute("name","_ga"),i.setAttribute("value",n),e.appendChild(i)}else"post"==e.method.toLowerCase()&&(e.action=on(t,e.action))}};function cn(t,e){if(e==k.location.hostname)return!1;for(var n=0;n<t.length;n++)if(t[n]instanceof RegExp){if(t[n].test(e))return!0}else if(0<=e.indexOf(t[n]))return!0;return!1}an.prototype.S=function(t,e,i){function r(i){try{var r;i=i||y.event;t:{var o=i.target||i.srcElement;for(i=100;o&&0<i;){if(o.href&&o.nodeName.match(/^a(?:rea)?$/i)){r=o;break t}o=o.parentNode,i--}r={}}("http:"==r.protocol||"https:"==r.protocol)&&cn(t,r.hostname||"")&&r.href&&(r.href=on(a,r.href,e))}catch(t){n(26)}}var a=this;if(this.T||(this.T=!0,v(k,"mousedown",r,!1),v(k,"keyup",r,!1)),i){i=function(e){if((e=(e=e||y.event).target||e.srcElement)&&e.action){var n=e.action.match(en);n&&cn(t,n[1])&&sn(a,e)}};for(var o=0;o<k.forms.length;o++)v(k.forms[o],"submit",i)}};var un,hn=function(t,e,n){this.U=ne,this.aa=e,(e=n)||(e=(e=Y(t,me))&&"t0"!=e?vn.test(e)?"_gat_"+O(Y(t,ye)):"_gat_"+O(e):"_gat"),this.Y=e},ln=function(t,e){e.get(t.U)||("1"==x(t.Y)[0]?e.set(t.U,"",!0):e.set(t.U,""+B(),!0))},fn=function(t,e){e.get(t.U)&&j(t.Y,"1",e.get(xe),e.get(_e),e.get(ye),6e5)},gn=function(t,e){if(e.get(t.U)){var n=new b,i=function(t){tt(t).F&&n.set(tt(t).F,e.get(t))};i(ct),i(ut),i(ye),i(we),i(be),i(t.U),n.set(tt(te).F,r(e));var a=t.aa;n.map(function(t,e){a+=g(t)+"=",a+=g(""+e)+"&"}),a+="z="+B(),l(a),e.set(t.U,"",!0)}},vn=/^gtm\d+$/,pn=function(t,e){var n,r=t.b;r.get("dcLoaded")||(i(r,29),(e=e||{})[ke]&&(n=O(e[ke])),function(t,e){var n=e.get(le);e.set(le,function(e){ln(t,e);var i=n(e);return fn(t,e),i});var i=e.get(fe);e.set(fe,function(e){var n=i(e);return gn(t,e),n})}(n=new hn(r,"https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&",n),r),r.set("dcLoaded",!0))},dn=function(t){if(!t.get("dcLoaded")&&"cookie"==t.get(Ce)){i(t,51);var e=new hn(t);ln(e,t),fn(e,t),t.get(e.U)&&(t.set(Ve,1,!0),t.set(Pe,A()+"/r/collect",!0))}},mn=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,wn=function(t){function e(t,e){i.b.data.set(t,e)}function n(t,n){e(t,n),i.filters.add(t)}var i=this;this.b=new X,this.filters=new V,e(me,t[me]),e(ye,h(t[ye])),e(ke,t[ke]),e(_e,t[_e]||m()),e(xe,t[xe]),e(je,t[je]),e(Oe,t[Oe]),e(Se,t[Se]),e(Ae,t[Ae]),e(Te,t[Te]),e(Le,t[Le]),e(Ee,t[Ee]),e(Ie,t[Ie]),e(Ce,t[Ce]),e(be,t[be]),e(ct,1),e(ut,"j41"),n(ie,N),n(re,$),n(ae,D),n(oe,U),n(se,ze),n(ce,qe),n(ue,M),n(he,q),n(ge,H),n(ve,G),n(de,dn),n(le,R),n(fe,F),n(pe,function(t){return function(e){"pageview"!=e.get(lt)||t.I||(t.I=!0,Fe(e,function(e){t.send("timing",e)}))}}(this)),bn(this.b,t[we]),yn(this.b),this.b.set(ht,function(){var t=y.gaGlobal=y.gaGlobal||{};return t.hid=t.hid||B()}()),function(t,e,n){if(!un){var i;i=k.location.hash;var r=y.name,a=/^#?gaso=([^&]*)/;(r=(i=(i=i&&i.match(a)||r&&r.match(a))?i[1]:x("GASO")[0]||"")&&i.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))&&(j("GASO",""+i,n,e,t,0),window._udo||(window._udo=e),window._utcp||(window._utcp=n),t=r[1],p("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(t?"prefix="+t+"&":"")+B(),"_gasojs")),un=!0}}(this.b.get(ye),this.b.get(_e),this.b.get(xe))},bn=function(t,e){if("cookie"==Y(t,Ce)){var i;Ue=!1;t:{var r=x(Y(t,ke));if(r&&!(1>r.length)){i=[];for(var a=0;a<r.length;a++){var o,s=(o=r[a].split(".")).shift();("GA1"==s||"1"==s)&&1<o.length?(1==(s=o.shift().split("-")).length&&(s[1]="1"),s[0]*=1,s[1]*=1,o={H:s,s:o.join(".")}):o=void 0,o&&i.push(o)}if(1==i.length){n(13),i=i[0].s;break t}if(0!=i.length){if(n(14),r=Ye(Y(t,_e)),1==(i=We(i,r,0)).length){i=i[0].s;break t}r=Je(Y(t,xe)),i=(i=We(i,r,1))[0]&&i[0].s;break t}n(12)}i=void 0}i||(i=Y(t,_e),void 0!=(i=Qe("__utma",r=Y(t,Oe)||m(),i))?(n(10),i=i.O[1]+"."+i.O[2]):i=void 0),i&&(t.data.set(we,i),Ue=!0)}if(i=t.get(Te),(a=(i=k.location[i?"href":"search"].match("(?:&|#|\\?)"+g("_ga").replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)"))&&2==i.length?i[1]:"")&&(t.get(Ae)?-1==(i=a.indexOf("."))?n(22):(r=a.substring(i+1),"1"!=a.substring(0,i)?n(22):-1==(i=r.indexOf("."))?n(22):(a=r.substring(0,i))!=rn(i=r.substring(i+1),0)&&a!=rn(i,-1)&&a!=rn(i,-2)?n(23):(n(11),t.data.set(we,i))):n(21)),e&&(n(9),t.data.set(we,g(e))),!t.get(we))if(i=(i=y.gaGlobal&&y.gaGlobal.vid)&&-1!=i.search(/^(?:utma\.)?\d+\.\d+$/)?i:void 0)n(17),t.data.set(we,i);else{for(n(8),r=(i=y.navigator.userAgent+(k.cookie?k.cookie:"")+(k.referrer?k.referrer:"")).length,a=y.history.length;0<a;)i+=a--^r++;t.data.set(we,[B()^2147483647&Pn(i),Math.round((new Date).getTime()/1e3)].join("."))}Be(t)},yn=function(t){var e=y.navigator,i=y.screen,r=k.location;if(t.set(wt,function(t){var e=k.referrer;if(/^https?:\/\//i.test(e)){if(t)return e;t="//"+k.location.hostname;var n=e.indexOf(t);if(!(5!=n&&6!=n||"/"!=(t=e.charAt(n+t.length))&&"?"!=t&&""!=t&&":"!=t))return;return e}}(t.get(Ie))),r){var a=r.pathname||"";"/"!=a.charAt(0)&&(n(31),a="/"+a),t.set(mt,r.protocol+"//"+r.hostname+a+r.search)}i&&t.set(xt,i.width+"x"+i.height),i&&t.set(_t,i.colorDepth+"-bit");i=k.documentElement;var o=(a=k.body)&&a.clientWidth&&a.clientHeight,s=[];if(i&&i.clientWidth&&i.clientHeight&&("CSS1Compat"===k.compatMode||!o)?s=[i.clientWidth,i.clientHeight]:o&&(s=[a.clientWidth,a.clientHeight]),i=0>=s[0]||0>=s[1]?"":s.join("x"),t.set(jt,i),t.set(St,function(){var t,e,n;if((n=(n=y.navigator)?n.plugins:null)&&n.length)for(var i=0;i<n.length&&!e;i++){var r=n[i];-1<r.name.indexOf("Shockwave Flash")&&(e=r.description)}if(!e)try{e=(t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version")}catch(t){}if(!e)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),e="WIN 6,0,21,0",t.AllowScriptAccess="always",e=t.GetVariable("$version")}catch(t){}if(!e)try{e=(t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(t){}return e&&(t=e.match(/[\d]+/g))&&3<=t.length&&(e=t[0]+"."+t[1]+" r"+t[2]),e||void 0}()),t.set(kt,k.characterSet||k.charset),t.set(Ot,e&&"function"==typeof e.javaEnabled&&e.javaEnabled()||!1),t.set(yt,(e&&(e.language||e.browserLanguage)||"").toLowerCase()),r&&t.get(Te)&&(e=k.location.hash)){for(e=e.split(/[?&#]+/),r=[],i=0;i<e.length;++i)(u(e[i],"utm_id")||u(e[i],"utm_campaign")||u(e[i],"utm_source")||u(e[i],"utm_medium")||u(e[i],"utm_term")||u(e[i],"utm_content")||u(e[i],"gclid")||u(e[i],"dclid")||u(e[i],"gclsrc"))&&r.push(e[i]);0<r.length&&(e="#"+r.join("&"),t.set(mt,t.get(mt)+e))}};wn.prototype.get=function(t){return this.b.get(t)},wn.prototype.set=function(t,e){this.b.set(t,e)};var kn={pageview:[bt],event:[Ct,At,Tt,Lt],social:[Et,It,Pt],timing:[Gt,Ut,zt,Bt]};wn.prototype.send=function(t){var e,n;1>arguments.length||("string"==typeof arguments[0]?(e=arguments[0],n=[].slice.call(arguments,1)):(e=arguments[0]&&arguments[0][lt],n=arguments),e&&((n=w(kn[e]||[],n))[lt]=e,this.b.set(n,void 0,!0),this.filters.D(this.b),this.b.data.m={},function(t){if(!d()&&!ot){var e=De(Re,t);if(e&&!(!y.navigator.sendBeacon&&4<=e&&6>=e)){var n=(new Date).getHours(),i=[z(),z(),z()].join(".");t=(3==e||5==e?"https:":"http:")+"//www.google-analytics.com/collect?z=br.",t+=[e,"A",n,i].join(".");var r=(r=(r=1!=e%3?"https:":"http:")+"//www.google-analytics.com/collect?z=br.")+[e,"B",n,i].join(".");7==e&&(r=r.replace("//www.","//ssl.")),n=function(){4<=e&&6>=e?y.navigator.sendBeacon(r,""):l(r)},z()%2?(l(t),n()):(n(),l(t))}}}(this.b)))};var _n,xn,jn,On=function(t){return"prerender"!=k.visibilityState&&(t(),!0)},Sn=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,Cn=function(t){if(o(t[0]))this.u=t[0];else{var e=Sn.exec(t[0]);if(null!=e&&4==e.length&&(this.c=e[1]||"t0",this.K=e[2]||"",this.C=e[3],this.a=[].slice.call(t,1),this.K||(this.A="create"==this.C,this.i="require"==this.C,this.g="provide"==this.C,this.ba="remove"==this.C),this.i&&(3<=this.a.length?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(c(this.a[1])?this.X=this.a[1]:this.W=this.a[1]))),e=t[1],t=t[2],!this.C)throw"abort";if(this.i&&(!c(e)||""==e))throw"abort";if(this.g&&(!c(e)||""==e||!o(t)))throw"abort";if(An(this.c)||An(this.K))throw"abort";if(this.g&&"t0"!=this.c)throw"abort"}};function An(t){return 0<=t.indexOf(".")||0<=t.indexOf(":")}_n=new b,jn=new b,xn={ec:45,ecommerce:46,linkid:47};var Tn=function(t){function e(t){var e=(t.hostname||"").split(":")[0].toLowerCase(),n=(t.protocol||"").toLowerCase();n=1*t.port||("http:"==n?80:"https:"==n?443:"");return t=t.pathname||"",u(t,"/")||(t="/"+t),[e,""+n,t]}var n=k.createElement("a");n.href=k.location.href;var i=(n.protocol||"").toLowerCase(),r=e(n),a=n.search||"",o=i+"//"+r[0]+(r[1]?":"+r[1]:"");return u(t,"//")?t=i+t:u(t,"/")?t=o+t:!t||u(t,"?")?t=o+r[2]+(t||a):0>t.split("/")[0].indexOf(":")&&(t=o+r[2].substring(0,r[2].lastIndexOf("/"))+"/"+t),n.href=t,i=e(n),{protocol:(n.protocol||"").toLowerCase(),host:i[0],port:i[1],path:i[2],query:n.search||"",url:t||""}},Ln={ga:function(){Ln.f=[]}};Ln.ga(),Ln.D=function(t){var e=Ln.J.apply(Ln,arguments);e=Ln.f.concat(e);for(Ln.f=[];0<e.length&&!Ln.v(e[0])&&(e.shift(),!(0<Ln.f.length)););Ln.f=Ln.f.concat(e)},Ln.J=function(t){for(var e=[],i=0;i<arguments.length;i++)try{var r=new Cn(arguments[i]);if(r.g)_n.set(r.a[0],r.a[1]);else{if(r.i){var a=(l=r).a[0];if(!o(_n.get(a))&&!jn.get(a)){xn.hasOwnProperty(a)&&n(xn[a]);var s=l.X;if(!s&&xn.hasOwnProperty(a)?(n(39),s=a+".js"):n(43),s){s&&0<=s.indexOf("/")||(s=(ot||d()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+s);var c,h=Tn(s),l=void 0,f=h.protocol,g=k.location.protocol;if(c=l="https:"==f||f==g||"http:"==f&&"http:"==g){l=h;var v=Tn(k.location.href);if(l.query||0<=l.url.indexOf("?")||0<=l.path.indexOf("://"))c=!1;else if(l.host==v.host&&l.port==v.port)c=!0;else{var m="http:"==l.protocol?80:443;c=!("www.google-analytics.com"!=l.host||(l.port||m)!=m||!u(l.path,"/plugins/"))}}c&&(p(h.url),jn.set(a,!0))}}}e.push(r)}}catch(t){}return e},Ln.v=function(t){try{if(t.u)t.u.call(y,En.j("t0"));else{var e=t.c==at?En:En.j(t.c);if(t.A)"t0"==t.c&&En.create.apply(En,t.a);else if(t.ba)En.remove(t.c);else if(e)if(t.i){var n,i=t.a[0],r=t.W;e==En||e.get(me);var a=_n.get(i);if(o(a)?(e.plugins_=e.plugins_||new b,e.plugins_.get(i)||e.plugins_.set(i,new a(e,r||{})),n=!0):n=!1,!n)return!0}else if(t.K){var s=t.C,c=t.a,u=e.plugins_.get(t.K);u[s].apply(u,c)}else e[t.C].apply(e,t.a)}}catch(t){}};var En=function(t){n(1),Ln.D.apply(Ln,[arguments])};En.h={},En.P=[],En.L=0,En.answer=42;var In=[ye,_e,me];function Pn(t){var e,n=1,i=0;if(t)for(n=0,e=t.length-1;0<=e;e--)n=0!=(i=266338304&(n=(n<<6&268435455)+(i=t.charCodeAt(e))+(i<<14)))?n^i>>21:n;return n}En.create=function(t){var e=w(In,[].slice.call(arguments));e[me]||(e[me]="t0");var n=""+e[me];return En.h[n]?En.h[n]:(e=new wn(e),En.h[n]=e,En.P.push(e),e)},En.remove=function(t){for(var e=0;e<En.P.length;e++)if(En.P[e].get(me)==t){En.P.splice(e,1),En.h[t]=null;break}},En.j=function(t){return En.h[t]},En.getAll=function(){return En.P.slice(0)},En.N=function(){"ga"!=at&&n(49);var t=y[at];if(!t||42!=t.answer){if(En.L=t&&t.l,En.loaded=!0,Me("create",e=y[at]=En,e.create),Me("remove",e,e.remove),Me("getByName",e,e.j,5),Me("getAll",e,e.getAll,6),Me("get",e=wn.prototype,e.get,7),Me("set",e,e.set,4),Me("send",e,e.send),Me("get",e=X.prototype,e.get),Me("set",e,e.set),!d()&&!ot){t:{for(var e=k.getElementsByTagName("script"),i=0;i<e.length&&100>i;i++){var r=e[i].src;if(r&&0==r.indexOf("https://www.google-analytics.com/analytics")){n(33),e=!0;break t}}e=!1}e&&(ot=!0)}d()||ot||!De(new Ne)||(n(36),ot=!0),(y.gaplugins=y.gaplugins||{}).Linker=an,e=an.prototype,_n.set("linker",an),Me("decorate",e,e.ca,20),Me("autoLink",e,e.S,25),_n.set("displayfeatures",pn),_n.set("adfeatures",pn),t=t&&t.q,s(t)?Ln.D.apply(En,t):n(50)}},En.da=function(){for(var t=En.getAll(),e=0;e<t.length;e++)t[e].get(me)},function(){var t=En.N;if(!On(t)){n(16);var e=!1,i=function(){if(!e&&On(t)){e=!0;var n=i,r=k;r.removeEventListener?r.removeEventListener("visibilitychange",n,!1):r.detachEvent&&r.detachEvent("onvisibilitychange",n)}};v(k,"visibilitychange",i)}}()})(window);