/* Local interactive plan preview: no billing or real location service. */
state.premium=false;
state.radius=25;
state.freeCity=state.city;
function openPremium(){
 panel('Voemi Premium',`<p class="lead">Più libertà di scegliere dove nasce la prossima conversazione.</p><p class="premium-status">${state.premium?'Premium attivo nella demo':'Il tuo piano: Base'}</p><h3>Prova nella demo</h3><ul class="premium-benefits"><li><strong>Scegli la città</strong><span>Esplora conversazioni anche fuori dalla tua zona.</span></li><li><strong>Decidi la distanza</strong><span>Imposta un raggio di 5, 10, 25, 50 o 100 km.</span></li></ul><h3>Vantaggi proposti per il piano</h3><p class="microcopy">In progettazione: queste funzioni non sono ancora attive.</p><ul class="premium-benefits"><li><strong>Anteprima del profilo</strong><span>Foto anticipate, se l’altra persona ne consente la visibilità.</span></li><li><strong>Filtri di affinità avanzati</strong><span>Lingue, interessi condivisi e intenzioni di incontro.</span></li><li><strong>Modalità discreta</strong><span>Più controllo sulla tua disponibilità e visibilità.</span></li><li><strong>Avvisi personalizzati</strong><span>Scegli temi e orari per sapere quando tornare.</span></li><li><strong>Preferenze salvate</strong><span>Passa rapidamente tra città e ricerche preferite.</span></li></ul><p class="microcopy">Prezzo da definire. Nessun acquisto o addebito nella demo.</p><button class="primary" onclick="togglePremiumDemo()">${state.premium?'Torna al piano Base':'Prova Premium nella demo'}</button><p class="microcopy">Blocco, segnalazioni e protezione del numero restano disponibili per tutti.</p>`);
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
 const city=document.getElementById('profile-city');
 if(city){city.disabled=!state.premium;if(!state.premium&&!document.getElementById('profile-premium-note'))(city.closest('.png-input-shell')||city).insertAdjacentHTML('afterend','<p id="profile-premium-note" class="microcopy">Cambio città disponibile con <button type="button" class="small-link" onclick="openPremium()">Premium</button>.</p>')}
};
render();
