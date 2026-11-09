/*
  Footer flowers: translucent flowers that grow up and bloom when the garden
  scrolls into view, then sway gently over a soft green wash. Adapted from
  footer-flowers.js to run on a given <svg> and clean up after itself.
  People with reduced motion turned on see the flowers fully grown and still.
*/
const NS = 'http://www.w3.org/2000/svg'

// Draws into `svg` (viewBox 0 0 1440 600) and starts blooming once `host` is
// 35% visible. Returns a cleanup function.
export function createFooterFlowers(svg, host, { reduceMotion = false } = {}) {
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}

  // Palette: each flower gets a deep base colour and a pale tip, so overlapping petals build colour like the references
  var C={
    pink:['#DE8FD9','#FADFFD'], lilac:['#B48CF0','#EEE2FD'], peri:['#8D93EC','#E4E6FC'],
    blue:['#86B6F2','#E6F1FE'], sky:['#8FCBEB','#E8F6FD']
  };

  var defs=el('defs',{},svg), gid=0;
  var groundLayer=el('g',{},svg);
  function grad(c){
    var id='ff-g'+(gid++), g=el('linearGradient',{id:id,x1:0,y1:0,x2:0,y2:1},defs);
    el('stop',{offset:'0','stop-color':c[1]},g); el('stop',{offset:'.55','stop-color':c[0],'stop-opacity':.85},g); el('stop',{offset:'1','stop-color':c[0]},g);
    return 'url(#'+id+')';
  }

  // petal pointing up from (0,0); ruffle adds a wavy tip
  function petalPath(L,W,ruffle){
    if(!ruffle) return 'M0 0 C'+W+' '+(-L*.25)+' '+(W*1.05)+' '+(-L*.85)+' 0 '+(-L)+' C'+(-W*1.05)+' '+(-L*.85)+' '+(-W)+' '+(-L*.25)+' 0 0Z';
    var d='M0 0 C'+W+' '+(-L*.2)+' '+(W*1.2)+' '+(-L*.7)+' '+(W*.95)+' '+(-L*.92);
    var n=5; for(var i=1;i<=n;i++){var x=W*.95-(W*1.9)*i/n, y=-L*.92-(i%2?L*.09:-L*.02); d+=' Q'+(x+W*.19)+' '+(y-L*.07)+' '+x+' '+y;}
    return d+' C'+(-W*1.2)+' '+(-L*.7)+' '+(-W)+' '+(-L*.2)+' 0 0Z';
  }

  // Flower kinds. Each petal: [open angle, length, width, closed angle]
  var KINDS={
    tulip:{tilt:1, petals:[[-30,74,24,-6],[30,74,24,6],[-12,80,26,-3],[12,80,26,3],[0,84,28,0]], center:null},
    anemone:{tilt:.62, petals:[0,51,103,154,206,257,309].map(function(a){return[a,58,22,a*.15]}), center:'dark'},
    star:{tilt:.8, petals:[0,72,144,216,288].map(function(a){return[a+12,66,30,a*.1]}), center:'stamens'},
    poppy:{tilt:.7, ruffle:true, petals:[[-20,70,44,-6],[60,66,42,10],[140,68,44,20],[220,66,42,30],[300,70,44,40]], center:'gold'},
    bud:{tilt:1, petals:[[-10,30,11,-3],[10,30,11,3],[0,34,12,0]], center:null}
  };

  // Garden layout (viewBox 1440x600). x, stem height, lean, kind, colour, scale, leaf side
  var F=[
    [70, 330, 18, 'star','blue',1.05, 1],
    [165,190,-10, 'bud','pink',1, 0],
    [240,280,-14, 'tulip','pink',1, -1],
    [330,170, 8, 'anemone','peri',.8, 0],
    [430,120,-6, 'bud','lilac',.9, 0],
    [520,150, 10, 'tulip','lilac',.75, 1],
    [610,100,-8, 'bud','sky',.85, 0],
    [700,175, 6, 'star','sky',.8, -1],
    [790,110,-6, 'anemone','pink',.65, 0],
    [880,145, 9, 'bud','peri',.9, 1],
    [950,160,-10, 'tulip','blue',.75, 0],
    [1010,130, 6, 'bud','pink',.9, 0],
    [1100,250, 12,'anemone','lilac',1, 1],
    [1200,360,-16,'poppy','pink',1.05,-1],
    [1300,230, 10,'tulip','peri',.95, 1],
    [1385,300,-20,'star','sky',.95, 0]
  ];

  var GROUND_Y=540, flowers=[];
  F.forEach(function(f,i){
    var x=f[0],h=f[1],lean=f[2],kind=KINDS[f[3]],col=C[f[4]],s=f[5];
    var root=el('g',{},svg);
    var tipX=x+lean, tipY=GROUND_Y-h;
    var stem=el('path',{d:'M'+x+' '+(GROUND_Y+80)+' Q'+(x-lean*.6)+' '+(GROUND_Y-h*.5)+' '+tipX+' '+tipY,fill:'none',stroke:'#9DAE8E','stroke-width':2.4,'stroke-linecap':'round',opacity:.8},root);
    var len=stem.getTotalLength(); stem.style.strokeDasharray=len;
    var leaf=null;
    if(f[6]){
      var ly=GROUND_Y-h*.38, lx=x-lean*.35;
      leaf=el('path',{d:petalPath(54,15),fill:grad(['#97AE86','#E3EADB']),'fill-opacity':.55,style:'mix-blend-mode:multiply',
        transform:'translate('+lx+' '+ly+') rotate('+(f[6]*58)+')'},root);
    }
    var head=el('g',{},root), tiltG=el('g',{transform:'scale('+s+','+(s*kind.tilt)+')'},head);
    var fill=grad(col), petals=[];
    kind.petals.forEach(function(pd){
      var p=el('path',{d:petalPath(pd[1],pd[2],kind.ruffle),fill:fill,'fill-opacity':.5,style:'mix-blend-mode:multiply'},tiltG);
      // faint veins for the x-ray look
      var v=el('g',{opacity:.28},tiltG);
      [-.45,0,.45].forEach(function(k){el('path',{d:'M0 -4 Q'+(pd[2]*k*.9)+' '+(-pd[1]*.5)+' '+(pd[2]*k*.55)+' '+(-pd[1]*.9),fill:'none',stroke:col[0],'stroke-width':.7},v)});
      petals.push({p:p,v:v,d:pd});
    });
    var center=null;
    if(kind.center){
      center=el('g',{},head);
      if(kind.center==='dark'){ el('circle',{r:9,fill:'#3D3A78',opacity:.85},center); for(var k=0;k<14;k++){var a=k/14*6.283;el('circle',{cx:Math.cos(a)*12,cy:Math.sin(a)*12*kind.tilt,r:1.8,fill:'#3D3A78',opacity:.7},center)} }
      if(kind.center==='stamens'){ for(var k=0;k<12;k++){var a=k/12*6.283,r=10+(k%3)*3,ex=Math.cos(a)*r,ey=Math.sin(a)*r*kind.tilt;el('line',{x1:0,y1:0,x2:ex,y2:ey,stroke:'#33406E','stroke-width':.8,opacity:.7},center);el('circle',{cx:ex,cy:ey,r:1.7,fill:'#33406E'},center)} }
      if(kind.center==='gold'){ for(var k=0;k<16;k++){var a=k/16*6.283,ex=Math.cos(a)*11,ey=Math.sin(a)*11*kind.tilt-4;el('line',{x1:0,y1:-3,x2:ex,y2:ey,stroke:'#B66FC9','stroke-width':.9},center);el('circle',{cx:ex,cy:ey,r:1.5,fill:'#8E4FB3'},center)} el('ellipse',{rx:5,ry:6,cy:-2,fill:'#7E4AA6',opacity:.75},center) }
      center.setAttribute('transform','scale('+s+')');
    }
    flowers.push({root:root,stem:stem,len:len,leaf:leaf,head:head,petals:petals,center:center,x:x,tip:[tipX,tipY],
      delay:Math.min(x,1440-x)/720*1.6+(i%2)*.1, sway:5.5+(i*1.37)%3, phase:i*1.9});
  });

  // ground: a soft green wash that fades up into the page colour, with no visible edge
  var gg=el('linearGradient',{id:'ff-ground',x1:0,y1:0,x2:0,y2:1},defs);
  [[0,0],[.3,.18],[.6,.55],[1,1]].forEach(function(st){el('stop',{offset:st[0],'stop-color':'#E2E8D9','stop-opacity':st[1]},gg)});
  el('rect',{x:0,y:330,width:1440,height:270,fill:'url(#ff-ground)'},groundLayer);
  
  function cl(x){return x<0?0:x>1?1:x}
  function eout(x){return 1-Math.pow(1-x,3)}
  function eback(x){var c=1.4;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)}


  function render(t){ // t = seconds since the bloom started (Infinity = fully grown, no sway)
    flowers.forEach(function(f){
      var g=cl((t-f.delay)/1.3), grow=eout(g);
      f.stem.style.strokeDashoffset=(f.len*(1-grow)).toFixed(1);
      var pt=f.stem.getPointAtLength(f.len*grow);
      var o=cl((t-f.delay-1.0)/1.1), open=eback(o);
      var sw=isFinite(t)?Math.sin((t+f.phase)/f.sway*6.283)*1.6*cl((t-f.delay-1.5)/1.5):0;
      f.root.setAttribute('transform','rotate('+sw.toFixed(2)+' '+f.x+' 560)');
      f.head.setAttribute('transform','translate('+pt.x.toFixed(1)+' '+pt.y.toFixed(1)+') rotate('+(sw*1.5).toFixed(2)+') scale('+(0.15+0.85*open).toFixed(3)+')');
      f.head.style.opacity=cl(o*3).toFixed(2);
      f.petals.forEach(function(p){
        var a=p.d[3]+(p.d[0]-p.d[3])*open;
        p.p.setAttribute('transform','rotate('+a.toFixed(1)+')');
        p.v.setAttribute('transform','rotate('+a.toFixed(1)+')');
      });
      if(f.leaf){ var lo=eout(cl((t-f.delay-.6)/.8)); f.leaf.style.opacity=lo.toFixed(2); }
      if(f.center) f.center.style.opacity=cl((t-f.delay-1.6)/.6).toFixed(2);
    });
  }

  let start = null
  let raf = 0
  let observer = null
  function loop(ts) {
    if (start === null) start = ts
    render((ts - start) / 1000)
    raf = requestAnimationFrame(loop)
  }

  if (reduceMotion) {
    render(Infinity)
  } else {
    render(0)
    const go = () => {
      if (start === null && !raf) raf = requestAnimationFrame(loop)
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            go()
            observer.disconnect()
          }
        },
        { threshold: 0.35 },
      )
      observer.observe(host)
    } else go()
  }

  return () => {
    cancelAnimationFrame(raf)
    observer?.disconnect()
    svg.replaceChildren()
  }
}
