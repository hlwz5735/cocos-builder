"use strict";module.exports={init(){var e=require("fs"),t=Editor.require("packages://cocos-services/panel/utils/utils.js");let i=Editor.require("packages://cocos-services/panel/utils/ccServices.js");console.log(`service-item ${t.t("reg_component")}`),Vue.component("service-item",{template:e.readFileSync(Editor.url("packages://cocos-services/panel/serviceList/serviceItem/serviceItem.html"),"utf-8"),props:{service:{type:Object},hovered:{type:Boolean}},data(){return{title:this.service.service_title,hasUpdate:!1,sty:{display:"none",position:"absolute",top:"300px",left:"40px","box-shadow":"0px 8px 16px 0px rgba(0,0,0,2)",padding:"12px, 16px"},imgStyle:{height:"24px",width:"24px","margin-top":"1px","-webkit-filter":this.service.enable?"grayscale(0%)":"grayscale(100%)"}}},created(){this.clactureVersion()},methods:{getRealPath:function(e){return Editor.url("packages://cocos-services/panel/assets/")+e},clactureVersion:function(){var e=i.readServiceVersionByURL(this.service.package_download_url);i.readServicePackageInfo(this.service.service_component_name).version!==e&&i.readServicePackageInfo(this.service.service_component_name).upgrade&&(this.hasUpdate=!0)},utils_t:function(e,...i){return t.t(e,...i)},enter:function(e){window._Scene?this.sty.top=e.target.getBoundingClientRect().top-100:this.sty.top=e.target.getBoundingClientRect().top-60,this.sty.display="block"},leave:function(e){this.sty.display="none"}}})}};