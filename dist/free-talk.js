/* Shared, consent-based demo pool. No live users or backend queues. */
const FREE_TALK=8;
categories.push({name:'Due chiacchiere',desc:'Nessun tema da scegliere. Solo qualcuno da conoscere.',n:0,tags:[],color:'#faf7f0',freeTalk:true});
paperFiles.push('agora');roomPNGs.push('due-chiacchiere');
driveAssets['Voemi_Categoria_due-chiacchiere.png']={size:[1254,1254],bounds:[43,49,1208,1228]};
prompts.push(['Qual è stata la parte migliore della tua giornata?','Come passeresti una giornata tutta per te?']);
state.acceptFreeTalk=false;
const freeTalkPeople=[
 {id:'giulia',name:'Giulia',age:27,gender:'Donna',city:'Roma',distance:4,topic:1,openTalk:true,interests:['Cinema']},
 {id:'luca',name:'Luca',age:27,gender:'Uomo',city:'Roma',distance:4,topic:FREE_TALK,openTalk:true,interests:['Sport']},
 {id:'anna',name:'Anna',age:30,gender:'Donna',city:'Roma',distance:8,topic:2,openTalk:false,interests:['Musica']}
];
function freeTalkEligible(people=freeTalkPeople,filters=state){
 return [...new Map(people.filter(p=>(p.topic===FREE_TALK||p.openTalk===true)&&!filters.blocked&&p.city.toLowerCase()===filters.city.toLowerCase()&&p.age>=filters.min&&p.age<=filters.max&&p.distance<=(filters.radius||25)&&(filters.preference==='Tutte le persone'||p.gender===(filters.preference==='Uomini'?'Uomo':'Donna'))).map(p=>[p.id,p])).values()];
}
const beforeFreeAvailable=available;
available=function(i){return i===FREE_TALK?freeTalkEligible().length>0:beforeFreeAvailable(i)};
const beforeFreeOnline=roomOnlineLabel;
roomOnlineLabel=function(i){if(i!==FREE_TALK)return beforeFreeOnline(i);const n=freeTalkEligible().length;return `${n} ${state.preference==='Donne'?(n===1?'ragazza connessa':'ragazze connesse'):state.preference==='Uomini'?(n===1?'ragazzo connesso':'ragazzi connessi'):(n===1?'persona connessa':'persone connesse')} ora`};
const beforeFreeName=personName,beforeFreeAge=personAge;
personName=function(){return state.category===FREE_TALK&&state.freeTalkPerson?state.freeTalkPerson.name:beforeFreeName()};
personAge=function(){return state.category===FREE_TALK&&state.freeTalkPerson?state.freeTalkPerson.age:beforeFreeAge()};
const beforeFreeSearch=startSearch;
startSearch=function(){if(state.category!==FREE_TALK&&state.acceptFreeTalk){const candidate=freeTalkEligible().find(p=>p.topic===FREE_TALK);if(candidate){state.category=FREE_TALK;state.freeTalkPerson=candidate;beforeFreeSearch();return}}if(state.category===FREE_TALK)state.freeTalkPerson=freeTalkEligible()[0]||null;beforeFreeSearch()};
const beforeFreeRender=render;
render=function(){
 beforeFreeRender();
 if(state.view==='home'){
  const grid=app.querySelector('.category-grid');
  grid.insertAdjacentHTML('beforebegin',`<button class="category paper-card free-talk-card" data-room="8" onclick="selectCategory(8)"><h2>Due chiacchiere</h2>${art(8)}<div class="category-content"><p class="free-talk-description">Nessun tema da scegliere.<br>Solo qualcuno da conoscere.</p><p>${roomOnlineLabel(8)}</p><div class="category-footer"><span>${freeTalkEligible().length} ${freeTalkEligible().length===1?'compatibile':'compatibili'} in attesa</span>${icon('chevron')}</div></div></button><h2 class="topic-section-title">Le stanze tematiche</h2>`);
 }
 if(state.view==='category'&&state.category===FREE_TALK){
  app.querySelector('.eyebrow').textContent='Un incontro spontaneo';
  app.querySelector('h1').insertAdjacentHTML('afterend','<p class="lead">Nessun tema da scegliere. Solo qualcuno da conoscere.</p>');
  app.querySelector('.availability-note').insertAdjacentHTML('beforebegin','<p class="microcopy">Stessi filtri di genere, età e zona. Gli interessi aiutano, ma non sono un requisito. Puoi incontrare anche chi, nelle stanze tematiche, ha accettato di parlare liberamente.</p>');
 }
 if(state.view==='ready'&&state.category!==FREE_TALK){
  app.querySelector('.trust-list').insertAdjacentHTML('afterend',`<label class="free-talk-consent"><input type="checkbox" ${state.acceptFreeTalk?'checked':''} onchange="state.acceptFreeTalk=this.checked"><span><strong>Disponibile anche per Due chiacchiere</strong><small>Accetto di conoscere anche chi vuole parlare liberamente, senza un tema. Puoi cambiare questa scelta prima di ogni ricerca.</small></span></label>`);
 }
 if(state.view==='search'&&state.category===FREE_TALK){const lead=app.querySelector('.lead');if(lead)lead.textContent='Basta la voglia di conoscersi. Il resto viene parlando.';}
 if(state.view==='found'&&state.category===FREE_TALK){
  app.querySelector('.common-label').textContent='La voglia di conoscersi';
  app.querySelector('.pills').innerHTML='<span class="pill">Conversazione libera</span>';
 }
 loadArt();applyMaterials();
};
render();
