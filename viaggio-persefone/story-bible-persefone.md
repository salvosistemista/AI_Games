# "L'Ultimo Viaggio del Persefone" — Story Bible

Baleniera artica, 1887. Gotico marittimo in 5 atti, stesso motore/formato di
Blackthorn Hall (un solo `story.persefone.js`, prefissi `act1_`...`act5_`).

## Premessa

Un anno fa la baleniera *Persefone* tornò in porto senza il carpentiere di
bordo, **Edwin Vane**, dato per disperso in mare durante una tempesta al largo
della banchisa. Il fratello minore, **Rebecca Vane** (protagonista), non ha mai
creduto alla versione ufficiale: il diario di bordo consegnato alla famiglia
ha pagine strappate. Si imbarca sulla stessa nave, stesso capitano, stessa
rotta — ufficialmente come cuoca di riserva, in realtà per scoprire cosa è
successo davvero.

Statistica chiave: **lucidità** (0-10, parte da 7) — scende con l'isolamento,
il ghiaccio, le rivelazioni più dure; troppo bassa altera cosa la protagonista
crede di vedere e chiude alcuni finali migliori. `forza` e `agilità` per i
check fisici di bordo (arrampicarsi sul sartiame, reggere il timone in
tempesta).

## Personaggi principali (spessore vero, non funzionale)

- **Capitano Ezra Kessler** — freddo, meticoloso, porta il peso di una
  decisione presa un anno fa che non ha mai confessato a nessuno
  dell'equipaggio. Non è un villain piatto: crede di aver salvato la nave.
  Ha dialoghi propri in almeno 4 nodi diversi, non solo nel confronto finale.
- **Aldous Finch**, primo ufficiale — il vero cuore morale della nave, diviso
  tra lealtà al capitano e disagio crescente. Personaggio-chiave per gli
  alleati: si fida di Rebecca solo se lei si è confidata con lui presto.
- **Dr. Miriam Salt**, medico di bordo — sa più di quanto dice, protegge un
  segreto medico (non è successo un naufragio: è successa un'epidemia a
  bordo, insabbiata). Personaggio da "corteggiare" con domande giuste.
- **Silas Crane**, arpioniere — superstizioso, convinto che qualcosa nel
  ghiaccio abbia "voluto" Edwin. Fornisce la lettura soprannaturale della
  storia, poi smentita (o solo in parte) dalla verità umana.
- **Peter**, mozzo tredicenne — l'unico che ha visto qualcosa quella notte e
  non ne ha mai parlato con nessuno, per paura. Il suo arco dipende
  interamente da come lo tratta Rebecca nell'Atto I.
- **Old Ove**, cuoco — sollievo comico ma non decorativo: è la memoria
  informale della nave, sa i pettegolezzi che nessun ufficiale direbbe.

## Layout esplorabile (niente corridoi obbligati)

Ponte principale, castello di prua, alloggi ufficiali, alloggi equipaggio,
cambusa, infermeria, stiva (chiusa a chiave fino all'Atto III), coffa (albero
maestro). Dall'Atto III, quando la nave resta bloccata nel ghiaccio, si
aggiunge l'accampamento sul pack. Il ponte principale è l'hub: da lì si
raggiungono quasi tutte le altre aree, così il giocatore sceglie dove andare
e in che ordine, non segue un binario.

## I 5 atti

**Atto I — L'Imbarco** (~35 nodi). Rebecca sale a bordo a Whitmoor, si
presenta all'equipaggio. Qui si piantano i semi che raccolgono negli atti
successivi: come tratta Peter (gentile/sbrigativa → flag `peter_trust`),
se si confida con Finch sul vero motivo dell'imbarco (flag `finch_ally`), se
osserva con attenzione la cabina che fu di Edwin prima che venga svuotata
(`examineEffects` → flag `noticed_torn_page`, che nell'Atto III sblocca una
domanda in più al capitano invece di dover tirare a indovinare).

**Atto II — Il Mare Aperto** (~28 nodi). Vita di bordo, tempesta, la nave che
si avvicina alla banchisa dove sparì Edwin. Primi segnali che qualcosa non
torna nei registri. Oggetti da combinare: due metà di una pagina di diario
strappata (una trovata osservando la cabina di Edwin, l'altra rubata/scoperta
nell'ufficio del capitano se Rebecca ci si intrufola). Un dialogo profondo
con la dott.ssa Salt si apre solo se Rebecca ha già raccolto un indizio
medico altrove (febbre di un marinaio, menzionata di sfuggita da Old Ove).

**Atto III — Nella Banchisa** (~16 nodi, il colpo di scena centrale, come
"Fiducia" in Blackthorn Hall Atto III). La nave resta incastrata nel ghiaccio.
Si apre la stiva: non un naufragio, non un mostro — un'epidemia insabbiata
un anno fa, con Edwin messo in quarantena forzata e mai più tornato a galla
nei registri ufficiali per non far chiudere la rotta commerciale alla nave.
Se Rebecca ha il flag `noticed_torn_page`, può mettere Kessler alle strette
con una domanda specifica invece che generica — la scena cambia testo, non
solo esito.

**Atto IV — La Notte del Ghiaccio** (~14 nodi). Conflitto aperto:
l'equipaggio si spacca tra chi copre Kessler e chi no. Scelte pericolose con
conseguenze reali (non semplici game over): se `finch_ally` è vero, Finch
prende posizione al fianco di Rebecca in un momento cruciale; se
`peter_trust` è vero, Peter rivela solo ora cosa vide quella notte, altrimenti
tace per paura fino alla fine.

**Atto V — Il Disgelo** (~8 nodi, 4-5 finali). I finali dipendono dai flag
accumulati dall'Atto I in poi, non solo dalle ultime scelte:
1. *Redenzione* — Edwin trovato vivo (sopravvissuto isolato sul pack),
   verità esposta, equipaggio compatto: richiede `finch_ally` + `peter_trust`.
2. *Il Prezzo del Silenzio* — verità insabbiata di nuovo, Rebecca torna con
   Edwin ma il segreto resta segreto, finale moralmente grigio.
3. *Sola* — Edwin non si trova, Rebecca torna da sola, cambiata.
4. *Naufragio dei Nervi* — se `lucidità` scende sotto una soglia, finale
   allucinato/ambiguo: non è mai chiaro cosa fosse reale.
5. *Ammutinamento* — se Rebecca si schiera con la fazione più dura contro
   Kessler nell'Atto IV, finale cupo, la nave non torna la stessa.

## Applicazione dei 5 principi appena aggiunti al README

- Osservazione: mai un oggetto annunciato ("nella cabina c'è un diario"),
  solo porte/stanze menzionate; l'oggetto emerge osservando.
- Interazione: la pagina di diario combinata è obbligatoria per uno dei nodi
  chiave dell'Atto III, non solo per un log di sapore.
- Personaggi: Kessler, Finch, Salt, Crane, Peter, Old Ove hanno tutti almeno
  un dialogo autonomo non legato a una singola richiesta di oggetto.
- Movimento: hub sul ponte principale, 6+ aree raggiungibili liberamente.
- Non-linearità: `peter_trust`, `finch_ally`, `noticed_torn_page` nascono
  nell'Atto I e determinano testo/esiti fino all'Atto V.

## Prossimo passo

Se vuoi procedo a scrivere `story.persefone.js` vero e proprio — posso
partire dall'Atto I completo (nodi, testi, art SVG, condizioni) e poi
proseguire atto per atto, con lo stesso ritmo usato per Blackthorn Hall.
