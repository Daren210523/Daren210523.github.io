
var tgl=document.querySelector('.nav-toggle'),lnk=document.querySelector('.nav-links');
tgl&&tgl.addEventListener('click',function(){lnk.classList.toggle('show');});
document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){lnk&&lnk.classList.remove('show');});});
function applyLangUI(){var l=document.documentElement.getAttribute('data-lang')||'en';document.querySelectorAll('.lang-opt').forEach(function(o){o.classList.toggle('active',o.dataset.set===l);});}
document.querySelectorAll('.lang-opt').forEach(function(o){o.addEventListener('click',function(){var l=o.dataset.set;document.documentElement.setAttribute('data-lang',l);try{localStorage.setItem('lang',l)}catch(e){}applyLangUI();});});
applyLangUI();
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
function toast(m){var x=document.querySelector('.toast');if(!x){x=document.createElement('div');x.className='toast';document.body.appendChild(x);}x.textContent=m;x.classList.add('show');setTimeout(function(){x.classList.remove('show');},1400);}
document.querySelectorAll('.email-card').forEach(function(c){c.addEventListener('click',function(){var a=c.dataset.email;if(navigator.clipboard){navigator.clipboard.writeText(a).then(function(){toast('Copied '+a);}).catch(function(){toast(a);});}else toast(a);});});
var lb=document.getElementById('lb');
if(lb){var lbimg=document.getElementById('lbimg'),lbcap=document.getElementById('lbcap'),gal=[],gi=0;
  function txt(el,l){var s=el.querySelector('.gc [lang="'+l+'"]');return s?s.textContent:'';}
  var G=[].map.call(document.querySelectorAll('.gal-item'),function(el){return {src:el.querySelector('img').src,en:txt(el,'en'),zh:txt(el,'zh')};});
  function show(i){gi=(i+gal.length)%gal.length;lbimg.src=gal[gi].src;var l=document.documentElement.getAttribute('data-lang')||'en';lbcap.textContent=l==='zh'?(gal[gi].zh||gal[gi].en):gal[gi].en;}
  document.querySelectorAll('.gal-item').forEach(function(el,idx){el.addEventListener('click',function(){gal=G;lb.classList.add('open');show(idx);});});
  document.querySelector('.lb .x').addEventListener('click',function(){lb.classList.remove('open');});
  document.querySelector('.lb .next').addEventListener('click',function(e){e.stopPropagation();show(gi+1);});
  document.querySelector('.lb .prev').addEventListener('click',function(e){e.stopPropagation();show(gi-1);});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowRight')show(gi+1);if(e.key==='ArrowLeft')show(gi-1);});}
/* interactive hero node network (proximity field) */
(function(){
  var c=document.getElementById('heroCanvas'); if(!c) return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx=c.getContext('2d'),hero=c.parentElement,dpr=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,pts=[],mx=-1e4,my=-1e4,raf,LINK=132,MR=178;
  function build(){var rc=hero.getBoundingClientRect();W=Math.round(rc.width)||hero.clientWidth;H=Math.round(rc.height)||hero.clientHeight;
    if(W<2||H<2)return;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(Math.min(120,Math.max(34,W*H/13000)));pts=[];
    for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.5+.8});}
  function frame(){ctx.clearRect(0,0,W,H);var i,j,a,b,dx,dy,d;
    for(i=0;i<pts.length;i++){a=pts[i];dx=mx-a.x;dy=my-a.y;d=Math.sqrt(dx*dx+dy*dy);
      if(d<MR){var f=(1-d/MR)*.04;a.vx+=dx/(d||1)*f;a.vy+=dy/(d||1)*f;}
      a.x+=a.vx;a.y+=a.vy;a.vx*=.992;a.vy*=.992;
      if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;a.x=Math.max(0,Math.min(W,a.x));a.y=Math.max(0,Math.min(H,a.y));}
    for(i=0;i<pts.length;i++){a=pts[i];
      for(j=i+1;j<pts.length;j++){b=pts[j];dx=a.x-b.x;dy=a.y-b.y;d=Math.sqrt(dx*dx+dy*dy);
        if(d<LINK){ctx.strokeStyle='rgba(150,190,230,'+(1-d/LINK)*.42+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      dx=a.x-mx;dy=a.y-my;d=Math.sqrt(dx*dx+dy*dy);
      if(d<MR){ctx.strokeStyle='rgba(224,138,43,'+(1-d/MR)*.8+')';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mx,my);ctx.stroke();}}
    for(i=0;i<pts.length;i++){a=pts[i];dx=a.x-mx;dy=a.y-my;d=Math.sqrt(dx*dx+dy*dy);var near=d<MR;
      ctx.beginPath();ctx.arc(a.x,a.y,a.r+(near?(1-d/MR)*1.8:0),0,6.2832);
      ctx.fillStyle=near?'rgba(242,182,108,'+(.45+(1-d/MR)*.5)+')':'rgba(178,203,233,.5)';ctx.fill();}
    raf=requestAnimationFrame(frame);}
  build();frame();
  window.addEventListener('resize',build);
  if('ResizeObserver' in window){new ResizeObserver(build).observe(hero);}
  hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  hero.addEventListener('mouseleave',function(){mx=-1e4;my=-1e4;});
})();
/* 3D tilt on project cards */
(function(){
  if(window.matchMedia&&(window.matchMedia('(prefers-reduced-motion: reduce)').matches||window.matchMedia('(hover: none)').matches)) return;
  document.querySelectorAll('.proj').forEach(function(card){
    card.addEventListener('mouseenter',function(){card.style.transition='transform .08s ease-out';});
    card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(760px) rotateX('+(-py*5).toFixed(2)+'deg) rotateY('+(px*5).toFixed(2)+'deg) translateY(-4px)';});
    card.addEventListener('mouseleave',function(){card.style.transition='transform .3s ease';card.style.transform='';});
  });
})();
/* interactive page-background dot grid (blueprint / PCB feel) */
(function(){
  var c=document.getElementById('bgCanvas'); if(!c) return;
  var ctx=c.getContext('2d'),dpr=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,GAP=34,RR=150,mx=-1e4,my=-1e4,queued=false;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(){
    if(W<2||H<2) return;
    ctx.clearRect(0,0,W,H);
    for(var x=GAP/2;x<W;x+=GAP)for(var y=GAP/2;y<H;y+=GAP){
      var dx=x-mx,dy=y-my,d=Math.sqrt(dx*dx+dy*dy),near=!reduce&&d<RR,t=near?1-d/RR:0;
      ctx.beginPath();ctx.arc(x,y,1+t*2.2,0,6.2832);
      ctx.fillStyle=near?'rgba(47,143,134,'+(0.1+t*0.55)+')':'rgba(31,59,87,0.07)';ctx.fill();
    }
    if(!reduce&&mx>-1e3){var g=ctx.createRadialGradient(mx,my,0,mx,my,RR*1.3);
      g.addColorStop(0,'rgba(224,138,43,0.07)');g.addColorStop(1,'rgba(224,138,43,0)');
      ctx.fillStyle=g;ctx.fillRect(mx-RR*1.3,my-RR*1.3,RR*2.6,RR*2.6);}
  }
  function size(){W=window.innerWidth||document.documentElement.clientWidth;H=window.innerHeight||document.documentElement.clientHeight;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  size(); window.addEventListener('resize',size);
  if('ResizeObserver' in window){try{new ResizeObserver(size).observe(document.documentElement);}catch(e){}}
  if(!reduce){
    window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(!queued){queued=true;requestAnimationFrame(function(){queued=false;draw();});}});
    window.addEventListener('blur',function(){mx=-1e4;my=-1e4;draw();});
  }
})();

/* scroll progress bar */
(function(){var b=document.querySelector('.scroll-progress span');if(!b)return;var q=false;
  function up(){var h=document.documentElement,m=(h.scrollHeight-h.clientHeight)||1;
    b.style.width=Math.min(100,Math.max(0,(h.scrollTop||document.body.scrollTop)/m*100))+'%';q=false;}
  window.addEventListener('scroll',function(){if(!q){q=true;requestAnimationFrame(up);}},{passive:true});up();})();
/* nav toggle + language switch: expose state to assistive tech */
(function(){var t=document.querySelector('.nav-toggle'),l=document.querySelector('.nav-links');
  if(t&&l)t.addEventListener('click',function(){t.setAttribute('aria-expanded',l.classList.contains('show')?'true':'false');});
  function mark(){var c=document.documentElement.getAttribute('data-lang')||'en';
    document.querySelectorAll('.lang-opt').forEach(function(o){o.setAttribute('aria-pressed',o.dataset.set===c?'true':'false');});}
  document.querySelectorAll('.lang-opt').forEach(function(o){o.addEventListener('click',mark);});mark();})();
