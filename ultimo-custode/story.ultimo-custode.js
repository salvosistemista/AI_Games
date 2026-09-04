/* ============================================================
   L'ULTIMO CUSTODE
   ------------------------------------------------------------
   Storia originale in 5 atti (avventura archeologica), scritta
   per il "Motore Avventure". Personaggi, luoghi, ordine segreto
   e manoscritto sono invenzioni originali; la leggenda del
   Graal e dei Templari in Scozia appartiene alla mitologia e
   alla storia di dominio pubblico, non a opere terze.
   5 atti in un solo file (act1_.../act5_...), sessione continua.
   ============================================================ */

const STORY = {
    meta: { id: "ultimo-custode", title: "L'ULTIMO CUSTODE", version: "1.0" },
    startNode: "act1_intro",

    initialState: {
        flags: {
            sceneAnalizzata: false, liviaConsultata: false, guardianoInterrogato: false,
            bruniIncontrato: false, codiceRicostruito: false, indizioGuantoTrovato: false,

            metElif: false, cisternaEsplorata: false, orsoliniIncontrato: false,
            guidoIncontrato: false, guidoFiducia: false, cifraBizantinaDecifrata: false,

            custodeIncontrato: false, roviniEsplorati: false, confrontoOrsolini2: false,
            ordineStoriaAppresa: false,

            cappellaRaggiunta: false, criptaEsplorata: false, medaglioneCombinato: false,
            orsoliniConfrontoFinale: false, guidoRedento: false, mappaOttenuta: false,
            identitaHalvardIntuita: false,

            isolaRaggiunta: false, halvardConfrontato: false
        },
        stats: { cultura: 3, agilita: 2, intuito: 2 },
        inventory: []
    },

    music: {
        tema_serranova: { wave: "sine", volume: 0.02, notes: [
            { freq: 262, dur: 0.6 }, { freq: 294, dur: 0.6 }, { freq: 247, dur: 0.6 }
        ]},
        tema_istanbul: { wave: "triangle", volume: 0.02, notes: [
            { freq: 233, dur: 0.5 }, { freq: 277, dur: 0.4 }, { freq: 220, dur: 0.7 }
        ]},
        tema_gerusalemme: { wave: "sine", volume: 0.02, notes: [
            { freq: 196, dur: 0.6 }, { freq: 220, dur: 0.5 }, { freq: 233, dur: 0.7 }
        ]},
        tema_scozia: { wave: "triangle", volume: 0.018, notes: [
            { freq: 174, dur: 0.8 }, { freq: 164, dur: 0.6 }, { freq: 146, dur: 0.9 }
        ]},
        tema_isola: { wave: "sine", volume: 0.018, notes: [
            { freq: 220, dur: 0.9 }, { freq: 165, dur: 0.9 }
        ]},
        tema_tensione: { wave: "sawtooth", volume: 0.015, notes: [
            { freq: 110, dur: 0.5 }, { freq: 116, dur: 0.5 }, { freq: 98, dur: 0.7 }
        ]},
        tema_finale_vittoria: { wave: "triangle", volume: 0.025, notes: [
            { freq: 392, dur: 0.4 }, { freq: 440, dur: 0.4 }, { freq: 523, dur: 0.6 }
        ]},
        tema_finale_amaro: { wave: "sine", volume: 0.015, notes: [
            { freq: 220, dur: 0.7 }, { freq: 196, dur: 1.0 }
        ]}
    },

    sfx: {
        oggetto: [ { freq: 660, dur: 0.06 }, { freq: 880, dur: 0.1 } ],
        impatto: [ { freq: 150, dur: 0.12, type: "sawtooth" }, { freq: 90, dur: 0.18, type: "sawtooth" } ],
        rivelazione: [ { freq: 523, dur: 0.08 }, { freq: 659, dur: 0.08 }, { freq: 784, dur: 0.14 } ]
    },

    nodes: {

        /* ================= ATTO I — IL FURTO (SERRANOVA) ================= */

        act1_intro: {
            location: "APPARTAMENTO DEL PROFESSOR CONTARINI, SERRANOVA",
            music: "tema_serranova",
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--color-main)" stroke-width="2">
                <rect x="60" y="30" width="100" height="80"/>
                <line x1="70" y1="45" x2="150" y2="45"/>
                <line x1="70" y1="60" x2="150" y2="60"/>
                <line x1="70" y1="75" x2="120" y2="75"/>
                <circle cx="220" cy="70" r="30"/>
                <line x1="220" y1="70" x2="235" y2="60"/>
                <line x1="220" y1="70" x2="220" y2="45"/>
            </svg>`,
            text: `Sono le tre del mattino quando il telefono squilla nell'appartamento del professor Elia Contarini. È il custode notturno del museo dell'Ateneo, la voce rotta dallo spavento: qualcuno ha tentato di forzare la sala dei manoscritti. Elia non si ferma nemmeno a cambiarsi la vestaglia sotto il cappotto.`,
            options: [ { text: "> Corri al museo", target: "act1_museo_ingresso" } ]
        },

        act1_museo_ingresso: {
            location: "MUSEO DELL'ATENEO DI SERRANOVA — INGRESSO",
            onArriveOnce: [
                { type: "addLog", title: "Il Furto al Museo", entry: "Qualcuno ha forzato l'ingresso notturno del museo per raggiungere la sala dei manoscritti. Il custode è ferito ma vivo." }
            ],
            text: `Nastri della polizia sbarrano l'ingresso principale. Livia Sordi, la sua giovane assistente, lo aspetta sui gradini, pallida ma composta. "Elia. È il Codice," dice soltanto, e non serve altro per fargli capire di cosa si tratti.`,
            options: [ { text: "> Entra nella sala dei manoscritti", target: "act1_sala_manoscritti" } ]
        },

        act1_sala_manoscritti: {
            location: "SALA DEI MANOSCRITTI",
            text: `La sala è sottosopra: una teca è forzata, i riflettori proiettano ombre nervose sulle vetrine vuote. Il Codice di Fra Bonifacio — un manoscritto duecentesco che Elia studia da vent'anni — non è del tutto scomparso: qualcuno è stato interrotto prima di finire il lavoro.`,
            options: [
                { text: "> Esamina la teca forzata", target: "act1_teca", condition: { type: "flag", flag: "sceneAnalizzata", equals: false } },
                { text: "> Torna a esaminare la teca", target: "act1_teca_again", condition: { type: "flag", flag: "sceneAnalizzata", equals: true } },
                { text: "> Parla con Livia Sordi", target: "act1_livia", condition: { type: "flag", flag: "liviaConsultata", equals: false } },
                { text: "> Parla ancora con Livia", target: "act1_livia_again", condition: { type: "flag", flag: "liviaConsultata", equals: true } },
                { text: "> Interroga il custode notturno ferito", target: "act1_guardiano", condition: { type: "flag", flag: "guardianoInterrogato", equals: false } },
                { text: "> Torna dal custode", target: "act1_guardiano_again", condition: { type: "flag", flag: "guardianoInterrogato", equals: true } },
                { text: "> Vai in città dall'antiquario Adamo Bruni", target: "act1_antiquario", condition: { type: "flag", flag: "bruniIncontrato", equals: false } },
                { text: "> Torna dall'antiquario Bruni", target: "act1_antiquario_again", condition: { type: "flag", flag: "bruniIncontrato", equals: true } },
                { text: "> Studia le pagine superstiti del Codice insieme a Livia", target: "act1_decifra", condition: { all: [ { type: "item", item: "pagine_codice", quantity: 1 }, { type: "flag", flag: "codiceRicostruito", equals: false } ] } },
                { text: "> Fine dell'Atto I — si parte per Istanbul", target: "act2_intro", condition: { type: "flag", flag: "codiceRicostruito", equals: true } }
            ]
        },

        act1_teca: {
            location: "SALA DEI MANOSCRITTI — LA TECA FORZATA",
            onArriveOnce: [
                { type: "setFlag", flag: "sceneAnalizzata", value: true },
                { type: "modifyStat", stat: "intuito", delta: 1 },
                { type: "addItem", id: "pagine_codice", name: "Pagine Superstiti del Codice", desc: "Alcuni fogli del Codice di Fra Bonifacio, rimasti nella teca forzata.", examine: "Pergamena duecentesca, scrittura mista di latino e volgare. Servirà tempo, e Livia, per tradurla per intero. In un margine, quasi cancellato dal tempo, uno scarabocchio ripetuto tre volte, come per non dimenticarlo: un calice tra due mezzelune spezzate." },
                { type: "addItem", id: "guanto_gemello", name: "Gemello Monogrammato", desc: "Un gemello da polsino d'argento, perso nella fuga, inciso con due iniziali.", examine: "Le iniziali incise sono 'R. H.' Un lavoro d'oreficeria costoso — non da semplice scassinatore.", examineEffects: [ { type: "setFlag", flag: "indizioGuantoTrovato", value: true }, { type: "addLog", title: "Le Iniziali R. H.", entry: "Un gemello d'argento perso dal ladro reca le iniziali 'R. H.' Non un nome, ancora, ma un indizio concreto." } ] },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `La teca è stata aperta con attrezzi da professionista, non forzata con la violenza che ci si aspetterebbe. Tra i vetri infranti, Elia raccoglie alcune pagine del Codice rimaste indietro — e, incastrato in una fessura del legno, un piccolo gemello da polsino d'argento.`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },
        act1_teca_again: {
            location: "SALA DEI MANOSCRITTI — LA TECA FORZATA",
            text: `La teca vuota resta lì, come un dente mancante. Non c'è altro da notare, ormai: ciò che serve è già nelle tue mani o nella memoria di qualcuno.`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },

        act1_livia: {
            location: "SALA DEI MANOSCRITTI — CON LIVIA",
            onArriveOnce: [
                { type: "setFlag", flag: "liviaConsultata", value: true },
                { type: "addLog", title: "Livia Sordi", entry: "Assistente di Elia, paleografa promettente. Ricorda che Fra Bonifacio scrisse il Codice per conto di un ordine dimenticato, i 'Custodi del Calice Bianco' — lo stesso ordine su cui Elia costruì, anni fa, una teoria che gli costò la reputazione accademica." }
            ],
            text: `"Fra Bonifacio da Serranova," dice Livia, la voce ancora tesa. "Il monaco che scrisse del Calice Bianco. La stessa storia per cui ti hanno riso in faccia al convegno di dieci anni fa, ricordi?" Elia annuisce, lo sguardo fisso sulla teca vuota. Forse qualcuno, quella sera, non stava ridendo affatto.`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },
        act1_livia_again: {
            location: "SALA DEI MANOSCRITTI — CON LIVIA",
            text: `Livia è già china sui frammenti di pergamena, una lente in mano, pronta a mettersi al lavoro non appena Elia glielo chiederà.`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },

        act1_guardiano: {
            location: "CORRIDOIO — CON IL CUSTODE FERITO",
            onArriveOnce: [
                { type: "setFlag", flag: "guardianoInterrogato", value: true },
                { type: "addLog", title: "La Testimonianza del Custode", entry: "Il custode ricorda un uomo alto, un accento straniero indefinibile, movimenti da professionista — 'come chi questo lavoro l'ha già fatto molte altre volte'." }
            ],
            text: `Il custode siede su una barella, una fasciatura alla tempia. "Un uomo alto," mormora. "Accento straniero, non saprei dire quale. Si muoveva come chi... come chi l'ha già fatto tante volte, professore. Mi ha steso senza nemmeno guardarmi in faccia."`,
            options: [
                { text: "> Chiedigli di sforzarsi a ricordare un dettaglio in più", skillCheck: { stat: "intuito", difficulty: 11, modifier: 0, success: "act1_guardiano_dettaglio", failure: "act1_guardiano_dettaglio_no" } },
                { text: "> Torna nella sala", target: "act1_sala_manoscritti" }
            ]
        },
        act1_guardiano_again: {
            location: "CORRIDOIO — CON IL CUSTODE FERITO",
            text: `Il custode ti sorride debolmente, ma scuote la testa: non ha altro da aggiungere, per ora.`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },
        act1_guardiano_dettaglio: {
            location: "CORRIDOIO — UN DETTAGLIO IN PIÙ",
            onArriveOnce: [
                { type: "addLog", title: "Un Anello Sigillato", entry: "Il custode, sotto insistenza gentile, ricorda un anello con sigillo alla mano destra dell'aggressore: uno stemma che non aveva mai visto prima, qualcosa come una torre e una corona." }
            ],
            text: `Il custode chiude gli occhi, si concentra. "Un anello," dice piano. "Alla mano destra. Un sigillo — una torre, forse, sormontata da una corona. L'ho visto solo un istante, mentre mi copriva la bocca."`,
            options: [ { text: "> Torna nella sala", target: "act1_sala_manoscritti" } ]
        },
        act1_guardiano_dettaglio_no: {
            location: "CORRIDOIO — CON IL CUSTODE FERITO",
            text: `Il custode si porta una mano alla tempia, il viso contratto dal dolore. "Mi dispiace, professore. È tutto confuso." Forse, con un po' più di calma, tornerà a ricordare qualcosa.`,
            options: [
                { text: "> Riprova, con più pazienza", skillCheck: { stat: "intuito", difficulty: 11, modifier: 0, success: "act1_guardiano_dettaglio", failure: "act1_guardiano_dettaglio_no" } },
                { text: "> Torna nella sala", target: "act1_sala_manoscritti" }
            ]
        },

        act1_antiquario: {
            location: "BOTTEGA DELL'ANTIQUARIO BRUNI",
            onArriveOnce: [
                { type: "setFlag", flag: "bruniIncontrato", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "Adamo Bruni", entry: "Antiquario cittadino, aveva già ricevuto un'offerta per il Codice un mese fa da un misterioso committente europeo. Lascia intendere che qualcuno vicino a Elia sapesse del suo interesse — senza fare nomi." }
            ],
            text: `Adamo Bruni ti riceve tra scaffali polverosi, poco sorpreso della visita. "Un mese fa," ammette, "un conte — poche parole, accento del nord Europa — mi ha chiesto se potevo procurargli il vostro Codice. Ho rifiutato, ovviamente." Poi, abbassando la voce: "Ma sapeva cose che solo chi vi è vicino potrebbe sapere, professore. Riflettici."`,
            options: [ { text: "> Torna al museo", target: "act1_sala_manoscritti" } ]
        },
        act1_antiquario_again: {
            location: "BOTTEGA DELL'ANTIQUARIO BRUNI",
            text: `Bruni scuote la testa: non ha altro da aggiungere, e visibilmente preferirebbe non essere coinvolto oltre.`,
            options: [ { text: "> Torna al museo", target: "act1_sala_manoscritti" } ]
        },

        act1_decifra: {
            location: "SALA DEI MANOSCRITTI — NOTTE FONDA",
            onArriveOnce: [
                { type: "setFlag", flag: "codiceRicostruito", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "Il Primo Indizio", entry: "Le pagine superstiti parlano dei 'Custodi del Calice Bianco' e di una 'cisterna sotto la città dei due mari' — un chiaro riferimento a Istanbul, ponte tra Europa e Asia." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Elia e Livia lavorano fino all'alba, china sui frammenti superstiti. Tra le righe di Fra Bonifacio emerge un nome, "Custodi del Calice Bianco", e un luogo cifrato: "la cisterna sotto la città dei due mari". Non c'è dubbio: è Istanbul, ponte tra due continenti e due mari, a dover essere la prossima tappa.`,
            options: [ { text: "> Fine dell'Atto I — si parte per Istanbul", target: "act2_intro" } ]
        },

        /* ================= ATTO II — ISTANBUL: L'OMBRA DI BISANZIO ================= */

        act2_intro: {
            location: "ISTANBUL — PRIMO GIORNO",
            music: "tema_istanbul",
            text: `Istanbul accoglie Elia e Livia con il richiamo dei gabbiani sul Bosforo e il profumo di spezie che sale dai bazar. Da qualche parte, sotto le strade del quartiere storico, si nasconde una cisterna bizantina di cui pochi ricordano ancora il nome esatto: la Cisterna di Teodora.`,
            options: [ { text: "> Raggiungi il quartiere storico", target: "act2_piazza" } ]
        },

        act2_piazza: {
            location: "ISTANBUL — QUARTIERE STORICO",
            text: `Vicoli di pietra levigata dai secoli, moschee e chiese che si susseguono senza soluzione di continuità. Da qui puoi cercare aiuto tra i vecchi contatti di Elia, o scendere direttamente nella cisterna.`,
            options: [
                { text: "> Cerca la professoressa Elif Kaya, storica bizantina", target: "act2_elif", condition: { type: "flag", flag: "metElif", equals: false } },
                { text: "> Torna da Elif Kaya", target: "act2_elif_again", condition: { type: "flag", flag: "metElif", equals: true } },
                { text: "> Scendi nella Cisterna di Teodora", target: "act2_cisterna", condition: { type: "flag", flag: "cisternaEsplorata", equals: false } },
                { text: "> Ripensa a quanto accaduto nella cisterna", target: "act2_cisterna_again", condition: { type: "flag", flag: "cisternaEsplorata", equals: true } },
                { text: "> Cerca notizie di tuo fratello Guido", target: "act2_guido", condition: { type: "flag", flag: "guidoIncontrato", equals: false } },
                { text: "> Torna da Guido", target: "act2_guido_again", condition: { type: "flag", flag: "guidoIncontrato", equals: true } },
                { text: "> Studia l'iscrizione del medaglione insieme a Elif", target: "act2_decifra", condition: { all: [ { type: "flag", flag: "cisternaEsplorata", equals: true }, { type: "flag", flag: "metElif", equals: true }, { type: "flag", flag: "cifraBizantinaDecifrata", equals: false } ] } },
                { text: "> Fine dell'Atto II — si parte per Gerusalemme", target: "act3_intro", condition: { type: "flag", flag: "cifraBizantinaDecifrata", equals: true } }
            ]
        },

        act2_elif: {
            location: "ISTANBUL — CON LA PROF.SSA ELIF KAYA",
            onArriveOnce: [
                { type: "setFlag", flag: "metElif", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "Elif Kaya", entry: "Storica bizantina, vecchia amica di Elia. Accetta di aiutarlo a identificare la cisterna e a tradurre le iscrizioni, ma avverte: 'Altri stranieri sono passati di qui, ultimamente, a fare le stesse domande'." }
            ],
            text: `Elif Kaya lo accoglie con un abbraccio sincero. "Elia Contarini, dopo tutti questi anni." Quando le spiega il motivo della visita, il suo sorriso si spegne appena. "La Cisterna di Teodora. Sì, la conosco. Ma faccia attenzione: altri stranieri sono passati di qui, di recente, a fare domande molto simili alle sue."`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_elif_again: {
            location: "ISTANBUL — CON LA PROF.SSA ELIF KAYA",
            text: `Elif prepara già i suoi appunti sull'alfabeto bizantino, pronta a tornare utile non appena servirà davvero.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },

        act2_guido: {
            location: "ISTANBUL — UN VICOLO DEL BAZAR",
            onArriveOnce: [
                { type: "setFlag", flag: "guidoIncontrato", value: true },
                { type: "addLog", title: "Guido Contarini", entry: "Fratello minore di Elia, da anni ai margini del mercato nero di antichità. Ammette di aver parlato, senza pensarci troppo, dell'interesse di Elia per il Codice con la persona sbagliata. Offre il suo aiuto per rintracciare l'acquirente misterioso." }
            ],
            text: `Lo trovi tra le bancarelle, come se ti stesse aspettando — probabilmente è così. "Elia," dice Guido, senza il minimo imbarazzo. "Ho sentito del furto." Un lungo silenzio, poi: "Potrei aver parlato del tuo Codice con la persona sbagliata, qualche mese fa. Non sapevo cosa ne avrebbe fatto. Lasciami rimediare — conosco gente che può portarci dritti a lui."`,
            options: [
                { text: "> Scegli di fidarti di Guido", target: "act2_guido_fiducia" },
                { text: "> Diffida di lui e rifiuta il suo aiuto", target: "act2_guido_diffidenza" }
            ]
        },
        act2_guido_again: {
            location: "ISTANBUL — UN VICOLO DEL BAZAR",
            text: `Guido resta sullo sfondo, in disparte tra le bancarelle, in attesa di vedere cosa deciderai di fare della sua offerta.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_guido_fiducia: {
            location: "ISTANBUL — UN VICOLO DEL BAZAR",
            onArriveOnce: [
                { type: "setFlag", flag: "guidoFiducia", value: true },
                { type: "addLog", title: "Una Scelta di Fiducia", entry: "Elia decide di fidarsi ancora di suo fratello, nonostante tutto. Guido promette di seguirli da lontano, pronto a intervenire se le cose si mettessero male." }
            ],
            text: `"Va bene," dice Elia, sorprendendo se stesso per primo. "Ma non deludermi ancora." Guido annuisce, sul serio per una volta. "Vi seguirò da lontano. Se le cose si mettono male, ci sarò."`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_guido_diffidenza: {
            location: "ISTANBUL — UN VICOLO DEL BAZAR",
            onArriveOnce: [
                { type: "addLog", title: "Una Scelta di Diffidenza", entry: "Elia rifiuta l'aiuto del fratello, stanco delle sue mezze verità. Guido si allontana senza insistere, ma non troppo lontano." }
            ],
            text: `"Ho già dato fiducia alle tue mezze verità troppe volte," dice Elia, freddo. Guido non insiste, si limita ad annuire e a sparire tra la folla del bazar — ma qualcosa, nel suo sguardo, dice che non è del tutto sparito dalla storia.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },

        act2_cisterna: {
            location: "CISTERNA DI TEODORA — DISCESA",
            onArriveOnce: [
                { type: "addLog", title: "La Cisterna di Teodora", entry: "Una foresta di colonne bizantine sommerse a metà, l'eco dell'acqua che gocciola nel buio." }
            ],
            text: `Una scalinata di pietra scivolosa scende in un silenzio innaturale. File di colonne bizantine emergono dall'acqua bassa, illuminate appena dalla torcia di Elia. Da qualche parte, tra queste colonne, Fra Bonifacio nascose un segno.`,
            options: [ { text: "> Segui le incisioni sulle colonne", target: "act2_cisterna_ricerca" } ]
        },
        act2_cisterna_ricerca: {
            location: "CISTERNA DI TEODORA — TRA LE COLONNE",
            text: `Colonna dopo colonna, cerchi un simbolo che spicchi tra i motivi decorativi bizantini: qualcosa che non dovrebbe essere lì. Tre colonne, più avanti nel buio, portano ciascuna un'incisione diversa da tutte le altre: una su un'ancora intrecciata a un pesce, una su un calice tra due mezzelune spezzate, una su un'aquila bicipite.`,
            options: [
                { text: "> Esamina la colonna con l'ancora e il pesce", target: "act2_cisterna_colonna_sbagliata_a" },
                { text: "> Esamina la colonna con il calice tra le mezzelune spezzate", target: "act2_cisterna_trovato" },
                { text: "> Esamina la colonna con l'aquila bicipite", target: "act2_cisterna_colonna_sbagliata_b" },
                { text: "> Risali per ora", target: "act2_piazza" }
            ]
        },
        act2_cisterna_colonna_sbagliata_a: {
            location: "CISTERNA DI TEODORA — TRA LE COLONNE",
            text: `L'ancora e il pesce sono un comune simbolo cristiano dei primi secoli, inciso su decine di colonne in tutta la cisterna. Niente che riguardi Fra Bonifacio o i Custodi.`,
            options: [
                { text: "> Continua a cercare tra le altre colonne", target: "act2_cisterna_ricerca" },
                { text: "> Risali per ora", target: "act2_piazza" }
            ]
        },
        act2_cisterna_colonna_sbagliata_b: {
            location: "CISTERNA DI TEODORA — TRA LE COLONNE",
            text: `L'aquila bicipite è lo stemma imperiale bizantino, scolpito su metà delle colonne portanti della cisterna. Troppo comune per essere il segno che cerchi.`,
            options: [
                { text: "> Continua a cercare tra le altre colonne", target: "act2_cisterna_ricerca" },
                { text: "> Risali per ora", target: "act2_piazza" }
            ]
        },
        act2_cisterna_trovato: {
            location: "CISTERNA DI TEODORA — LA COLONNA SEGNATA",
            music: "tema_tensione",
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--color-main)" stroke-width="2">
                <circle cx="110" cy="70" r="45"/>
                <circle cx="190" cy="70" r="45"/>
                <line x1="110" y1="25" x2="110" y2="115"/>
                <line x1="190" y1="25" x2="190" y2="115"/>
            </svg>`,
            onArriveOnce: [
                { type: "setFlag", flag: "cisternaEsplorata", value: true },
                { type: "addItem", id: "meta_medaglione_bizantino", name: "Metà di un Medaglione (Bisanzio)", desc: "Metà di un antico medaglione di bronzo, incisa con caratteri greci.", examine: "L'incisione greca è consumata dal tempo, ma leggibile in parte: qualcosa che parla di un 'calice affidato al mare del nord'. La rottura sul bordo è netta, come se fosse stato spezzato di proposito." },
                { type: "addLog", title: "Il Mezzo Medaglione Bizantino", entry: "Incastonata in una colonna, la metà di un antico medaglione bronzeo, spezzato di proposito secoli fa." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Una colonna, più bassa delle altre, reca inciso esattamente il simbolo che Fra Bonifacio aveva disegnato a margine delle sue pagine: un calice tra due mezzelune spezzate. Incastonata nella pietra, trovi metà di un medaglione di bronzo. Un rumore di passi nell'acqua, alle tue spalle, ti fa gelare il sangue: non sei solo, quaggiù.`,
            options: [ { text: "> Ti volti verso il rumore", target: "act2_orsolini_incontro" } ]
        },
        act2_orsolini_incontro: {
            location: "CISTERNA DI TEODORA — UN VOLTO NUOVO",
            onArriveOnce: [
                { type: "setFlag", flag: "orsoliniIncontrato", value: true },
                { type: "addLog", title: "Dante Orsolini", entry: "Un uomo elegante e spietato, al servizio di un ricco collezionista rimasto senza nome. Chiede il medaglione con una calma che fa più paura di qualsiasi minaccia gridata." }
            ],
            text: `Un uomo emerge dall'ombra tra le colonne, il volto illuminato appena dalla torcia. "Professor Contarini," dice, con un accento che tradisce origini incerte. "Dante Orsolini. Il mio datore di lavoro sarebbe felice di risparmiarle il resto del viaggio: mi consegni il medaglione, e questa storia finisce qui, stanotte, senza altri danni."`,
            options: [
                { text: "> Rifiuta e cerca di fuggire di corsa", skillCheck: { stat: "agilita", difficulty: 13, modifier: 0, success: "act2_fuga_riuscita", failure: "act2_fuga_fallita" } },
                { text: "> Finge di collaborare per guadagnare tempo", skillCheck: { stat: "intuito", difficulty: 12, modifier: 0, success: "act2_inganno_riuscito", failure: "act2_fuga_fallita" } }
            ]
        },
        act2_fuga_riuscita: {
            location: "CISTERNA DI TEODORA — VIA D'USCITA",
            onArriveOnce: [
                { type: "addLog", title: "Una Fuga Riuscita", entry: "Elia sguscia tra le colonne e risale la scalinata prima che Orsolini possa raggiungerlo, il medaglione ancora in tasca." }
            ],
            text: `Corri come non facevi da anni, saltando pozze d'acqua bassa, e risali la scalinata prima che Orsolini possa avvicinarsi davvero. Alle tue spalle, lo senti imprecare piano — sa già che ti ritroverà.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_inganno_riuscito: {
            location: "CISTERNA DI TEODORA — UN BLUFF RIUSCITO",
            onArriveOnce: [
                { type: "addLog", title: "Un Bluff Riuscito", entry: "Elia finge di voler negoziare, distrae Orsolini quel tanto che basta, e sguscia via nel buio con il medaglione." }
            ],
            text: `"Possiamo parlarne," dici, con una calma che non provi affatto, allungando la mano come per porgergli il medaglione. Nel momento in cui Orsolini si avvicina, scatti di lato nel buio tra le colonne, e la sua presa chiude solo aria.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_fuga_fallita: {
            location: "CISTERNA DI TEODORA — UNA COLLUTTAZIONE",
            onArriveOnce: [
                { type: "addLog", title: "Una Colluttazione", entry: "Orsolini afferra Elia per un braccio, ma Livia, scesa a cercarlo, lo distrae abbastanza da permettergli di divincolarsi e fuggire con il medaglione." }
            ],
            text: `Orsolini è più veloce di quanto sembri: ti afferra per un braccio con una presa di ferro. Proprio mentre pensi che sia finita, un fascio di luce piomba da una torcia alle spalle di Orsolini — Livia, scesa a cercarti, urla qualcosa che lo distrae quel tanto che basta perché tu possa divincolarti e correre verso la scalinata.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },
        act2_cisterna_again: {
            location: "ISTANBUL — QUARTIERE STORICO",
            text: `Ripensi alla cisterna, al medaglione, al volto di Orsolini nell'oscurità. Non c'è motivo di tornare laggiù, ora.`,
            options: [ { text: "> Torna in piazza", target: "act2_piazza" } ]
        },

        act2_decifra: {
            location: "ISTANBUL — STUDIO DI ELIF KAYA",
            onArriveOnce: [
                { type: "setFlag", flag: "cifraBizantinaDecifrata", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "La Rotta verso Gerusalemme", entry: "L'iscrizione bizantina, incrociata con le pagine del Codice, parla delle 'rovine dei cavalieri presso le mura della città santa': i Custodi passarono da Gerusalemme prima di dirigersi a nord." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Elif traduce l'iscrizione greca parola per parola, incrociandola con le pagine di Fra Bonifacio. Il testo parla delle "rovine dei cavalieri presso le mura della città santa" — un riferimento inequivocabile a Gerusalemme, e a un capitolo della storia dei Custodi che nessun libro racconta più.`,
            options: [ { text: "> Fine dell'Atto II — si parte per Gerusalemme", target: "act3_intro" } ]
        },

        /* ================= ATTO III — GERUSALEMME: SULLE ORME DEI CROCIATI ================= */

        act3_intro: {
            location: "GERUSALEMME — LA CITTÀ VECCHIA",
            music: "tema_gerusalemme",
            text: `Le pietre di Gerusalemme portano il peso di secoli di pellegrini, conquistatori e custodi silenziosi. Da qualche parte, tra le rovine di una fortezza crociata dimenticata dai più, i Custodi del Calice Bianco lasciarono un'altra traccia del loro cammino verso nord.`,
            options: [ { text: "> Raggiungi le rovine crociate", target: "act3_piazza" } ]
        },

        act3_piazza: {
            location: "GERUSALEMME — PRESSO LE ROVINE CROCIATE",
            text: `Le mura diroccate di un'antica fortezza crociata si stagliano contro il cielo della sera. Un anziano custode del sito siede all'ombra di un arco, come se fosse lì da sempre.`,
            options: [
                { text: "> Parla con l'anziano custode del sito", target: "act3_custode", condition: { type: "flag", flag: "custodeIncontrato", equals: false } },
                { text: "> Torna a parlare con il custode", target: "act3_custode_again", condition: { type: "flag", flag: "custodeIncontrato", equals: true } },
                { text: "> Esplora le rovine della fortezza", target: "act3_rovine", condition: { type: "flag", flag: "roviniEsplorati", equals: false } },
                { text: "> Torna tra le rovine già esplorate", target: "act3_rovine_again", condition: { type: "flag", flag: "roviniEsplorati", equals: true } },
                { text: "> Studia i due medaglioni insieme alle pagine del Codice", target: "act3_decifra", condition: { all: [ { type: "flag", flag: "roviniEsplorati", equals: true }, { type: "flag", flag: "ordineStoriaAppresa", equals: false } ] } },
                { text: "> Fine dell'Atto III — si parte per la Scozia", target: "act4_intro", condition: { type: "flag", flag: "ordineStoriaAppresa", equals: true } }
            ]
        },

        act3_custode: {
            location: "PRESSO LE ROVINE — CON IL CUSTODE DEL SITO",
            onArriveOnce: [
                { type: "setFlag", flag: "custodeIncontrato", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "La Leggenda Tramandata", entry: "Il custode del sito racconta una leggenda locale, tramandata di generazione in generazione: alcuni cavalieri, secoli fa, 'portarono il calice oltre il mare, verso le terre fredde del nord'." }
            ],
            text: `L'anziano custode ascolta la domanda di Elia con un sorriso paziente. "Mio nonno mi raccontava di alcuni cavalieri," dice, "che portarono un calice sacro oltre il mare, verso le terre fredde del nord, per sottrarlo a chi lo avrebbe voluto per il potere e non per la fede. Leggende, professore. Ma le leggende, a volte, ricordano meglio dei libri."`,
            options: [ { text: "> Torna presso le rovine", target: "act3_piazza" } ]
        },
        act3_custode_again: {
            location: "PRESSO LE ROVINE — CON IL CUSTODE DEL SITO",
            text: `Il custode ti saluta con un cenno, ma non ha altro da raccontare, per ora.`,
            options: [ { text: "> Torna presso le rovine", target: "act3_piazza" } ]
        },

        act3_rovine: {
            location: "ROVINE DELLA FORTEZZA CROCIATA",
            text: `Tra i blocchi di pietra crollati, resti di affreschi consumati dal tempo mostrano ancora tracce di un simbolo familiare: un calice tra due mezzelune spezzate.`,
            options: [
                { text: "> Cerca un passaggio segreto nelle mura", skillCheck: { stat: "intuito", difficulty: 12, modifier: 0, success: "act3_rovine_trovato", failure: "act3_rovine_fallito" } }
            ]
        },
        act3_rovine_fallito: {
            location: "ROVINE DELLA FORTEZZA CROCIATA",
            text: `Muri di pietra su muri di pietra, nessuna fessura sospetta. Forse hai controllato il tratto sbagliato di mura.`,
            options: [
                { text: "> Continua a cercare", skillCheck: { stat: "intuito", difficulty: 12, modifier: 0, success: "act3_rovine_trovato", failure: "act3_rovine_fallito" } },
                { text: "> Torna presso le rovine", target: "act3_piazza" }
            ]
        },
        act3_rovine_trovato: {
            location: "ROVINE DELLA FORTEZZA CROCIATA — IL PASSAGGIO",
            onArriveOnce: [
                { type: "setFlag", flag: "roviniEsplorati", value: true },
                { type: "addItem", id: "meta_medaglione_crociato", name: "Metà di un Medaglione (Crociata)", desc: "L'altra metà del medaglione di bronzo, questa incisa in caratteri latini.", examine: "L'incisione latina, un tempo dorata, recita qualcosa come 'donec fideles reperiantur' — 'finché non si trovino i fedeli'. I bordi spezzati combaciano, a colpo d'occhio, con l'altra metà che porti con te." },
                { type: "addLog", title: "Il Mezzo Medaglione Crociato", entry: "Dietro una pietra smossa, l'altra metà del medaglione bizantino, questa incisa in latino." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Una pietra, più liscia delle altre al tatto, cede sotto la pressione della tua mano. Dietro di essa, avvolta in un panno ormai polveroso, trovi l'altra metà del medaglione. Un rumore di passi tra le macerie ti avverte che non sei l'unico ad aver trovato la strada fin qui.`,
            options: [ { text: "> Esci allo scoperto tra le rovine", target: "act3_orsolini_scontro" } ]
        },
        act3_orsolini_scontro: {
            location: "ROVINE DELLA FORTEZZA — SECONDO INCONTRO",
            music: "tema_tensione",
            onArriveOnce: [
                { type: "setFlag", flag: "confrontoOrsolini2", value: true },
                { type: "addLog", title: "Orsolini Non Si Arrende", entry: "Dante Orsolini li ha seguiti fin qui, ancora più determinato a impossessarsi di entrambe le metà del medaglione." }
            ],
            text: `Dante Orsolini è appoggiato a un blocco di pietra crollato, come se li avesse aspettati. "Due su due, professore. Cominciate a impressionarmi. Ma ora ho bisogno di entrambe le metà — e stavolta non me ne andrò a mani vuote."`,
            options: [
                { text: "> Affrontalo a viso aperto tra le macerie", skillCheck: { stat: "agilita", difficulty: 14, modifier: 0, success: "act3_scontro_vittoria", failure: "act3_scontro_sconfitta" } },
                { text: "> Cerca una via traverso le rovine per seminarlo", skillCheck: { stat: "intuito", difficulty: 13, modifier: 0, success: "act3_scontro_vittoria", failure: "act3_scontro_sconfitta" } }
            ]
        },
        act3_scontro_vittoria: {
            location: "ROVINE DELLA FORTEZZA — VIA LIBERA",
            onArriveOnce: [
                { type: "addLog", title: "Orsolini Battuto in Ritirata", entry: "Elia riesce a mettere in salvo entrambe le metà del medaglione. Orsolini si ritira furioso, promettendo che la Scozia non sarà altrettanto clemente." }
            ],
            text: `Con un misto di fortuna e testardaggine, riesci a mettere in salvo entrambe le metà del medaglione tra le macerie. Orsolini si ritira, furioso, ma non prima di lanciare un ultimo avvertimento: "Il vostro viaggio non finisce qui, professore. E il posto dove state andando non sarà così clemente."`,
            options: [ { text: "> Torna presso le rovine", target: "act3_piazza" } ]
        },
        act3_scontro_sconfitta: {
            location: "ROVINE DELLA FORTEZZA — UNO SCONTRO DURO",
            onArriveOnce: [
                { type: "addLog", title: "Uno Scontro Duro", entry: "Orsolini ha quasi la meglio, ma un crollo improvviso tra le macerie costringe entrambi a ritirarsi separatamente. Elia riesce comunque a portare via i due frammenti." }
            ],
            text: `Orsolini è più forte di quanto sembri, e per un lungo istante temi di aver perso tutto. Poi un blocco di pietra cede sotto il peso di entrambi, costringendovi a separarvi tra la polvere e le urla. Quando il polverone si dirada, Orsolini è sparito — e tu stringi ancora, con le nocche bianche, entrambe le metà del medaglione.`,
            options: [ { text: "> Torna presso le rovine", target: "act3_piazza" } ]
        },
        act3_rovine_again: {
            location: "GERUSALEMME — PRESSO LE ROVINE CROCIATE",
            text: `Le rovine hanno già rivelato ciò che avevano da rivelare. Non c'è altro da cercare qui, ora.`,
            options: [ { text: "> Torna presso le rovine", target: "act3_piazza" } ]
        },

        act3_decifra: {
            location: "GERUSALEMME — ALLA LUCE DELLA SERA",
            onArriveOnce: [
                { type: "setFlag", flag: "ordineStoriaAppresa", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "La Storia dei Custodi del Calice Bianco", entry: "Dopo la caduta di Acri, i Custodi del Calice Bianco furono scomunicati e dispersi. Un piccolo gruppo fedele fuggì verso nord, fino in Scozia, dove un clan amico offrì loro rifugio in una cappella isolata: la Cappella di Rosmoor." }
            ],
            text: `Le due metà del medaglione, unite alle pagine del Codice, raccontano finalmente la storia intera: dopo la caduta di Acri, i Custodi del Calice Bianco furono dichiarati eretici e dispersi. Un piccolo nucleo fedele fuggì verso nord, fino in Scozia, dove un clan amico concesse loro rifugio in una cappella remota: la Cappella di Rosmoor.`,
            options: [ { text: "> Fine dell'Atto III — si parte per la Scozia", target: "act4_intro" } ]
        },

        /* ================= ATTO IV — SCOZIA: L'ULTIMO RIFUGIO ================= */

        act4_intro: {
            location: "ALTOPIANI SCOZZESI — STRADA PER ROSMOOR",
            music: "tema_scozia",
            text: `La brughiera scozzese si stende grigia e silenziosa sotto un cielo basso. In fondo a una valle isolata, la Cappella di Rosmoor emerge dalla nebbia come se non fosse cambiata di un solo giorno dal Medioevo.`,
            options: [ { text: "> Raggiungi la Cappella di Rosmoor", target: "act4_piazza" } ]
        },

        act4_piazza: {
            location: "PRESSO LA CAPPELLA DI ROSMOOR",
            text: `La cappella, in pietra grigia consumata dal vento, sorge isolata tra le colline. Nessun custode, nessun cartello turistico: solo silenzio e il richiamo lontano di un corvo.`,
            options: [
                { text: "> Entra nella cappella", target: "act4_cappella", condition: { type: "flag", flag: "cappellaRaggiunta", equals: false } },
                { text: "> Torna nella cappella", target: "act4_cappella_again", condition: { type: "flag", flag: "cappellaRaggiunta", equals: true } },
                { text: "> Fine dell'Atto IV — hai la mappa, si parte per l'isola", target: "act5_intro", condition: { type: "flag", flag: "mappaOttenuta", equals: true } }
            ]
        },

        act4_cappella: {
            location: "INTERNO DELLA CAPPELLA DI ROSMOOR",
            onArriveOnce: [
                { type: "setFlag", flag: "cappellaRaggiunta", value: true },
                { type: "addLog", title: "La Cappella di Rosmoor", entry: "L'interno della cappella conserva intatti i simboli dei Custodi del Calice Bianco, scolpiti nella pietra accanto agli stemmi del clan che li accolse." }
            ],
            text: `L'interno della cappella è freddo e silenzioso, illuminato appena da strette finestre. Sulle pareti, accanto agli stemmi di un antico clan scozzese, riconosci lo stesso simbolo del calice tra due mezzelune spezzate visto a Istanbul e Gerusalemme. Una botola di pietra, semi-nascosta dietro l'altare, scende sotto terra.`,
            options: [
                { text: "> Confronta il gemello monogrammato con gli stemmi della cappella", target: "act4_stemmi_confronto", condition: { all: [ { type: "flag", flag: "indizioGuantoTrovato", equals: true }, { type: "flag", flag: "identitaHalvardIntuita", equals: false } ] } },
                { text: "> Scendi nella cripta sotterranea", target: "act4_cripta" }
            ]
        },
        act4_cappella_again: {
            location: "INTERNO DELLA CAPPELLA DI ROSMOOR",
            text: `La cappella custodisce ancora il suo silenzio di pietra. Tutto quello che conta, ormai, è sotto i tuoi piedi.`,
            options: [
                { text: "> Confronta il gemello monogrammato con gli stemmi della cappella", target: "act4_stemmi_confronto", condition: { all: [ { type: "flag", flag: "indizioGuantoTrovato", equals: true }, { type: "flag", flag: "identitaHalvardIntuita", equals: false } ] } },
                { text: "> Scendi nella cripta sotterranea", target: "act4_cripta" },
                { text: "> Torna fuori", target: "act4_piazza" }
            ]
        },
        act4_stemmi_confronto: {
            location: "INTERNO DELLA CAPPELLA DI ROSMOOR — GLI STEMMI",
            onArriveOnce: [
                { type: "setFlag", flag: "identitaHalvardIntuita", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "R. H. — Un Nome, Non Più Solo Iniziali", entry: "Tra le genealogie incise ai margini degli stemmi, un ramo cadetto del clan riporta un nome anglicizzato nei secoli: 'Rutger von Halvard, il cavaliere espulso'. Le stesse iniziali del gemello trovato a Serranova." }
            ],
            text: `Tieni il gemello accanto alla pietra scolpita, confrontando le iniziali con le genealogie incise ai margini degli stemmi del clan. Tra i rami cadetti, quasi illeggibile, un nome: "Rutger von Halvard, il cavaliere espulso" — un cognome che i secoli hanno smussato in "Halvard". Le iniziali coincidono esattamente con quelle del gemello. Non è più un sospetto senza volto: ha già, da questo momento, un nome e una storia di famiglia.`,
            options: [ { text: "> Torna a guardarti intorno nella cappella", target: "act4_cappella_again" } ]
        },

        act4_cripta: {
            location: "CRIPTA SOTTERRANEA DELLA CAPPELLA",
            onArriveOnce: [
                { type: "setFlag", flag: "criptaEsplorata", value: true },
                { type: "addLog", title: "La Porta Sigillata", entry: "In fondo alla cripta, una porta di pietra reca una fessura a forma di medaglione: solo un medaglione intero, non due metà spaiate, potrà aprirla." }
            ],
            text: `La cripta è più grande di quanto sembrasse dall'alto: colonne basse, aria stagnante, e in fondo una porta di pietra massiccia. Al centro della porta, una fessura scolpita ha la forma esatta di un medaglione — intero, non spezzato in due.`,
            options: [
                { text: "> Inserisci il medaglione ricomposto nella fessura", target: "act4_porta_aperta", condition: { type: "flag", flag: "medaglioneCombinato", equals: true } },
                { text: "> La fessura richiede qualcosa che non hai ancora", target: "act4_cripta_bloccata", condition: { type: "flag", flag: "medaglioneCombinato", equals: false } }
            ]
        },
        act4_cripta_bloccata: {
            location: "CRIPTA SOTTERRANEA — LA FESSURA VUOTA",
            text: `La fessura scolpita nella porta ha esattamente la forma delle due metà di medaglione che porti con te, se solo fossero unite. Forse è il momento di ricomporle, dall'inventario, prima di tornare quaggiù.`,
            options: [ { text: "> Risali per riflettere", target: "act4_piazza" } ]
        },

        act4_porta_aperta: {
            location: "CRIPTA SOTTERRANEA — LA PORTA SI APRE",
            onArriveOnce: [
                { type: "addLog", title: "La Camera Interna", entry: "Il medaglione ricomposto fa scattare un antico meccanismo: la porta di pietra si apre su una camera interna, dove qualcuno è già arrivato prima di loro." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Il medaglione ricomposto scivola nella fessura con un suono secco di ingranaggi antichi. La porta di pietra ruota lentamente, rivelando una camera interna — e, al centro di essa, una luce di torcia già accesa che non è la vostra.`,
            options: [ { text: "> Entra nella camera interna", target: "act4_scontro_finale" } ]
        },

        act4_scontro_finale: {
            location: "CRIPTA SOTTERRANEA — CAMERA INTERNA",
            music: "tema_tensione",
            onArriveOnce: [
                { type: "setFlag", flag: "orsoliniConfrontoFinale", value: true },
                { type: "addLog", title: "L'Ultimo Confronto con Orsolini", entry: "Dante Orsolini li ha preceduti nella camera interna. Questa volta non è disposto a lasciarli andare senza la mappa che i Custodi lasciarono per l'ultima tappa del loro viaggio." }
            ],
            text: `Dante Orsolini è già lì, una vecchia pergamena arrotolata in mano. "L'ultima tappa, professore. Una mappa verso un'isola che nessuna carta nautica riporta più. Il mio datore di lavoro la vuole, e io sono stanco di tornare a mani vuote."`,
            options: [
                { text: "> Conta sull'aiuto di Guido, che vi ha seguiti fin qui", target: "act4_guido_aiuto", condition: { type: "flag", flag: "guidoFiducia", equals: true } },
                { text: "> Affronta Orsolini senza aiuto", skillCheck: { stat: "agilita", difficulty: 15, modifier: 0, success: "act4_vittoria", failure: "act4_scontro_perso" } }
            ]
        },
        act4_guido_aiuto: {
            location: "CRIPTA SOTTERRANEA — L'AIUTO DI GUIDO",
            onArriveOnce: [
                { type: "setFlag", flag: "guidoRedento", value: true },
                { type: "addLog", title: "La Redenzione di Guido", entry: "Guido, fedele alla promessa fatta a Istanbul, li ha seguiti fin sotto la cappella. Interviene alle spalle di Orsolini, disarmandolo quel tanto che basta per ribaltare la situazione." }
            ],
            text: `Un'ombra si muove alle spalle di Orsolini prima che possa reagire: è Guido, fedele alla parola data a Istanbul. In un attimo di confusione, gli strappa la pergamena di mano. "Fratello maggiore," dice, quasi divertito, "ogni tanto mantengo anche le promesse."`,
            options: [ { text: "> Prosegui", target: "act4_vittoria" } ]
        },
        act4_vittoria: {
            location: "CRIPTA SOTTERRANEA — LA MAPPA DELL'ISOLA",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "setFlag", flag: "mappaOttenuta", value: true },
                { type: "addItem", id: "mappa_isola", name: "Mappa dell'Isola di San Vaneo", desc: "Una mappa nautica secentesca, disegnata a mano, che indica un'isola sconosciuta alle carte moderne.", examine: "L'isola è segnata semplicemente come 'San Vaneo'. Una piccola annotazione a margine, in latino, recita: 'ubi lux vera quiescit' — 'dove la vera luce riposa'." },
                { type: "addLog", title: "Verso l'Isola di San Vaneo", entry: "Orsolini si ritira, questa volta senza nulla in mano. La mappa recuperata indica un'isola sconosciuta alle carte moderne: San Vaneo." }
            ],
            text: `Orsolini, sopraffatto dagli eventi, si ritira nell'oscurità della cripta senza più nulla in mano — questa volta per davvero. La mappa che tieni ora tra le dita indica un'isola dimenticata da ogni carta nautica moderna: San Vaneo. È lì, con ogni probabilità, che il viaggio dei Custodi del Calice Bianco giunse infine a compimento.`,
            options: [ { text: "> Torna fuori dalla cappella", target: "act4_piazza" } ]
        },
        act4_scontro_perso: {
            location: "CRIPTA SOTTERRANEA — UNO SCONTRO DIFFICILE",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "setFlag", flag: "mappaOttenuta", value: true },
                { type: "addItem", id: "mappa_isola", name: "Mappa dell'Isola di San Vaneo", desc: "Una mappa nautica secentesca, strappata a fatica dalle mani di Orsolini.", examine: "L'isola è segnata semplicemente come 'San Vaneo'. Una piccola annotazione a margine, in latino, recita: 'ubi lux vera quiescit' — 'dove la vera luce riposa'." },
                { type: "addLog", title: "Verso l'Isola di San Vaneo", entry: "Orsolini ha quasi la meglio, ma Livia riesce a distrarlo abbastanza da permettere a Elia di strappargli di mano la mappa e fuggire verso l'uscita." }
            ],
            text: `Orsolini è sul punto di avere la meglio quando Livia, con un gesto disperato, rovescia una delle torce a terra: nel buio improvviso, riesci a strappargli di mano la pergamena e a correre verso l'uscita, il cuore che martella. La mappa indica un'isola dimenticata: San Vaneo.`,
            options: [ { text: "> Torna fuori dalla cappella", target: "act4_piazza" } ]
        },

        /* ================= ATTO V — L'ISOLA DEL CALICE ================= */

        act5_intro: {
            location: "IN MARE, VERSO L'ISOLA DI SAN VANEO",
            music: "tema_isola",
            text: `Un vecchio peschereccio noleggiato taglia le onde grigie dell'Atlantico settentrionale verso un puntino sulla mappa che nessuna carta moderna riporta più. Elia stringe la pergamena come se potesse dissolversi da un momento all'altro.`,
            options: [ { text: "> Sbarca sull'isola", target: "act5_isola" } ]
        },

        act5_isola: {
            location: "ISOLA DI SAN VANEO",
            onArriveOnce: [
                { type: "setFlag", flag: "isolaRaggiunta", value: true },
                { type: "addLog", title: "L'Isola di San Vaneo", entry: "Un'isola brulla e disabitata, dominata dai resti di una piccola cappella-santuario scavata nella roccia." }
            ],
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--color-main)" stroke-width="2">
                <path d="M20 110 Q150 60 280 110" />
                <rect x="130" y="40" width="40" height="60"/>
                <polygon points="130,40 150,15 170,40"/>
            </svg>`,
            text: `L'isola è brulla, battuta dal vento, disabitata da secoli a giudicare dall'assenza di ogni traccia moderna. In cima a un promontorio, i resti di una piccola cappella-santuario sono scavati direttamente nella roccia viva.`,
            options: [
                { text: "> Entra nella grotta-santuario", target: "act5_santuario", condition: { type: "flag", flag: "identitaHalvardIntuita", equals: false } },
                { text: "> Entra nella grotta-santuario, pronta ad affrontarlo per nome", target: "act5_santuario_riconosciuto", condition: { type: "flag", flag: "identitaHalvardIntuita", equals: true } }
            ]
        },

        act5_santuario: {
            location: "GROTTA-SANTUARIO DI SAN VANEO",
            onArriveOnce: [
                { type: "setFlag", flag: "halvardConfrontato", value: true },
                { type: "addLog", title: "Il Conte Rutger Halvard", entry: "Il misterioso committente di Orsolini attendeva già sull'isola: il Conte Rutger Halvard, discendente di un cavaliere espulso dai Custodi del Calice Bianco secoli fa, convinto che il Graal spetti di diritto alla sua famiglia." },
                { type: "playSfx", sfx: "impatto" }
            ],
            text: `Al centro della grotta, su un altare di pietra consumato dai secoli, riposa un calice bianco, semplice oltre ogni aspettativa. Accanto ad esso, ad attenderli con calma glaciale, un uomo anziano in abiti scuri: "Conte Rutger Halvard," si presenta. "Discendente dell'unico cavaliere che i Custodi osarono espellere dal loro ordine. Questo calice, professore, appartiene alla mia famiglia da otto secoli — e questa notte, finalmente, tornerà a casa."`,
            options: [ { text: "> Ascolta ciò che il Conte ha da dire", target: "act5_confronto" } ]
        },
        act5_santuario_riconosciuto: {
            location: "GROTTA-SANTUARIO DI SAN VANEO",
            onArriveOnce: [
                { type: "setFlag", flag: "halvardConfrontato", value: true },
                { type: "addLog", title: "Un Nome Detto per Primo", entry: "Elia riconosce Rutger von Halvard ancora prima che l'uomo apra bocca, mostrandogli il gemello ritrovato mesi prima a Serranova. Per la prima volta da quando è iniziata questa storia, è lui ad avere il controllo del confronto." },
                { type: "playSfx", sfx: "impatto" }
            ],
            text: `Al centro della grotta, su un altare di pietra consumato dai secoli, riposa un calice bianco, semplice oltre ogni aspettativa. Accanto ad esso, un uomo anziano in abiti scuri si volta verso di loro — ma prima che possa aprire bocca, Elia estrae dalla tasca il gemello monogrammato raccolto sul pavimento del museo di Serranova, mesi prima. "Conte Rutger von Halvard," dice, senza un filo di esitazione. "Ha lasciato questo nella sala dei manoscritti." Per un istante, l'uomo che si aspettava di dominare la scena resta, visibilmente, spiazzato.`,
            options: [ { text: "> Approfitta del vantaggio", target: "act5_confronto" } ]
        },

        act5_confronto: {
            location: "GROTTA-SANTUARIO DI SAN VANEO",
            text: `Halvard non alza la voce, non ha bisogno di farlo: la sua calma è quella di chi ha già vinto, nella propria testa, da molto tempo. Tocca a te decidere come affrontare quest'ultimo, decisivo confronto.`,
            options: [
                { text: "> Chiamalo per nome, mostrandogli il gemello ritrovato a Serranova", target: "act5_finale_confronto_preparato", condition: { type: "flag", flag: "identitaHalvardIntuita", equals: true } },
                { text: "> Sfidalo a viso aperto, giocando d'astuzia", skillCheck: { stat: "intuito", difficulty: 14, modifier: 0, success: "act5_finale_vittoria_confronto", failure: "act5_finale_rischio" } },
                { text: "> Convincilo con la vera Storia, non con la forza", skillCheck: { stat: "cultura", difficulty: 13, modifier: 0, success: "act5_finale_persuasione", failure: "act5_finale_rischio" } },
                { text: "> Chiama Guido, che vi ha seguiti fin qui", target: "act5_finale_fratelli", condition: { type: "flag", flag: "guidoRedento", equals: true } },
                { text: "> Rinuncia al Calice e sigilla per sempre la grotta", target: "act5_finale_rinuncia" }
            ]
        },

        act5_finale_confronto_preparato: {
            location: "GROTTA-SANTUARIO — UN VANTAGGIO GIÀ CONQUISTATO",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Il Vantaggio della Preparazione", entry: "Sapere già chi fosse Halvard, prima ancora di sbarcare sull'isola, cambia tutto: di fronte a un avversario che non ha più nulla da rivelare, il Conte non trova le forze per continuare il bluff. Consegna il calice senza opporre resistenza, e con esso una cassa di documenti di famiglia sul cavaliere espulso." }
            ],
            text: `Sapere già il suo nome, la sua storia, il suo antenato disonorato, toglie a Halvard l'unica arma che gli restava: la sorpresa. "Come..." comincia, e si ferma. Non finisce la domanda — non ne ha bisogno. "Otto secoli di ossessione di famiglia, Conte, e nessuno le ha mai detto la verità intera," dici, posando il gemello sull'altare accanto al calice. Qualcosa, nel suo sguardo, cede prima ancora che tu finisca di parlare. Consegna il calice senza una parola, e con esso una cassa di lettere e documenti di famiglia che nessuno storico aveva mai potuto consultare. Il Codice, il calice, e la vera storia dei Custodi del Calice Bianco troveranno posto in un museo — insieme, per la prima volta, alla storia completa dell'uomo che per tutta la vita aveva inseguito un fantasma di famiglia.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_vittoria_confronto: {
            location: "GROTTA-SANTUARIO — LA VERITÀ VINCE",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Il Custode del Calice", entry: "Elia gioca d'astuzia, dimostrando a Halvard che la sua stessa famiglia fu espulsa per aver tradito il giuramento dell'ordine: il calice non gli appartiene, e non gli apparterrà mai. Halvard, sconfitto, si ritira." }
            ],
            text: `"Il vostro antenato non fu espulso per invidia, Conte," dici, mostrandogli le pagine del Codice. "Fu espulso perché tradì il giuramento, per denaro. Questo calice non tornerà mai a casa sua, perché non è mai stato casa sua." Qualcosa si spezza nello sguardo di Halvard — non rabbia, ma la fine di un'ossessione durata una vita intera. Si ritira in silenzio. Il Codice di Fra Bonifacio, il calice, e la storia dei Custodi del Calice Bianco troveranno finalmente posto in un museo, non in una collezione privata. La reputazione di Elia, dopo dieci anni di scherno, è pienamente riabilitata.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_persuasione: {
            location: "GROTTA-SANTUARIO — LA STORIA CONVINCE",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Una Vittoria Senza Vincitori", entry: "Elia non sfida Halvard, ma gli racconta la storia vera del suo antenato con rispetto, non con disprezzo. Il Conte, per la prima volta in vita sua, sceglie di lasciar andare l'ossessione di famiglia." }
            ],
            text: `Non lo sfidi, non lo accusi: gli racconti la storia vera di suo padre-lontano, con tutto il rispetto che merita una tragedia familiare durata otto secoli. Halvard ascolta in silenzio, poi, per la prima volta forse in tutta la sua vita, lascia cadere le spalle. "Forse," dice piano, "è ora che questa storia finisca qui, e non con un altro furto." Si allontana senza il calice, ma con qualcosa che assomiglia, finalmente, alla pace.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_fratelli: {
            location: "GROTTA-SANTUARIO — DUE FRATELLI",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Due Fratelli, Un Solo Calice", entry: "Guido, fedele fino alla fine alla promessa fatta a Istanbul, rivela di aver già avvertito le autorità locali del piano di Halvard. L'arrivo della polizia costiera pone fine alla vicenda senza ulteriore violenza." }
            ],
            text: `"Guido!" chiami, e per la prima volta in vent'anni tuo fratello arriva davvero, quando serve. "Ho fatto una telefonata prima di salpare," dice, quasi imbarazzato. "La guardia costiera è già in arrivo." Halvard impallidisce mentre, in lontananza, il rombo di un motoscafo si avvicina. Tra i due fratelli Contarini, in piedi fianco a fianco davanti all'altare, non serve altro per dire che qualcosa, tra loro, è stato finalmente riparato.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_rinuncia: {
            location: "GROTTA-SANTUARIO — UNA SCELTA DI RINUNCIA",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Alcune Storie Devono Restare Leggende", entry: "Elia sceglie di non muovere il calice, sigillando la grotta e portando via solo la conoscenza acquisita. Pubblicherà le sue scoperte senza prova fisica, accettando lo scetticismo che ne seguirà." }
            ],
            text: `Guardi il calice, poi Halvard, poi Livia al tuo fianco. "Alcune storie," dici infine, "forse devono restare leggende." Non lo tocchi. Con l'aiuto di Livia, sigilli l'ingresso della grotta con le pietre smosse, portando via solo appunti, disegni, memoria. Il tuo prossimo articolo accademico susciterà lo scetticismo di sempre — ma questa volta, per la prima volta, sarai tu a non avere bisogno della loro approvazione.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_rischio: {
            location: "GROTTA-SANTUARIO — LE COSE PRECIPITANO",
            music: "tema_tensione",
            onArriveOnce: [
                { type: "addLog", title: "Le Cose Precipitano", entry: "Il confronto con Halvard va storto: alcuni uomini del Conte, rimasti nascosti tra le rocce, si fanno avanti. Elia e Livia devono decidere in fretta come reagire." }
            ],
            text: `Il piano non funziona come speravi: dalle ombre della grotta emergono due degli uomini di Halvard, rimasti nascosti tra le rocce fin dal vostro arrivo. Non c'è più tempo per parole intelligenti.`,
            options: [
                { text: "> Cerca una via di fuga con Livia, portando via ciò che potete", skillCheck: { stat: "agilita", difficulty: 14, modifier: 0, success: "act5_finale_fuga_riuscita", failure: "act5_finale_game_over" } }
            ]
        },

        act5_finale_fuga_riuscita: {
            location: "AL LARGO DI SAN VANEO",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Una Fuga Amara", entry: "Elia e Livia riescono a fuggire dall'isola con le fotografie e gli appunti presi in fretta, ma senza il calice, lasciato nelle mani di Halvard. La posizione esatta dell'isola, però, resta un segreto che solo loro conoscono." }
            ],
            text: `Correte verso il peschereccio tra le rocce scivolose, il fiato corto, senza guardarvi indietro. Il calice resta sull'altare, nelle mani di Halvard — ma la posizione esatta dell'isola, il Codice, la vera storia dei Custodi, restano un segreto che solo tu e Livia condividete. Forse non è la vittoria che speravi, ma è abbastanza per ricominciare.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act5_finale_game_over: {
            location: "GROTTA-SANTUARIO — TROPPO TARDI",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Il Prezzo del Fallimento", entry: "Gli uomini di Halvard hanno la meglio. Quando la guardia costiera, allertata con settimane di ritardo da un articolo mai pubblicato, raggiungerà infine l'isola, del Conte, del calice e dei due archeologi non resterà più traccia." }
            ],
            text: `Gli uomini di Halvard vi raggiungono prima che possiate lasciare la grotta. Il Conte osserva la scena senza un briciolo di rimorso. "Doveva andare diversamente, professore," dice soltanto, mentre il calice torna, dopo otto secoli, nelle mani sbagliate. Il mondo accademico non saprà mai quanto vicino Elia Contarini fosse arrivato alla verità.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        }
    },

    combinations: [
        {
            items: ["meta_medaglione_bizantino", "meta_medaglione_crociato"],
            consumes: true,
            result: { id: "medaglione_intero", name: "Medaglione Ricomposto", desc: "Le due metà del medaglione, ora unite, formano un disco di bronzo completo con incisioni greche e latine.", examine: "Unite, le due iscrizioni si completano a vicenda: un calice tra due mezzelune, e la scritta 'donec fideles reperiantur — apud Rosmoor' — 'finché non si trovino i fedeli, presso Rosmoor'. Il nome di un luogo, non più un enigma." },
            effects: [
                { type: "setFlag", flag: "medaglioneCombinato", value: true },
                { type: "addLog", title: "Il Medaglione Ricomposto", entry: "Le due metà si uniscono perfettamente: l'iscrizione completa nomina per la prima volta un luogo preciso, Rosmoor." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            message: "Le due metà si incastrano con un piccolo scatto: il medaglione, ricomposto, rivela un nome di luogo inciso lungo il bordo — Rosmoor."
        }
    ]
};
