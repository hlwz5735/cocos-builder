function t(t,r,e){var n,a,x;return r.x===e.x?n=Math.abs(t.x-r.x):(a=(e.y-r.y)/(e.x-r.x),x=r.y-a*r.x,n=Math.abs(a*t.x-t.y+x)/Math.sqrt(Math.pow(a,2)+1)),n}module.exports=function r(e,n){var a=e[0],x=e[e.length-1];if(e.length<3)return e;for(var h=-1,l=0,c=1;c<e.length-1;c++){var i=t(e[c],a,x);i>l&&(l=i,h=c)}if(l>n){var o=e.slice(0,h+1),s=e.slice(h),u=r(o,n),f=r(s,n);return u.slice(0,u.length-1).concat(f)}return[a,x]};