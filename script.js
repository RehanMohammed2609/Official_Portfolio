(function(){
var root=document.documentElement,tb=document.getElementById('theme');
function dark(){return root.dataset.theme==='dark'||(root.dataset.theme!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)}
function label(){tb.textContent=dark()?'Light':'Dark'}
try{var s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
label();
tb.addEventListener('click',function(){var n=dark()?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}label();redraw()});
var mb=document.querySelector('.menu-btn'),nav=document.getElementById('links');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
/* Hero canvas: draws shapes on click, echoing the C shape-drawing mini project */
var c=document.getElementById('draw'),x=c.getContext('2d'),shapes=[],kinds=['circle','rect','triangle','line'];
function size(){var r=c.getBoundingClientRect(),d=devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;x.setTransform(d,0,0,d,0,0);redraw()}
function add(px,py){shapes.push({k:kinds[shapes.length%4],x:px,y:py,s:30+Math.random()*40});if(shapes.length>14)shapes.shift();redraw()}
function redraw(){var r=c.getBoundingClientRect();x.clearRect(0,0,r.width,r.height);x.strokeStyle=getComputedStyle(root).getPropertyValue('--accent');x.lineWidth=2;
shapes.forEach(function(p){x.beginPath();if(p.k==='circle')x.arc(p.x,p.y,p.s/2,0,7);else if(p.k==='rect')x.rect(p.x-p.s/2,p.y-p.s/3,p.s,p.s*.66);else if(p.k==='triangle'){x.moveTo(p.x,p.y-p.s/2);x.lineTo(p.x+p.s/2,p.y+p.s/2);x.lineTo(p.x-p.s/2,p.y+p.s/2);x.closePath()}else{x.moveTo(p.x-p.s/2,p.y);x.lineTo(p.x+p.s/2,p.y)}x.stroke()})}
c.addEventListener('pointerdown',function(e){var r=c.getBoundingClientRect();add(e.clientX-r.left,e.clientY-r.top)});
addEventListener('resize',size);size();
setTimeout(function(){var r=c.getBoundingClientRect();if(!shapes.length&&r.width>700){add(r.width*.82,r.height*.3);add(r.width*.7,r.height*.65);add(r.width*.9,r.height*.7)}},400);
})();
