module.exports={"sprite-atlas":{exportRaw:!0},"dragonbones-bin":{exportRaw:!0},dragonbones:{exportRaw:!0},"dragonbones-atlas":{exportRaw:!0},spine:{exportRaw:!0,exportMetaIfExportRaw:!0},"ttf-font":{exportRaw:!0},"bitmap-font":{exportRaw:!0},"label-atlas":{exportRaw:!0,exportMetaIfExportRaw:!0},"sprite-frame":{extnameForSubAsset:".spriteframe",customUuidParser:function(){const e=require("fire-path"),r=/("texture": ?)"([^"]+)"/;return function(t,a,i,n){return t.replace(r,function(r,t,a){var s=i[a]||i[Editor.Utils.UuidUtils.decompressUuid(a)];if(s){var o=s.dest;return o=e.relative(n,o),Editor.isWin32&&(o=o.replace(/\\/g,"/")),t+JSON.stringify(o)}return console.log("can not parse uuid",a),r})}}()},"tiled-map":{exportRaw:!0},particle:{customUuidParser:function(){const e=require("fire-path"),r=/<key>\s*textureUuid\s*<\/key>\s*<string>\s*(.*?)\s*<\/string>/i,t=/(<key>\s*textureFileName\s*<\/key>\s*)(?:<string>.*<\/string>|<string\/>)/i;return function(a,i,n,s){var o;return a=a.replace(r,function(r,t){var a=n[t];if(a){var s=a.dest,u=n[i];u?(s=e.relative(u.dest,s),Editor.isWin32&&(s=s.replace(/\\/g,"/")),o=s):console.log("can not parse uuid",i)}else console.log("can not parse uuid",t);return""}),o&&(a=a.replace(t,`$1<string>${o}</string>`)),a}}()}};