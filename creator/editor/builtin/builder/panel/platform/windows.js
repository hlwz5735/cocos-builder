"use strict";const e=require(Editor.url("packages://builder/panel/platform/common"));exports.template=`\n    <ui-prop name="MD5 Cache" tooltip="${Editor.T("BUILDER.md5Cache_tooltip")}">\n        <ui-checkbox v-value="project.md5Cache"></ui-checkbox>\n    </ui-prop>\n    <ui-prop name="${Editor.T("BUILDER.template")}">\n        <ui-select class="flex-1" v-value="data.template">\n            <template v-for="item in templates">\n                <option v-bind:value="item">{{item}}</option>\n            </template>\n        </ui-select>\n    </ui-prop>\n\n    <ui-prop name="VS Version" auto-height>\n        <ui-select class="flex-1" v-value="data.vsVersion">\n            <template v-for="item in vsVersions">\n                <option v-bind:value="item.value">{{item.text}}</option>\n            </template>\n        </ui-select>\n    </ui-prop>\n\n    ${e.native.renderer}\n    ${e.native.xxtea}\n`,exports.name="win32",exports.props={data:null,project:null},exports.data=function(){return{templates:[],vsVersions:[{value:"auto",text:"Auto"},{value:"2015",text:"VS2015"},{value:"2017",text:"VS2017"}]}},exports.created=function(){this.originIncludeAnySDK=this.project.includeAnySDK,this.originIncludeSDKBox=this.project.includeSDKBox,this.project.includeAnySDK=!1,this.project.includeSDKBox=!1,Editor.Ipc.sendToMain("app:query-cocos-templates",(e,t)=>{if(e)return Editor.warn(e);if(t.forEach(e=>{"android-instant"!==e&&this.templates.push(e)}),this.data){var i=this.data.template;if(t.length<=0)return this.set("profiles.local.template","");-1===t.indexOf(i)&&this.set("profiles.local.template",t[0])}})},exports.directives={},exports.methods={},exports.beforeDestroy=function(){this.project.includeAnySDK=this.originIncludeAnySDK,this.project.includeSDKBox=this.originIncludeSDKBox};