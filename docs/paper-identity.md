## Revisione card e footer, 20 settembre 2026

- Agorà diventa Politica e Sociale in categorie, interessi e copy del pilota.
- Ogni card presenta il numero demo di ragazze/ragazzi/persone connesse secondo il filtro, seguito dai compatibili in attesa. Le stanze non disponibili riportano zero compatibili; la natura simulata resta visibile.
- Ogni tema usa grana e bordi della sua immagine originale in Card Stanze, con tinta applicata solo al livello della carta: terracotta, rosa cinema, lavanda musica, verde acqua sport, lilla anime, pergamena cultura, rosa teatro, salvia gaming. Gli originali restano inalterati.
- Le illustrazioni sono abbassate di 10 px.
- Sport usa `Voemi_Categoria_sport-v2.png`, variante ImageGen del PNG originale: figura destra maschile con T-shirt, sinistra femminile, composizione e palette conservate. Non è un nuovo originale del Drive.
- La selezione footer è un tassello di carta rettangolare con angoli morbidi, animato tra sezioni; nessun ovale o puntino.
- Verificati testi per Donne/Uomini e assenza di overflow a 320 px; test pilota superati.

---

## Aggiornamento: PNG originali da Drive, 20 settembre 2026

Le superfici ricostruite della precedente versione sono sostituite dai PNG originali della cartella Voemi / ICONE, senza ridisegnarne colori, grana o contorni.

- Fonte: https://drive.google.com/drive/folders/1eJzWFmpTF_dmPft0E8F1kq0yz-x_wzXp
- 8 categorie trasparenti: ciascuna nella propria stanza e nella relativa scheda dettaglio.
- 12 icone UI: navigazione, filtri, indietro/avanti, conferma, chiudi, microfono, muto, audio, altro e termina.
- 2 loghi: simbolo nell’intestazione e favicon; logo completo nell’onboarding.
- 7 superfici: carta fine/liscia/ruvida, pulsante prugna/avorio, navigazione e campi input.

Originali conservati in `dist/assets/drive/`. Il manifest registra dimensioni, finestra di visualizzazione e SHA-256 di ogni file. I PNG non sono stati modificati: le finestre SVG eliminano solo lo spazio trasparente esterno; per icone e scene si mantengono le proporzioni. Le superfici si adattano in nove porzioni, conservando i bordi e gli angoli originali. Testi e controlli rimangono elementi accessibili e interattivi.

Implementazione: `drive-assets.js` e `drive-assets.css`, caricati dopo gli strati precedenti. Il gradiente resta sullo sfondo home come richiesto.

Verifica: test pilota superati; controllo browser dei filtri, stanza Agorà, ricerca, persona trovata, chiamata, muto, opzioni audio e feedback finale. Nessun errore JavaScript osservato; nessuno sbordamento orizzontale a 320 px.

---

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
