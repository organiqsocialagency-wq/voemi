# Voemi

Mockup interattivo ad alta fedeltà di un’app di incontri voice-first: **prima la voce, poi il profilo**.

## Anteprima

[Apri il sito pubblico](https://organiqsocialagency-wq.github.io/voemi/).

## Pubblicazione automatica

Ogni push su `main` che modifica `dist/` o il workflow di pubblicazione aggiorna il sito GitHub Pages. Modifica i file in `dist/`, esegui commit e push, poi controlla la scheda **Actions** della repository. È possibile avviare una pubblicazione anche manualmente con **Publish Voemi → Run workflow**.

Il precedente indirizzo Sites resta una pubblicazione separata: i push su GitHub aggiornano il link GitHub Pages indicato sopra.

## Percorsi inclusi

- Onboarding in sei passaggi.
- Home con otto categorie illustrate e filtri per preferenze, età e città.
- Ricerca di una persona e schermata di connessione.
- Chiamata dimostrativa con timer e controlli.
- Valutazione dopo la chiamata, match reciproco e sblocco del profilo.
- Chat dimostrativa e modifica del proprio profilo.

## Avvio locale

Non occorrono dipendenze o compilazione. Con Python 3 installato:

```sh
python3 -m http.server 5173 --directory dist
```

Apri <http://localhost:5173>.

## Struttura

- `dist/index.html`: struttura dell’app.
- `dist/style.css`: componenti base.
- `dist/refinement.css`: rifinitura visiva responsive, card e onde vocali.
- `dist/app.js`: navigazione, stati e interazioni.
- `dist/assets/`: marchio, illustrazioni e ritratto dimostrativo.
- `.openai/hosting.json`: configurazione della pubblicazione Sites esistente.

## Limiti del prototipo

Persone, disponibilità, match e risposte sono simulati. Non sono presenti autenticazione, backend, telefonate reali o salvataggio permanente. Il microfono non viene attivato. I dati della demo rimangono in memoria e si azzerano ricaricando la pagina. Il ritratto è dimostrativo e generato. Le icone delle categorie provengono dai materiali approvati su Drive: Voemi → D) Prodotto → Elementi APP → ICONE → Icone Stanze. Teatro ora usa un asset dedicato generato a partire dall’icona Default approvata. Anime & Serie mantiene intenzionalmente l’eccezione manga monocromatica.

## Identità visiva

Manrope; viola `#8F5CF6`, viola soft `#B783EC`, corallo `#FF5D6C`, lavanda `#F8F4FF`, ink `#17141B`. Il font viene caricato da Google Fonts.

## Evoluzione del pilota

La nuova home rende esplicita la disponibilità demo e distingue tre temi iniziali (Roma: Agorà, Cinema, Musica) dagli argomenti in attesa. Percorsi aggiunti:

- Preparazione a una prima conversazione di 3 minuti e conferma simulata dell’altra persona.
- Uno spunto facoltativo per tema, con alternativa.
- Dopo 180 secondi, scelta di continuare: la demo simula il consenso dell’altra persona. Il comando “Prova la fine dei 3 minuti” permette di esplorare il passaggio senza attendere.
- Nessuna disponibilità, proposta di finestre di incontro e avviso salvato nella sessione, senza notifiche reali.
- Informazioni sulla privacy, verifica dimostrativa, blocco locale e simulazione di segnalazione. Nessun dato viene inviato a moderazione.
- Nuova composizione delle card, icona Teatro, chiamata focalizzata e rivelazione progressiva del volto.

`dist/experience.js` e `dist/experience.css` contengono questa evoluzione. Tutte le azioni di servizio sono simulate e si azzerano al ricaricamento; non costituiscono sicurezza o verifica reale. La fotografia dimostrativa è scaricabile dal browser anche quando è sfocata: nel prodotto servirà un controllo di accesso lato server.

[Protocollo di test e servizi da integrare](docs/pilot-test.md).
