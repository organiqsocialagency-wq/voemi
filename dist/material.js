/* Paper v2: source-preserving SVG composition. Original PNGs are never repainted. */
const paperBounds={agora:[94,94,1066,1066],sport:[86,86,1078,1074],cinema:[94,92,1067,1068],musica:[94,92,1066,1070],anime:[94,90,1066,1074],cultura:[94,94,1066,1066],teatro:[94,94,1066,1066],gaming:[120,108,1014,1038]};
let materialId=0;
function paperContour(w,h,r,rough){
 const points=[];let index=0;
 const point=(x,y,nx,ny)=>{const d=(Math.sin(++index*2.37)+Math.sin(index*5.19))*.25*rough;points.push(`${(x+nx*d).toFixed(2)},${(y+ny*d).toFixed(2)}`)};
 for(let x=r;x<w-r;x+=2)point(x,.8,0,1);
 for(let a=-90;a<0;a+=5)point(w-r+(r-.8)*Math.cos(a*Math.PI/180),r+(r-.8)*Math.sin(a*Math.PI/180),Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180));
 for(let y=r;y<h-r;y+=2)point(w-.8,y,1,0);
 for(let a=0;a<90;a+=5)point(w-r+(r-.8)*Math.cos(a*Math.PI/180),h-r+(r-.8)*Math.sin(a*Math.PI/180),Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180));
 for(let x=w-r;x>r;x-=2)point(x,h-.8,0,1);
 for(let a=90;a<180;a+=5)point(r+(r-.8)*Math.cos(a*Math.PI/180),h-r+(r-.8)*Math.sin(a*Math.PI/180),Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180));
 for(let y=h-r;y>r;y-=2)point(.8,y,1,0);
 for(let a=180;a<270;a+=5)point(r+(r-.8)*Math.cos(a*Math.PI/180),r+(r-.8)*Math.sin(a*Math.PI/180),Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180));
 return 'M'+points.join('L')+'Z';
}
function sourceWindow(file,x,y,width,height,box){return `<svg x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" viewBox="${x} ${y} ${width} ${height}" preserveAspectRatio="none" overflow="hidden"><image href="assets/paper/${file}.png" width="1254" height="1254"/></svg>`}
function paperLayer(el){
 const width=el.clientWidth,height=el.clientHeight;if(width<1||height<1)return;
 const file=el.dataset.paper||'agora',category=el.matches('.paper-card,.large-art'),id=`material-${++materialId}`;
 const [sx,sy,sw,sh]=paperBounds[file],r=Math.min(category?22:parseFloat(getComputedStyle(el).borderTopLeftRadius)||20,width/2,height/2);
 const crop=150,edge=4;
 const layer=document.createElementNS('http://www.w3.org/2000/svg','svg');
 layer.setAttribute('viewBox',`0 0 ${width} ${height}`);layer.setAttribute('preserveAspectRatio','none');layer.setAttribute('aria-hidden','true');layer.setAttribute('focusable','false');layer.classList.add('material-layer');
 // The transparent margins are discarded by viewports, not by redrawing the asset.
 const blank=sourceWindow(file,file==='gaming'?158:135,285,40,400,[0,0,16,160]);
 const contour=paperContour(width,height,r,category?1.5:1);
 const center=`<defs><pattern id="${id}" width="16" height="160" patternUnits="userSpaceOnUse">${blank}</pattern><clipPath id="${id}-clip"><path d="${contour}"/></clipPath></defs><g clip-path="url(#${id}-clip)">${category?'':`<rect width="100%" height="100%" fill="var(--paper-fill,#f7f4ef)"/>`}<rect width="100%" height="100%" fill="url(#${id})" ${category?'':'style="opacity:var(--paper-grain,.24);mix-blend-mode:var(--paper-blend,multiply)"'}/>`;
 let sides='';
 if(category){
  const slices=[
   [sx,sy,crop,crop,[0,0,r,r]],[sx+sw-crop,sy,crop,crop,[width-r,0,r,r]],
   [sx,sy+sh-crop,crop,crop,[0,height-r,r,r]],[sx+sw-crop,sy+sh-crop,crop,crop,[width-r,height-r,r,r]],
   [sx+crop,sy,sw-crop*2,28,[r,0,width-r*2,edge]],
   [sx+crop,sy+sh-28,sw-crop*2,28,[r,height-edge,width-r*2,edge]],
   [sx,sy+crop,28,sh-crop*2,[0,r,edge,height-r*2]],
   [sx+sw-28,sy+crop,28,sh-crop*2,[width-edge,r,edge,height-r*2]]];
  sides=slices.map(([x,y,w,h,box])=>sourceWindow(file,x,y,w,h,box)).join('');
 }
 layer.innerHTML=center+sides+`</g>${category?'':`<path d="${contour}" fill="none" stroke="var(--paper-stroke,#b8a69b)" stroke-opacity="var(--paper-stroke-opacity,.35)" stroke-width="1"/>`}`;
 el.querySelector(':scope > .material-layer')?.remove();el.prepend(layer);el.classList.add('has-material');
}
const originalCategoryPaperLayer=paperLayer;
const materialObserver=new ResizeObserver(entries=>entries.forEach(({target})=>paperLayer(target)));
function applyMaterials(){
 document.body.classList.toggle('large-type',parseFloat(getComputedStyle(document.documentElement).fontSize)>24);
 materialObserver.disconnect();
 document.querySelectorAll('.paper-card,.large-art,.primary,.secondary,.back,.paper-filters button,.interest,.choice,.person-card,.prompt-card,.session-card,.account-trust,.unlocked-profile,.list-card,#mobile-nav,.call .control>span,dialog[open],.inbox-tabs button,.bubble,.chat-unlock,.pill,.duration-seal,.composer button').forEach(el=>{if(el.matches('.paper-card,.large-art'))el.dataset.paper=paperFiles[Number(el.dataset.room??el.dataset.art)];materialObserver.observe(el);paperLayer(el)});
}
// Use the actual logo pixels, clipped to their original silhouette; no replacement V.
paperBrand=function(){return `<svg class="paper-mark" viewBox="279 276 701 550" aria-hidden="true"><defs><clipPath id="logo-silhouette-${materialId}"><path d="M286 313C303 284 368 283 405 287C467 290 498 314 521 367L624 610L720 385C757 296 801 280 879 279C943 276 981 279 974 310L810 703C768 805 751 822 653 822C547 822 498 802 462 736L324 408C306 369 276 342 286 313Z"/></clipPath></defs><image href="assets/paper/logo-master.png" width="1254" height="1254" clip-path="url(#logo-silhouette-${materialId++})"/></svg><span>Voemi</span>`};
document.querySelectorAll('.brand').forEach(el=>el.innerHTML=paperBrand());
Object.assign(icons,{
 home:'<path d="M3 10 12 2l9 8v11h-6v-6a3 3 0 0 0-6 0v6H3Z"/>',
 chat:'<path d="M20.6 13.2a9 9 0 1 0-16.5 3.1L2 22l5.8-2.1a9 9 0 0 0 12.8-6.7Z"/>',
 user:'<circle cx="12" cy="6.5" r="4"/><path d="M3.5 21a8.5 8.5 0 0 1 17 0Z"/>',
 filters:'<path d="M2 5h20M2 12h20M2 19h20"/><circle cx="9" cy="5" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="19" r="2" fill="currentColor"/>',
 back:'<path d="m15 3-9 9 9 9"/>',
 more:'<circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="20" cy="12" r="1.5" fill="currentColor"/>',
 mic:'<rect x="9" y="2" width="6" height="13" rx="3" fill="currentColor"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>'
});
loadArt=function(){document.querySelectorAll('[data-art]').forEach(el=>{
 const file=paperFiles[Number(el.dataset.art)];el.style.backgroundImage='none';el.innerHTML=`<svg viewBox="170 170 914 ${file==='sport'?765:805}" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><image href="assets/paper/${file}.png" width="1254" height="1254"/></svg>`;
})};
function voiceRibbon(coral=false){
 const id=`ribbon-${++materialId}`,shape='M0 51C28 54 33 34 57 35S91 79 117 65S145 5 174 15S205 83 240 60S271 29 299 43S328 73 352 53S379 34 400 48L400 64C375 48 375 60 352 69S324 88 298 62S268 65 240 81S204 95 174 40S143 67 117 83S87 59 57 58S29 72 0 66Z';
 return `<svg viewBox="0 0 400 104" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="${id}" width="16" height="160" patternUnits="userSpaceOnUse">${sourceWindow('agora',135,285,40,400,[0,0,16,160])}</pattern></defs><path d="${shape}" fill="${coral?'#FF686B':'#C47A87'}"/><path d="${shape}" fill="url(#${id})" style="mix-blend-mode:multiply;opacity:.3"/><path d="M0 51C28 54 33 34 57 35S91 79 117 65S145 5 174 15S205 83 240 60S271 29 299 43S328 73 352 53S379 34 400 48" fill="none" stroke="white" stroke-opacity=".22" stroke-width="1"/></svg>`
}
voiceStage=function(cls=''){return `<div class="voice-stage paper-voices ${cls}"><div class="voice-orb ${state.muted?'paused':''}"><span class="ribbon-name">Tu</span>${voiceRibbon(true)}</div><div class="voice-orb coral"><span class="ribbon-name">${state.view==='search'?'Un’altra persona':personName()}</span>${voiceRibbon()}</div></div>`};
const renderBeforeMaterial=render;
render=function(){renderBeforeMaterial();
 if(state.view==='found'){
  app.querySelector('h1').textContent='Abbiamo trovato qualcuno simile a te!';
  const heading=app.querySelector('.person-heading');heading.insertAdjacentHTML('afterbegin',`<div class="found-ribbons" aria-hidden="true">${voiceRibbon()}${voiceRibbon(true)}</div>`);
 }
 if(state.view==='call'){
  app.querySelector('h1').textContent=`${personName()}, ${personAge()}`;
  app.querySelector('.eyebrow').textContent=`${categories[state.category].name} · ${state.city}`;
  const clock=app.querySelector('.call-clock');app.querySelector('.paper-voices').after(clock);
  app.querySelector('.voice-names').remove();
  const more=app.querySelector('#speaker');more.id='call-more';more.setAttribute('onclick','callOptions()');more.removeAttribute('aria-pressed');more.innerHTML=`<span>${icon('more')}</span><label>Altro</label>`;
 }
 if(state.view==='feedback'){
  app.querySelector('.post-call-voices').outerHTML=`<div class="postcall-art">${art(state.category,'large-art')}</div>`;
  const title=app.querySelector('h1');app.querySelector('.postcall-art').before(title);
  app.querySelector('.flow-actions .text-button').className='secondary';
 }
 loadArt();applyMaterials();
};
function callOptions(){panel('Opzioni della chiamata',`<button class="secondary" onclick="state.speaker=!state.speaker;callOptions()">Audio ${state.speaker?'attivo':'spento'} · ${state.speaker?'disattiva':'attiva'}</button><button class="secondary" onclick="safetyPanel()">Sicurezza · blocca o segnala</button>`)}
toggleMute=function(){state.muted=!state.muted;const b=document.getElementById('mute');b.classList.toggle('toggled',state.muted);b.setAttribute('aria-pressed',String(state.muted));b.querySelector('label').textContent=state.muted?'Riattiva':'Microfono';b.querySelector('span > svg:not(.material-layer)').innerHTML=icons.mic+(state.muted?'<path d="m3 3 18 18"/>':'');document.querySelector('.voice-orb').classList.toggle('paused',state.muted)};
const basePaperPanel=panel;
panel=function(title,content){basePaperPanel(title,content);applyMaterials()};
const basePaperFilters=openFilters;
openFilters=function(){basePaperFilters();applyMaterials();const form=document.getElementById('filters-form'),submit=form.onsubmit;
 form.onsubmit=function(e){const min=document.getElementById('min'),max=document.getElementById('max');form.querySelector('.field-error')?.remove();min.removeAttribute('aria-invalid');max.removeAttribute('aria-invalid');if(+min.value>+max.value){e.preventDefault();min.setAttribute('aria-invalid','true');max.setAttribute('aria-invalid','true');min.setAttribute('aria-describedby','filter-error');max.setAttribute('aria-describedby','filter-error');form.querySelector('.range-pair').insertAdjacentHTML('afterend','<p class="field-error" id="filter-error" role="alert">! L’età minima deve essere inferiore alla massima.</p>');min.focus();return}submit(e)};
};
const materialNav=nav;nav=function(){materialNav();const el=document.getElementById('mobile-nav');if(el.clientHeight)paperLayer(el)};
const connectPaperCall=startCall;
startCall=function(){const button=document.getElementById('connect-button');if(!button||button.disabled)return;button.disabled=true;button.setAttribute('aria-busy','true');button.innerHTML='<span class="connection-spinner" aria-hidden="true"></span>Connessione…';paperLayer(button);later(connectPaperCall,220)};
render();
