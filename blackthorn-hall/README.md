# Motore Avventure — Documentazione

## File del progetto

| File | Contenuto | Da modificare per una nuova avventura? |
|---|---|---|
| `engine.js` | Logica generica (stato, condizioni, effetti, skill check, salvataggi) | **No, mai** |
| `audio.js` | Motore audio (beep UI, sfx nominati, musica a loop) | **No, mai** |
| `ui.js` | Interfaccia generica (schermate, modali) | No, a meno che serva un nuovo tipo di elemento UI |
| `validator.js` / `validator.html` | Validatore statico (nodi orfani, link rotti, ecc.) | **No, mai** — è uno strumento, non parte del gioco |
| `build.html` | Genera il file HTML singolo finale per la distribuzione | **No, mai** — è uno strumento, non parte del gioco |
| `index.html` | Struttura pagina + CSS a variabili | Di solito no |
| `theme.*.js` | Colori, font, titolo | **Sì — è la skin** |
| `story.*.js` | Nodi, testi, scelte, condizioni | **Sì — è la trama** |

Per creare una nuova avventura: copia `theme.default.js` → `theme.miotema.js`,
copia `story.sample.js` → `story.mianuovastoria.js`, cambia i due `<script src>`
in `index.html`. Non serve toccare motore o UI.

---

## Schema di una STORY

```js
const STORY = {
    meta: { id: "id-univoco", title: "Titolo", version: "1.0" },
    startNode: "intro",
    initialState: {
        flags: { hasChiave: false },
        stats: { forza: 1, agilita: 2, energia: 10 },
        inventory: []
    },
    nodes: {
        nomeNodo: {
            location: "TESTO IN ALTO",
            text: "Testo mostrato al giocatore.",
            art: "<svg viewBox='0 0 300 140' ...>...</svg>",  // opzionale
            onArrive: [ /* effetti eseguiti OGNI VOLTA che si entra nel nodo (flag, addLog, sfx: sicuri da ripetere) */ ],
            onArriveOnce: [ /* effetti eseguiti SOLO alla prima visita (stat, oggetti: evita l'accumulo rivisitando un nodo hub) */ ],
            options: [ /* array di scelte, vedi sotto */ ]
        }
    }
};
```

**Quando usare `onArriveOnce` invece di `onArrive`**: qualunque nodo che il giocatore può rivisitare più volte (un "hub" di esplorazione opzionale a cui si torna dopo ogni sotto-nodo, tipico di stanze con più cose da guardare) riesegue `onArrive` a ogni visita. Va bene per `setFlag` (idempotente), `addLog` (già protetto da duplicati) e `playSfx` (ripeterlo è innocuo, anzi piacevole). **Non va bene per `modifyStat`**: se lo lasci in `onArrive` su un nodo rivisitabile, il giocatore può accumulare indefinitamente statistiche solo cliccando avanti e indietro. Mettilo in `onArriveOnce`.

## Illustrazioni dei nodi (`art`, opzionale)

Ogni nodo può avere un campo `art` con markup SVG (o HTML) scritto a mano.
Se presente, viene mostrato in un riquadro sopra il testo; se assente, il
riquadro non occupa spazio — non serve gestire ogni nodo.

Regole pratiche:
- Usa `stroke="var(--color-main)"` invece di un colore fisso, così il disegno
  cambia automaticamente colore quando cambi tema.
- `fill="none"` + `stroke-width` per uno stile wireframe coerente con l'estetica
  terminale; puoi comunque usare `fill` pieno se un tema lo richiede.
- Tieni il `viewBox` con proporzioni larghe (es. `0 0 300 140`) — il riquadro
  ha un'altezza massima di 200px e scala in automatico.
- Zero immagini esterne: resta tutto dentro il file della storia, coerente
  con l'uso offline/self-contained.

## Condizioni (per `condition` di un'opzione)

```js
{ type: "flag", flag: "hasChiave", equals: true }   // equals default: true
{ type: "stat", stat: "forza", op: ">=", value: 3 }  // op: >= <= > < == !=
{ type: "item", item: "corda", quantity: 1 }

// Combinate:
{ all: [ cond1, cond2 ] }   // tutte vere
{ any: [ cond1, cond2 ] }   // almeno una vera
```

## Effetti (per `onArrive` di un nodo o `effects` di un'opzione)

