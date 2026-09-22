# Voemi — mappa delle schermate

## Accessi

- **Profilo → Impostazioni e Premium**: tutte le preferenze, piano e sicurezza.
- **Profilo → Esplora tutte le schermate**: catalogo dei percorsi e degli stati di errore; pulsante esplicito per caricare una conversazione fittizia.
- **Voemi Premium**: vantaggi cliccabili e percorso di abbonamento simulato.
- **Chat** dopo un match: anteprima dei messaggi, con conteggio dei non letti.
- **Persona trovata**: anteprima foto con consenso simulato.
- **Preparazione chiamata**: microfono disponibile/non disponibile, senza chiedere permessi reali.
- **Opzioni chiamata**: interruzione simulata e recupero.

## Nuove schermate

- `discoveryPaused`
- `settings`
- `subscription`
- `checkout`
- `paymentPending`
- `paymentFailed`
- `premiumSuccess`
- `receipt`
- `cancelPlan`
- `planCancelled`
- `locationSettings`
- `affinity`
- `discretion`
- `privacySettings`
- `alerts`
- `alertsSaved`
- `savedSearches`
- `chatPreview`
- `photoPreview`
- `unlimited`
- `blockedProfiles`
- `account`
- `welcome`
- `login`
- `verifyContact`
- `verifyCode`
- `verifyIdentity`
- `verifiedDone`
- `microphoneSetup`
- `microphoneDenied`
- `callInterrupted`
- `noMatch`
- `reportDone`
- `demoIndex`

## Comportamenti verificati

- Acquisto simulato: attesa, esito positivo, errore, riprova, annullamento durante l’attesa senza attivazione tardiva.
- Ritorno a Base: ripristino della città originaria e distanza standard; blocco dei vantaggi Premium.
- Posizione, affinità e avvisi salvati nella sessione; ricerche nominate, riapplicabili ed eliminabili.
- Disponibilità disattivata: la ricerca incontra una schermata di pausa con possibilità di riattivazione.
- L’anteprima chat non marca il messaggio come letto; aprire la conversazione lo marca come letto nella demo.
- Foto anticipata bloccata in assenza di consenso della persona dimostrativa.
- Verifica: codice errato, codice demo 123456, verifica identità senza fotocamera e risultato.
- Segnalazione: conferma locale e blocco; elenco bloccati e sblocco.
- Tutti i template e le azioni inline compilano; test pilota e nuovi test superati.
- Controllo visuale mobile di checkout, modalità discreta e anteprima chat; assenza di overflow a 320 px sul percorso di verifica; nessun errore JavaScript osservato.

## Limiti del mockup

Nessuna autenticazione, verifica d’identità, connessione audio, pagamento, notifica, moderazione o geolocalizzazione reale. Le affinità e gli orari memorizzano preferenze di interfaccia e non eseguono algoritmi remoti. I dati si azzerano ricaricando la pagina. La demo di chiamate illimitate illustra il vantaggio del piano, senza introdurre una quota commerciale arbitraria per Base.

## Due chiacchiere
Macrosection before thematic rooms, no additional navigation item. Reuses the category → ready → microphone → search → found → call → mutual choice flow. Home illustration is a generated edit of the original Agora PNG, with an empty table and coral/mauve paper figures; original remains intact.
Demo shared pool deduplicates people and enforces gender, age, city, radius and free-conversation consent. Interests are optional. Thematic ready screens expose an unchecked opt-in; when enabled, an eligible free-conversation participant can be selected. Availability, participants and consent fixtures are simulated, not a live queue. New tests cover pool eligibility.

## Four macrosections and voice-only chat
Navigation is Stanze → Trova → Chat → Profilo. Trova (home) contains only free conversation; Stanze has the eight thematic rooms. A paper-textured door identifies Stanze. The existing sliding rectangular paper selection uses four positions.
Chat has audio-note bubbles, simulated recording, preview, discard/send, playback and recall. No text composer or text messages are rendered. Opening chat does not mark audio as listened; playback does, except in Premium private preview. No microphone capture or real calls are implemented in this mockup.
