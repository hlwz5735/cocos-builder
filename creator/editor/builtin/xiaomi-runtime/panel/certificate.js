"use strict";const i=require("fire-fs"),r=require("fire-path");var t=`\n    <h2></h2>\n    <section>\n         <ui-loader :hidden="!saving" style="background-color: rgba(0, 0, 0, 0.3);"></ui-loader>\n         <ui-prop name="${Editor.T("KEYSTORE.country")}" v-bind:error="countryError">\n            <ui-input class="flex-1"v-value="country"></ui-input>\n        </ui-prop>\n\n         <ui-prop name="${Editor.T("KEYSTORE.state")}" v-bind:error="stateError">\n            <ui-input class="flex-1"v-value="state"></ui-input>\n        </ui-prop>\n\n        <div class="line"></div>\n\n       <ui-prop name="${Editor.T("KEYSTORE.locality")}" v-bind:error="localityError">\n            <ui-input class="flex-1"v-value="locality"></ui-input>\n        </ui-prop>\n\n        <ui-prop name="${Editor.T("KEYSTORE.organization")}" v-bind:error="organizationError">\n            <ui-input class="flex-1"v-value="organization"></ui-input>\n        </ui-prop>\n\n         <ui-prop name="${Editor.T("KEYSTORE.organizational_unit")}" v-bind:error="organizationalUnitError">\n            <ui-input class="flex-1"v-value="organizationalUnit"></ui-input>\n        </ui-prop>\n\n        <div class="line"></div>\n\n       <ui-prop name="${Editor.T("KEYSTORE.name")}" v-bind:error="commonNameError">\n            <ui-input class="flex-1"v-value="commonName"></ui-input>\n        </ui-prop>\n\n        <ui-prop name="Email Address" v-bind:error="emailError">\n            <ui-input class="flex-1"v-value="email"></ui-input>\n        </ui-prop>\n\n         <ui-prop name="${Editor.T("xiaomi-runtime.save_certificate_path")}" v-bind:error="certificatePathError">\n        <ui-input v-value="certificatePath" class="flex-1" placeholder="${Editor.T("xiaomi-runtime.select_save_certificate_path")}"></ui-input>\n        <ui-button class="tiny" v-on:confirm="onChooseIconPath">···</ui-button>\n\n    </section>\n\n    <footer class="group layout horizontal center">\n        <ui-button class="green" v-on:confirm="_onSaveClick">\n            ${Editor.T("SHARED.save")}\n        </ui-button>\n    </footer>\n`;Editor.Panel.extend({_vm:null,style:"\n    :host {\n        overflow: auto;\n    }\n\n    h2 {\n        margin: 20px 20px 0 20px;\n        font-size: 26px;\n        color: #DDD;\n        padding-bottom: 15px;\n        border-bottom: 1px solid #666;\n    }\n\n    section {\n        margin: 0 10px;\n        padding: 15px;\n    }\n\n    section .line {\n        margin: 8px 0;\n        border-bottom: 1px solid #666;\n    }\n\n    footer {\n        padding: 10px 25px;\n        justify-content: flex-end;\n    }\n\n    ui-prop[error] {\n        border-radius: 6px;\n        box-shadow: inset 0 0 20px 1px red;\n    }\n",template:t,messages:{},ready(){window.abc=this._vm=new window.Vue({el:this.shadowRoot,data:{commonName:"",saving:!1,organizationalUnit:"",organization:"",locality:"",state:"",country:"",email:"",certificatePath:r.join(Editor.Project.path,"build/xiaomi/sign/"),commonNameError:!1,organizationalUnitError:!1,organizationError:!1,localityError:!1,stateError:!1,countryError:!1,emailError:!1,certificatePathError:!1},watch:{commonName:{handler(){this.commonNameError=!1}},organizationalUnit:{handler(){this.organizationalUnitError=!1}},organization:{handler(){this.organizationError=!1}},locality:{handler(){this.localityError=!1}},state:{handler(){this.stateError=!1}},country:{handler(){this.countryError=!1}},email:{handler(){this.emailError=!1}},certificatePath:{handler(){this.certificatePathError=!1}}},methods:{_getProjectPath(){let t=r.join(Editor.Project.path,"build/xiaomi/sign/release/");return i.ensureDirSync(t),t},onChooseIconPath(i){i.stopPropagation();let r=Editor.Dialog.openFile({defaultPath:this._getProjectPath(),properties:["openDirectory"],filters:[{name:Editor.T("xiaomi-runtime.select_save_certificate_path")}]});r&&r[0]&&(this.certificatePath=r[0])},_judgeEmpty(i,r){var t=!1;return i&&0!=i.trim().length||(t=!0,Editor.error(Editor.T(`certificate.error.${r} Can't be empty`))),t},_onSaveClick(r){if(r.stopPropagation(),this.country&&2==this.country.trim().length||(this.countryError=!0,Editor.error(Editor.T(`certificate.error.${Editor.T("KEYSTORE.country")} only needs 2 letter code`))),this.commonNameError=this._judgeEmpty(this.commonName,Editor.T("KEYSTORE.name")),this.organizationalUnitError=this._judgeEmpty(this.organizationalUnit,Editor.T("KEYSTORE.organizational_unit")),this.organizationError=this._judgeEmpty(this.organization,Editor.T("KEYSTORE.organization")),this.localityError=this._judgeEmpty(this.locality,Editor.T("KEYSTORE.locality")),this.stateError=this._judgeEmpty(this.state,Editor.T("KEYSTORE.state")),this.emailError=this._judgeEmpty(this.email,"email"),!this.commonName&&(this.commonNameError=!0),!this.organizationalUnit&&(this.organizationalUnitError=!0),!this.organization&&(this.organizationError=!0),!this.locality&&(this.localityError=!0),!this.state&&(this.stateError=!0),!this.email&&(this.emailError=!0),!this.certificatePath&&(this.certificatePathError=!0),require("fs").existsSync(this.certificatePath)?this.certificatePathError=!1:this.certificatePathError=!0,!(this.commonName||this.organizationalUnit||this.organization||this.locality||this.state||this.country||this.certificatePath))return Editor.error(Editor.T("certificate.error.publish_empty")),void 0;if(this.passwordError||this.confirmPasswordError||this.aliasError||this.aliasPasswordError||this.confirmAliasPasswordError||this.validityError||this.commonNameError||this.organizationalUnitError||this.organizationError||this.localityError||this.stateError||this.countryError||this.certificatePathError)return;let t=this.certificatePath;i.existsSync(t)||i.ensureDirSync(t),-1===process.env.PATH.indexOf("/usr/bin/openssl")&&(process.env.PATH+=":/usr/bin/openssl");var o=this,n=`openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem -subj ${`/C=${this.country}/ST=${this.state}/L=${this.locality}/O=${this.organization}/OU=${this.organizationalUnit}/CN=${this.commonName}/emailAddress=${this.email}`}`;o.saving=!0,(0,require("child_process").exec)(`${n}`,{cwd:t},i=>{if(o.saving=!1,!i)return Editor.log(Editor.T("xiaomi-runtime.build_certificate_complet")),Editor.Ipc.sendToWins("builder:events","certificate-created",t),void 0;Editor.error(Editor.T("xiaomi-runtime.build_certificate_fail")+i)})}}})}});