```js
{ type: "setFlag", flag: "hasChiave", value: true }
{ type: "modifyStat", stat: "energia", delta: -5 }     // somma/sottrae
{ type: "setStat", stat: "energia", value: 10 }        // imposta
{ type: "addItem", id: "corda", name: "Corda", desc: "...", qty: 1 }
{ type: "removeItem", id: "corda", qty: 1 }
{ type: "addLog", title: "TITOLO", entry: "Testo del log." }
```

## Opzioni di un nodo

Scelta normale:
```js
{ text: "> Vai a nord", target: "nordNodo" }
```

Scelta con effetti prima di spostarsi:
```js
{ text: "> Prendi la chiave", target: "stanzaVuota", effects: [ { type:"addItem", id:"chiave", name:"Chiave" } ] }
```

Scelta condizionale (appare solo se la condizione è vera):
```js
{ text: "> Apri la porta", target: "dentro", condition: { type:"flag", flag:"hasChiave" } }
```

Skill check (tira 1d20 + valore della statistica, confrontato con la difficoltà):
```js
{
    text: "> Salta il burrone",
    skillCheck: { stat: "agilita", difficulty: 12, modifier: 0, success: "nodoOk", failure: "nodoMale" }
}
```

Nodo speciale per tornare al menu principale: `target: "__mainMenu__"`.

---

## Oggetti: osservare e combinare

Ogni oggetto aggiunto con `addItem` può avere due campi opzionali in più:
```js
{ type: "addItem", id: "lettera", name: "Lettera di Edmund", desc: "Poche righe frettolose.",
  examine: "Rileggendola con calma noti che l'inchiostro trema verso la fine...",  // testo esteso al click
  examineEffects: [ { type: "setFlag", flag: "noticed_tremor", value: true } ]     // solo alla prima osservazione
}
```
Se `examine` manca, cliccando l'oggetto si vede comunque `desc`. `examineEffects` scatta
una volta sola per partita (tracciato in `state.examinedItems`), utile per nascondere
un indizio che il giocatore trova solo se osserva con attenzione.

**Combinazioni**, dichiarate a livello di storia:
```js
combinations: [
    {
        items: ["meta_chiave_a", "meta_chiave_b"],   // ordine libero
        consumes: true,                               // default true: rimuove 1 di ciascuno
        result: { id: "chiave_intera", name: "Chiave intera", desc: "..." },  // opzionale
        effects: [ { type: "addLog", title: "...", entry: "..." } ],          // opzionale
        message: "Incastri le due metà: la chiave torna intera."
    }
]
```
Nell'inventario: primo click su un oggetto = lo osservi (e lo selezioni); un click su un
oggetto diverso tenta la combinazione; un secondo click sullo stesso oggetto lo deseleziona.
Se non esiste una combinazione per quella coppia, il gioco mostra semplicemente
"Non succede nulla di particolare." — nessun errore, nessun vicolo cieco.

## Aspetto: tema d'autore, variazioni per scena, preferenze del giocatore

Tre livelli distinti, da non confondere:

- **Tema d'autore** (`theme.*.js`) — l'identità visiva dell'avventura (colori, font, titolo). Fissa, decisa in fase di scrittura, uguale per tutti i giocatori.
- **Variazioni di tema per nodo/scena** — un nodo può dichiarare un campo `theme` che sovrascrive *solo i colori/font*, mai titolo o versione, sopra il tema base:
  ```js
  nomeNodo: { ..., theme: { colorMain: "#8b1e1e" } }   // vira sul rosso, il resto del tema resta invariato
  nomeNodo: { ..., theme: null }                         // torna al tema base
  nomeNodo: { ... }                                      // nessun campo 'theme': resta quello già attivo
  ```
  Stesso identico principio di `music`: si applica solo se il nodo dichiara il campo esplicitamente, e persiste finché un altro nodo non lo cambia. L'override può specificare solo le proprietà che vuole cambiare (es. solo `colorMain`) — le altre restano quelle del tema base.
- **Preferenze di visualizzazione** (generiche del motore) — luminosità e tonalità colore regolabili dal giocatore in Opzioni, tramite un filtro CSS (`brightness` + `hue-rotate`) applicato sopra l'intera UI, tema-override compresi. Non toccano i colori "veri", li regolano soltanto. A queste si aggiunge la **dimensione del testo della storia** (solo `#text-output`, non gli elementi di interfaccia): tre livelli — Piccola/Media/Grande (14/17/20px) — ciclabili con un pulsante. Tutto salvato in `localStorage` sotto una chiave fissa (`engine_display_prefs`), separata dai salvataggi di partita: valgono per il motore in generale, non per la singola storia. Il pulsante "Ripristina Impostazioni" in Opzioni riporta ai default *sia* queste preferenze *sia* quelle audio (musica/sfx/volumi) in un colpo solo.

