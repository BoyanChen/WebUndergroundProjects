!function(e){var i={};function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,i,t){a.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:t})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,i){if(1&i&&(e=a(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var n in e)a.d(t,n,function(i){return e[i]}.bind(null,n));return t},a.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(i,"a",i),i},a.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},a.p="",a(a.s=0)}([function(e,a){var t=canvas_1.getContext("2d"),n=2*Math.PI;const r=navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i);r&&(canvas_1.width=720,canvas_1.height=450);var o,h=!0;o=r?100:1e3;var c=[],d=[],u=[];for(center=128,width=127,frequency1=.3,frequency2=.3,frequency3=.3,phase1=0,phase2=2,phase3=4,s=0;s<o;s++)c[s]=Math.round(Math.sin(frequency1*s+phase1)*width+center),d[s]=Math.round(Math.sin(frequency2*s+phase2)*width+center),u[s]=Math.round(Math.sin(frequency3*s+phase3)*width+center);var l=[];for(i=0;i<o;i++){var v="rgba("+c[i]+","+d[i]+","+u[i]+", 1)",f={x:Math.random()*canvas_1.width,y:Math.random()*canvas_1.height,x_vel:0,y_vel:0,radius:1,colour:v};l.push(f)}try{noise.seed(Math.random())}catch(e){console.log(e.message)}var y={speed:.24,fade:0,step:r?300:2500,particle_size:1.5,rainbow:!0,colour:"#ff9500"};y.fade=0,y.step=1230,y.particle_size=2,y.colour="#548CBC",t.fillStyle="rgb(253,242,242)",t.fillRect(0,0,canvas_1.width,canvas_1.height),function e(){for(t.fillStyle="rgba(253,242,242, "+y.fade+")",t.fillRect(0,0,canvas_1.width,canvas_1.height),function(){for(i=0;i<o;i++)l[i].x<l[i].radius&&(h?(l[i].x=l[i].radius,l[i].y=Math.random()*canvas_1.height):(l[i].x=Math.random()*canvas_1.width,l[i].y=Math.random()*canvas_1.height)),l[i].y<l[i].radius&&(h?(l[i].x=l[i].radius,l[i].y=Math.random()*canvas_1.height):(l[i].x=Math.random()*canvas_1.width,l[i].y=Math.random()*canvas_1.height)),l[i].x>canvas_1.width-l[i].radius&&(h?(l[i].x=l[i].radius,l[i].y=Math.random()*canvas_1.height):(l[i].x=Math.random()*canvas_1.width,l[i].y=Math.random()*canvas_1.height)),l[i].y>canvas_1.height-l[i].radius&&(h?(l[i].x=l[i].radius,l[i].y=Math.random()*canvas_1.height):(l[i].x=Math.random()*canvas_1.width,l[i].y=Math.random()*canvas_1.height)),l[i].x+=l[i].x_vel,l[i].y+=l[i].y_vel}(),i=0;i<l.length;i++){y.rainbow?t.fillStyle=l[i].colour:t.fillStyle=y.colour;var a=(r=l[i].x/y.step,s=l[i].y/y.step,c=void 0,c=(noise.simplex2(r+1e-4,s)-noise.simplex2(r-1e-4,s))/2e-4,[(noise.simplex2(r,s+1e-4)-noise.simplex2(r,s-1e-4))/2e-4,-c]);l[i].x_vel=y.speed*a[0],l[i].y_vel=y.speed*a[1],h&&(l[i].x_vel+=3*y.speed),t.beginPath(),t.arc(l[i].x,l[i].y,y.particle_size,0,n),t.fill()}var r,s,c;window.requestAnimationFrame(e)}()}]);