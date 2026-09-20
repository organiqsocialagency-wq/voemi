// Demo availability follows the selected audience; waiting counts are a subset.
function roomOnlineLabel(i){
 const girls=[42,36,54,31,28,24,17,39],boys=[38,43,47,35,32,21,19,46];
 const local=state.city.toLowerCase()==='roma'&&!state.blocked;
 if(state.preference==='Donne')return `${local?girls[i]:0} ragazze connesse ora`;
 if(state.preference==='Uomini')return `${local?boys[i]:0} ragazzi connessi ora`;
 return `${local?girls[i]+boys[i]:0} persone connesse ora`;
}
/* Paper identity v2: native text/controls, original Drive illustrations. */
const paperFiles=['agora','cinema','musica','sport','anime','cultura','teatro','gaming'];
const paperDescriptions=['Attualità e società','Film e storie','Artisti e concerti','Movimento e benessere','Manga e serie TV','Libri e nuove idee','Storie sul palco','Mondi da esplorare'];
const roomOrder=[0,3,1,2,4,5,6,7];
function paperBrand(){return '<img class="paper-mark" src="assets/paper/mark.svg" alt=""><span>Voemi</span>'}
document.querySelectorAll('.brand').forEach(el=>el.innerHTML=paperBrand());
loadArt=function(){document.querySelectorAll('[data-art]').forEach(el=>{el.style.backgroundImage=`url('assets/paper/${paperFiles[Number(el.dataset.art)]}.png')`})};
nav=function(){const entries=[['home','home','Stanze'],['messages','chat','Chat'],['profile','user','Profilo']];const section=['messages','matches','chat','person'].includes(state.view)?'messages':state.view==='profile'?'profile':'home';const html=entries.map(([view,i,label])=>`<button onclick="go('${view}')" class="${section===view?'active':''}" ${section===view?'aria-current="page"':''}>${icon(i)}<span>${label}</span></button>`).join('');document.getElementById('desktop-nav').innerHTML=html;document.getElementById('mobile-nav').innerHTML=html;document.querySelector('.avatar').textContent=state.name.charAt(0).toUpperCase();document.body.classList.toggle('no-bottom-nav',!['home','category','matches','messages','chat','person','profile'].includes(state.view))};
const beforePaperRender=render;
render=function(){beforePaperRender();if(state.view==='home'){
 app.innerHTML=`<section class="home paper-home page-enter"><h1>Che conversazione<br>cerchi oggi?</h1><div class="paper-filters"><button onclick="openFilters()">${esc(state.preference)}</button><button onclick="openFilters()">${state.min}–${state.max}</button><button onclick="openFilters()">${esc(state.city)}</button><button onclick="openFilters()" aria-label="Tutti i filtri">${icon('filters')}</button></div><div class="category-grid">${roomOrder.map(i=>`<button class="category paper-card" data-room="${i}" onclick="selectCategory(${i})">${art(i)}<div class="category-content"><h2>${categories[i].name}</h2><p>${roomOnlineLabel(i)}</p><div class="category-footer"><span>${available(i)?categories[i].n:0} compatibili in attesa</span>${icon('chevron')}</div></div></button>`).join('')}</div><div class="paper-demo"><span>Disponibilità simulate · incontri di 3 minuti</span><button onclick="pilotPanel()">Il pilota a Roma</button><button onclick="privacyPanel()">Privacy e sicurezza</button></div></section>`;
 }
 if(['messages','matches'].includes(state.view))app.querySelector('section').insertAdjacentHTML('afterbegin',`<div class="inbox-tabs"><button class="${state.view==='messages'?'selected':''}" onclick="go('messages')">Conversazioni</button><button class="${state.view==='matches'?'selected':''}" onclick="go('matches')">Connessioni</button></div>`);
 loadArt();nav();
};
const beforePaperMute=toggleMute;
toggleMute=function(){beforePaperMute();document.querySelector('#mute svg').innerHTML=icons.mic+(state.muted?'<path d="m3 3 18 18"/>':'')};
render();