Non serve toccare nulla per usare le preferenze di visualizzazione: sono già cablate in `index.html`/`ui.js` e funzionano con qualunque tema. Le variazioni per scena, invece, le decidi tu storia per storia nei singoli nodi.

## Audio (musica di sottofondo + effetti sonori)

### Musica di sottofondo per nodo/zona

Si definiscono le tracce a livello di storia, in due modi possibili:

**Sintetizzata** (nessun file, resta 100% self-contained):
```js
const STORY = {
    music: {
        forest: { wave: "triangle", volume: 0.025, notes: [ {freq:220, dur:0.6}, {freq:262, dur:0.6} ] }
    }
};
```

**File esterno** (.ogg, .mp3, qualunque formato supportato dal browser):
```js
const STORY = {
    music: {
        tema_principale: { src: "musiche/tema.ogg", volume: 0.5, loop: true }
    }
};
```
`src` accetta sia un percorso relativo (il file va distribuito insieme all'HTML,
niente più singolo-file-autosufficiente) sia una **data URI** (`"data:audio/ogg;base64,...`)
che invece mantiene tutto in un unico file — utile se vuoi restare offline/self-contained
ma con un brano vero invece che sintetizzato. Per file piccoli è la scelta più comoda;
per brani lunghi meglio il percorso relativo e distribuire la cartella insieme all'HTML.

In entrambi i casi, l'uso nei nodi è identico:
```js
nomeNodo: { ..., music: "forest" }         // avvia/continua questa traccia
nomeNodo: { ..., music: "tema_principale" } // funziona uguale sia per sintetizzata che file
nomeNodo: { ..., music: null }              // ferma la musica
nomeNodo: { ... }                           // nessun campo 'music': continua quella già in corso
```
Se il nodo successivo dichiara la stessa traccia già attiva, non riparte da capo —
utile per non far "scattare" la musica passando tra nodi della stessa zona.
Il motore gestisce da solo il passaggio tra i due tipi (es. da una traccia sintetizzata
a un file e viceversa): ferma sempre quella precedente prima di avviare la nuova.
`wave` (solo sintetizzate) accetta i tipi standard dell'oscillatore Web Audio:
`sine`, `square`, `triangle`, `sawtooth`.

### Effetti sonori nominati

Si definiscono in `story.sfx` come sequenze brevi (non in loop):
```js
sfx: {
    oggetto: [ {freq:660, dur:0.06}, {freq:880, dur:0.1} ],
    impatto: [ {freq:150, dur:0.12, type:"sawtooth"}, {freq:90, dur:0.18, type:"sawtooth"} ]
}
```
Si attivano come un effetto qualunque, in `onArrive` o nelle `effects` di un'opzione:
```js
{ type: "playSfx", sfx: "oggetto" }
```

## Validatore della storia (`validator.html`)

Controllo statico, senza giocare: apri `validator.html` nel browser (punta al
file `story.*.js` che vuoi controllare, stesso principio di `index.html` —
cambia lo `<script src>` in fondo al file) e ottieni un report con:

- **Errori** (da correggere): `target` di un'opzione o di uno `skillCheck`
  che non esiste, riferimenti a musica (`music`) o effetti sonori (`playSfx`)
  non definiti in `story.music`/`story.sfx`, opzioni senza `target` né `skillCheck`.
- **Avvisi** (da controllare, non sempre un problema): condizioni su flag/stat
  mai dichiarati in `initialState`, nodi senza opzioni (vicoli ciechi — spesso
  sono finali voluti), nodi mai raggiunti da nessuna opzione (nodi orfani).

Non serve includerlo in `index.html`: è uno strumento separato, solo per te
in fase di scrittura.

## Build del file singolo (`build.html`)

Per la distribuzione finale, tutti i tuoi altri progetti sono un unico file HTML
offline — questo tool fa lo stesso con un'avventura scritta con questo motore,
senza terminale/Node: tutto nel browser.

