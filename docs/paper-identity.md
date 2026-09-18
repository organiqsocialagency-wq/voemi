# Voemi Paper v2 — implementazione

## Riferimenti

- `Voemi_Brandbook_Paper_v2.pdf`, fornito nel contesto del progetto e trovato nei Download locali. Token e quote seguono le schede numeriche (pagine 9–19, 25–30).
- Screenshot del 17 settembre 2026, 22:38: sfondo della sezione Stanze prugna-corallo. È l’eccezione richiesta al fondo avorio del brandbook; non è un tema dark automatico.
- Google Drive, cartella Card Stanze: https://drive.google.com/drive/folders/1qqPss0vgmPeBEBUlUftJySR_f0agK30j

## Materiali e componenti

Prugna #2B0F2E, prugna paper #68354F, corallo #FF686B, corallo paper #DB8278, rosa #C47A87, avorio #F7F4EF, Ink #211C22, Muted #706671. Manrope. CTA prugna con testo bianco, controlli rialzati, bordi sottili e grana discreta; focus esplicito e stato premuto.

Il simbolo V visualizzato nell’app usa i pixel del logo originale estratto dal brandbook, con maschera SVG della sagoma. Il logotipo è testo Manrope. Il favicon mantiene la variante SVG semplificata.

Le otto PNG Drive restano inalterate. `material.js` ricompone le superfici tramite finestre SVG: angoli e bordi provengono dalle immagini originali, la carta interna da una porzione senza figure e la scena da una finestra separata. Il titolo impresso nella PNG non compare: titolo, descrizione e disponibilità sono HTML. Il bordo decorativo adattivo mantiene l’irregolarità entro le quote del manuale; l’area cliccabile resta regolare. È una ricostruzione responsive dai riferimenti raster, non una libreria originale di asset trasparenti.

Pulsanti, filtri, navigazione, pannelli, chip e controlli condividono livelli separati di superficie, grana, contorno e contenuto. I filtri sono avorio, con località corallo. La navigazione è avorio con tre destinazioni. La chiamata usa fondo prugna e due onde paper con nomi, colori e posizione stabili. I controlli includono microfono/muto, termina e opzioni.

Mappatura Drive → asset:
- (1) → agora.png
- (2) → sport.png
- (3) → anime.png
- (4) → cinema.png
- (5) → musica.png
- (6) → teatro.png
- (7) → cultura.png
- (8) → gaming.png

## Navigazione e flussi

Stanze · Chat · Profilo. Le connessioni restano raggiungibili dalla scheda Chat. Manteniamo preparazione, ricerca, conferma reciproca, chiamata di 3 minuti, continuazione, privacy e rivelazione. Le altre schermate usano avorio, salvo la chiamata immersiva prugna mostrata nelle tavole 5 e 19. Microfono muto: anche segno diagonale, oltre allo stato e alla label.

La natura dimostrativa dei dati e tutti i limiti del prototipo restano invariati. Il cambio di identità non attiva servizi reali.

## Verifica della revisione materica

Confrontate le tavole 2–5 e le schede di materiali, componenti, navigazione e categorie. Verificati Home a 320 e 390 px, filtri con errore persistente, ricerca, persona trovata, chiamata, opzioni, scelta reciproca, profilo e chat. Al 200% di testo la griglia passa a una colonna e i filtri a due colonne; nessuno scorrimento orizzontale nella Home a 390 px.

I test del pilota coprono annullamento, disponibilità, limite di 180 secondi, continuazione reciproca, promemoria e blocco. Non costituiscono una certificazione completa di accessibilità.
