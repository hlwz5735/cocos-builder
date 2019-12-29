const t=require(Editor.url("app://editor/share/sharp")),e=require("child_process").spawn,r=require("child_process").spawnSync,o=require("fire-fs"),n=require("fire-path"),i=require("async");function s(t,e){return n.join(n.dirname(t),n.basenameNoExt(t)+e)}function a(e,r,o,n){let i=t(e),a=".png";if("webp"===o.name)i=i.webp({quality:o.quality}),a=".webp";else if("jpg"===o.name)i=i.jpeg({quality:o.quality}),a=".jpg";else if("png"===o.name){let t=o.quality/10|0;i=i.png({compressionLevel:t})}r=s(r,a),i.toFile(r,t=>{n(t)})}function c(t,r,o,n){let i=Editor.url("unpack://static/tools/texture-compress/PVRTexTool/OSX_x86/PVRTexToolCLI");"win32"===process.platform&&(i=Editor.url("unpack://static/tools/texture-compress/PVRTexTool/Windows_x86_64/PVRTexToolCLI.exe"));let a="PVRTC1_4";"pvrtc_4bits"===o.name?a="PVRTC1_4":"pvrtc_4bits_rgb"===o.name?a="PVRTC1_4_RGB":"pvrtc_2bits"===o.name?a="PVRTC1_2":"pvrtc_2bits_rgb"===o.name&&(a="PVRTC1_2_RGB");let c=["-i",t,"-o",r=s(r,".pvr"),"-squarecanvas","+","-potcanvas","+","-q","pvrtc"+o.quality,"-f",`${a},UBN,lRGB`];console.log(`pvrtc compress command :  ${i} ${c.join(" ")}`),function(t,r,o,n){let i=e(t,r,o);i.stdout.on("data",function(t){Editor.log(t.toString())}),i.stderr.on("data",function(t){Editor.info(t.toString())}),i.on("close",function(){n&&n(null)}),i.on("error",function(t){n&&n(t)})}(i,c,{},n)}function l(t,e,o,i){let s=Editor.url("unpack://static/tools/texture-compress/mali/OSX_x86/etcpack");"win32"===process.platform&&(s=Editor.url("unpack://static/tools/texture-compress/mali/Windows_64/etcpack.exe"));let a=n.dirname(s);s="."+n.sep+n.basename(s);let c="etc1",l="RGB";"etc1"===o.name?(c="etc1",l="RGBA"):"etc1_rgb"===o.name?c="etc1":"etc2"===o.name?(c="etc2",l="RGBA"):"etc2_rgb"===o.name&&(c="etc2");let p=[n.normalize(t),n.dirname(e),"-c",c,"-s",o.quality],m=a,u=Object.assign({},process.env);u.PATH=a+":"+u.PATH;let _={cwd:m,env:u};"etc2"===c&&p.push("-f",l),"etc1"===c&&"RGBA"===l&&p.push("-aa"),console.log(`etc compress command :  ${s} ${p.join(" ")}`),function(t,e,o,n){let i=r(t,e,o);i.stdout.length>0&&i.stdout.toString().split("\n").forEach(t=>{Editor.log(t)}),i.stderr.length>0&&i.stderr.toString().split("\n").forEach(t=>{Editor.error(t)}),n(i.error)}(s,p,_,i)}module.exports=function(t,e){let r=t.src,s=t.dst,p=t.platform,m=t.compressOption;"web-mobile"===p||"web-desktop"===p?p="web":"mac"!==p&&"win32"!==p||(p="native");let u=[],_=m[p];function d(t){e(t,u.map(t=>{let e=cc.Texture2D.PixelFormat;if(t.name.startsWith("pvrtc_")){let r=e.RGBA_PVRTC_4BPPV1;return"pvrtc_2bits"===t.name?r=e.RGBA_PVRTC_2BPPV1:"pvrtc_4bits_rgb"===t.name?r=e.RGB_PVRTC_4BPPV1:"pvrtc_2bits_rgb"===t.name&&(r=e.RGB_PVRTC_2BPPV1),`.pvr@${r}`}if(t.name.startsWith("etc")){let r=e.RGB_ETC1;return"etc1"===t.name?r=e.RGBA_ETC1:"etc2"===t.name?r=e.RGBA_ETC2:"etc2_rgb"===t.name&&(r=e.RGB_ETC2),`.pkm@${r}`}return"."+t.name}))}if(_&&_.formats.length>0?u=_.formats:m.default&&(u=m.default.formats),o.ensureDirSync(n.dirname(s)),0===u.length)return o.copy(r,s,t=>{t&&Editor.error("Failed to copy native asset file %s to %s",r,s),d(t)}),void 0;i.each(u,(t,e)=>{let o=a;t.name.startsWith("pvrtc_")?o=c:t.name.startsWith("etc")&&(o=l),o(r,s,t,e)},t=>{d(t)})};