1. Apri `build.html`
2. Seleziona la cartella del progetto (il pulsante chiede la cartella, non i
   singoli file — il browser legge `engine.js`, `audio.js`, `ui.js`, `index.html`
   e tutti i `theme.*.js`/`story.*.js` che trova)
3. Scegli quale tema e quale storia impacchettare (utile se nella cartella
   tieni più avventure insieme, come in questo progetto)
4. "Genera file singolo" — scarica un unico `.html` con tutto incluso, pronto
   da distribuire o aprire offline

Il tool sostituisce ogni `<script src="...">` con il contenuto vero e proprio,
in base al nome del file referenziato — funziona con qualunque copia di
`index.html` come base (anche `index.echoes-of-trinity.html`), quindi non serve
mantenerne una "pulita" apposta.

## Saghe multi-atto: un solo file, non più file separati per atto

**Architettura rivista.** La prima versione di questa idea usava `meta.series` +
un effetto `carryOverState` per trasferire lo stato tra file storia diversi via
`localStorage`. **Abbandonata**: apparte il fatto che lasciava scegliere al
giocatore "da che atto iniziare" (sbagliato — un'avventura a episodi si gioca
in sessione continua), il trasferimento via `localStorage` tra file `.html`
diversi non è affidabile aprendo file locali (`file://`) — Chrome tratta ogni
file come un'origine a sé, quindi lo stato semplicemente non passerebbe da un
atto all'altro nel browser reale.

**Soluzione**: un solo `story.js` con **tutti** gli atti dentro, come nodi
dello stesso oggetto `STORY`. Nessun trasferimento di stato necessario — è
la stessa sessione JavaScript dall'inizio alla fine. L'ultimo nodo di un atto
punta direttamente al primo nodo dell'atto successivo, come una scelta
qualunque:
```js
nodoFinaleAtto1: {
    ...,
    options: [ { text: "> Fine dell'Atto I — prosegui", target: "atto2_nodoIniziale" } ]
}
```
Per evitare collisioni di nome tra atti scritti in momenti diversi, ogni
identificatore (nodi, tracce musicali, sfx) è prefissato per atto
(`act1_`, `act2_`, ...) — puramente convenzionale, il motore non gli
attribuisce alcun significato speciale.

**Attenzione a non confondere questo con i finali veri**: un game over o un
finale di un singolo atto continua a puntare a `__mainMenu__` come sempre —
solo il nodo di chiusura "positiva" di un atto punta al successivo. Scrivendo
un nuovo atto per una saga esistente, aggiungi i suoi nodi direttamente allo
stesso file storia — non crearne uno separato.

*(L'effetto `carryOverState` e `meta.series` restano nel motore per
compatibilità, ma questo progetto non li usa più. Se non ti serve mai questo
scenario — file storia genuinamente separati con trasferimento di stato —
si può anche rimuoverli dal motore: fammi sapere.)*

## Cosa fa già il motore (v1.0 - questo scheletro)

- Flags booleani, statistiche numeriche, inventario con quantità
- Condizioni singole o combinate (AND/OR) su flag, stat, oggetti
- Skill check con tiro casuale + statistica vs difficoltà
- Salvataggi su 10 slot, namespaced per storia (niente collisioni tra avventure diverse)
- Tema completamente separato dal motore (variabili CSS)
- Illustrazioni SVG opzionali per nodo (`art`)
- Musica di sottofondo a loop per zona/nodo (sintetizzata o file esterno .ogg/.mp3) + effetti sonori nominati sintetizzati

## Cosa manca ancora (prossimi step del progetto)

Il piano iniziale (validatore, migrazione di prova, build) è completo. Ora in corso: **Nebbie su Blackthorn Hall**, avventura gotica in 5 atti.

- ✅ **Atto I — La Lettera** — 39 nodi
- ✅ **Atto II — Le Ombre del Mattino** — 29 nodi
- ✅ **Atto III — Il Cuore della Casa** — 16 nodi
- ✅ **Atto IV — La Notte della Tempesta** — 14 nodi
- ✅ **Atto V — L'Alba** — 8 nodi, 5 finali diversi
- **Saga completa**: tutti uniti in un solo file, `story.blackthorn-hall.js` (106 nodi, 32 tracce musicali, 30 sfx, ~34 minuti di sola lettura sull'intera storia), giocabile da `index.blackthorn-hall.html` in un'unica sessione continua dalla prima lettera all'alba finale
- ⏳ Atti III, IV, V — da scrivere
