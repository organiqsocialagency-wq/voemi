/* Local interactive plan preview: no billing or real location service. */
state.premium=false;
state.radius=25;
state.freeCity=state.city;
const premiumSymbols={
 pin:'<path d="M12 22s8-9 8-14a8 8 0 0 0-16 0c0 5 8 14 8 14Z" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="3" fill="#68354f" stroke="none"/>',
 radius:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"/>',
 person:'<circle cx="12" cy="7" r="4" fill="currentColor" stroke="none"/><path d="M4 22v-3a8 8 0 0 1 16 0v3Z" fill="currentColor" stroke="none"/>',
 filters:'<path d="M2 5h20M2 12h20M2 19h20"/><circle cx="8" cy="5" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="9" cy="19" r="2" fill="currentColor"/>',
 eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="4" fill="#68354f" stroke="none"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>',
 bell:'<path d="M4 18h16l-2-4V9a6 6 0 0 0-12 0v5Z" fill="currentColor"/><path d="M10 22h4M12 1v2"/>',
 chat:'<path d="M3 3h18v14H9l-6 5Z" stroke-linejoin="round"/><path d="M7 8h10M7 12h7"/>',
 calls:'<path d="M3 13c3-7 7-7 10 0s7 7 10 0M3 13c3 7 7 7 10 0s7-7 10 0" transform="translate(-1 -1)" stroke-linecap="round"/>',
 bookmark:'<path d="M5 3h14v19l-7-5-7 5Z" fill="currentColor" stroke-linejoin="round"/>'
};
function premiumRow(symbol,title,copy){return `<li class="premium-row"><span class="premium-medallion" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${premiumSymbols[symbol]}</svg></span><div><strong>${title}</strong><span>${copy}</span></div></li>`}
function openPremium(){
 panel('Voemi Premium',`<div class="premium-sheet"><p class="premium-intro">Più libertà di scegliere dove nasce la prossima conversazione.</p><p class="premium-price"><strong>6€ <span>al mese</span></strong><span>Solo 6€ al mese, per dare più spazio alle conversazioni.</span></p><div class="premium-plan">Il tuo piano: <strong>${state.premium?'Premium · demo':'Base'}</strong></div><section class="premium-group premium-trial"><h3>Prova nella demo</h3><ul class="premium-benefits">${premiumRow('pin','Scegli la città','Esplora conversazioni anche fuori dalla tua zona.')}${premiumRow('radius','Decidi la distanza','Imposta un raggio di 5, 10, 25, 50 o 100 km.')}</ul></section><section class="premium-group"><h3>Vantaggi proposti per il piano</h3><p class="premium-proposed">In progettazione: queste funzioni non sono ancora attive.</p><ul class="premium-benefits">${premiumRow('person','Anteprima del profilo','Foto anticipate, se l’altra persona ne consente la visibilità.')}${premiumRow('filters','Filtri di affinità avanzati','Lingue, interessi condivisi e intenzioni di incontro.')}${premiumRow('eye','Modalità discreta','Nascondi il tuo stato online e l’ultimo accesso. Decidi tu quando risultare disponibile per nuove conversazioni.')}${premiumRow('chat','Anteprima delle chat','Ascolta le note vocali ricevute senza inviare all’altra persona la conferma di ascolto.')}${premiumRow('calls','Chiamate illimitate','Avvia tutte le conversazioni che vuoi, senza un limite giornaliero di chiamate. La disponibilità dipende dalle persone compatibili online.')}${premiumRow('bell','Avvisi personalizzati','Scegli temi e orari per sapere quando tornare.')}${premiumRow('bookmark','Preferenze salvate','Salva combinazioni di città, distanza, età e interessi. Ritrovale con un tocco, senza reimpostare ogni filtro.')}</ul></section><p class="premium-note">Nel mockup il pulsante attiva soltanto la demo: nessun abbonamento o addebito.</p><button class="primary" onclick="togglePremiumDemo()">${state.premium?'Torna al piano Base':'Abbonati ora 6€ al mese'}</button><p class="premium-note premium-safety">Blocco, segnalazioni e protezione del numero restano disponibili per tutti.</p></div>`);
 const dialog=document.getElementById('filter-dialog');dialog.scrollTop=0;applyMaterials();
}
function togglePremiumDemo(){
 if(!state.premium){state.freeCity=state.city;state.premium=true}else{state.premium=false;state.city=state.freeCity;state.radius=25}
 closePanel();render();if(state.premium)openFilters();else toast('Piano Base ripristinato');
}
const filtersBeforePremium=openFilters;
openFilters=function(){
 filtersBeforePremium();
 const city=document.getElementById('city'),form=document.getElementById('filters-form');
 city.disabled=!state.premium;
 const anchor=city.closest('.png-input-shell')||city;
 anchor.insertAdjacentHTML('afterend',`<label for="radius">Raggio di ricerca ${state.premium?'':'· Premium'}</label><select id="radius" ${state.premium?'':'disabled'}>${[5,10,25,50,100].map(k=>`<option value="${k}" ${state.radius===k?'selected':''}>${k} km</option>`).join('')}</select>${state.premium?'<p class="microcopy">Distanza simulata: la demo non usa la tua posizione GPS.</p>':'<p class="microcopy">Città e distanza sono riservate a Premium.</p><button type="button" class="text-button" onclick="openPremium()">Scopri Premium</button>'}`);
 const submit=form.onsubmit;
 form.onsubmit=function(e){if(!state.premium)city.value=state.freeCity;else state.radius=Number(document.getElementById('radius').value);submit(e)};
 applyMaterials();
};
const materialsBeforePremium=applyMaterials;
applyMaterials=function(){
 materialsBeforePremium();
 document.querySelectorAll('.premium-group,.premium-row,.premium-plan').forEach(el=>{materialObserver.observe(el);paperLayer(el)});
 const city=document.getElementById('profile-city');
 if(city){city.disabled=!state.premium;if(!state.premium&&!document.getElementById('profile-premium-note'))(city.closest('.png-input-shell')||city).insertAdjacentHTML('afterend','<p id="profile-premium-note" class="microcopy">Cambio città disponibile con <button type="button" class="small-link" onclick="openPremium()">Premium</button>.</p>')}
};
render();
