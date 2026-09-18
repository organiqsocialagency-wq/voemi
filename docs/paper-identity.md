# Voemi Paper v2 — implementazione

## Riferimenti

- `Voemi_Brandbook_Paper_v2.pdf`, fornito nel contesto del progetto e trovato nei Download locali. Token e quote seguono le schede numeriche (pagine 9–19, 25–30).
- Screenshot del 17 settembre 2026, 22:38: sfondo della sezione Stanze prugna-corallo. È l’eccezione richiesta al fondo avorio del brandbook; non è un tema dark automatico.
- Google Drive, cartella Card Stanze: https://drive.google.com/drive/folders/1qqPss0vgmPeBEBUlUftJySR_f0agK30j

## Materiali e componenti

Prugna #2B0F2E, prugna paper #68354F, corallo #FF686B, corallo paper #DB8278, rosa #C47A87, avorio #F7F4EF, Ink #211C22, Muted #706671. Manrope. CTA prugna con testo bianco, controlli rialzati, bordi sottili e grana discreta; focus esplicito e stato premuto.

Il simbolo V è ricostruito in SVG sul riferimento del brandbook per uso a piccola scala: mantiene piega e proporzioni, semplificando la materia secondo le indicazioni del manuale. Non è un master vettoriale originale consegnato dal brand. Logotipo come testo nativo Manrope.

Le otto immagini Drive sono conservate senza modifiche in `dist/assets/paper/`. La finestra CSS mostra la scena e nasconde la scritta impressa nella tavola. Titolo, descrizione e disponibilità sono testo HTML accessibile; le card rimangono interamente cliccabili. Per una produzione finale, il brandbook prevede scene PNG trasparenti separate dalla superficie: le tavole attuali non lo sono.

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

Stanze · Chat · Profilo. Le connessioni restano raggiungibili dalla scheda Chat. Manteniamo preparazione, ricerca, conferma reciproca, chiamata di 3 minuti, continuazione, privacy e rivelazione. Le schermate fuori dalla home seguono il fondo avorio del brandbook. Microfono muto: anche segno diagonale, oltre allo stato e alla label.

La natura dimostrativa dei dati e tutti i limiti del prototipo restano invariati. Il cambio di identità non attiva servizi reali.
