/* ============================================================
   NEBBIE SU BLACKTHORN HALL — ATTO I: LA LETTERA
   ------------------------------------------------------------
   STEP 1 di 6 (vedi piano concordato): solo scrittura — testi,
   nodi, condizioni, oggetti. Musica, disegni SVG, effetti sonori
   e variazioni di tema per scena arrivano negli step successivi.
   ============================================================ */

const STORY = {
    meta: {
        id: "blackthorn-hall-act1",
        title: "Nebbie su Blackthorn Hall - Atto I: La Lettera",
        version: "0.1-atto1"
    },

    startNode: "intro_letter",

    initialState: {
        flags: {
            hasLamp: false,
            hasRevolver: false,
            knowsLayout: false,
            talkedToAgnes: false,
            pembertonWarmedUp: false,   // resterà false in questo atto: si sblocca più avanti nella storia
            noticedTremor: false,
            noticedJoshiahEyes: false,
            sawSilhouette: false,
            waitedTillDawn: false,
            metConstance: false,
            knowsFamilyHistory: false,
            deskExamined: false
        },
        stats: {
            fiducia: 5,   // quanto Edmund si fida di Arthur (e viceversa) — 0-10
            nervi: 10,    // tenuta psicologica di Arthur — 0-10
            indagine: 3   // capacità di notare dettagli — 0-10, usata negli skill check
        },
        inventory: [
            {
                id: "borsa_medica", name: "Borsa medica", desc: "Gli strumenti del mestiere: non si sa mai.",
                examine: "Ferri chirurgici, bende pulite, una boccetta di laudano. La borsa di un medico di provincia — sufficiente per le emergenze comuni, non certo per ciò che Arthur sta per trovare."
            }
        ]
    },

    // ---------------- MUSICA ----------------
    // Una traccia per ogni zona/momento emotivo. Impostata solo sui nodi
    // dove la musica cambia davvero — tutti gli altri nodi ereditano
    // quella già in corso (vedi motore-avventure/README.md).
    music: {
        home: {
            wave: "triangle",
            volume: 0.02,
            notes: [
                { freq: 293.66, dur: 0.9 },  // D4
                { freq: 369.99, dur: 0.9 },  // F#4
                { freq: 440.00, dur: 0.9 },  // A4
                { freq: 392.00, dur: 1.1 }   // G4
            ]
        },
        journey: {
            wave: "sine",
            volume: 0.02,
            notes: [
                { freq: 196.00, dur: 0.45 }, // G3
                { freq: 246.94, dur: 0.45 }, // B3
                { freq: 293.66, dur: 0.45 }, // D4
                { freq: 261.63, dur: 0.5 }   // C4
            ]
        },
        arrival: {
            wave: "triangle",
            volume: 0.022,
            notes: [
                { freq: 110.00, dur: 1.2 },  // A2
                { freq: 130.81, dur: 1.2 },  // C3
                { freq: 155.56, dur: 1.2 },  // Eb3
                { freq: 146.83, dur: 1.4 }   // D3
            ]
        },
        house_day: {
            wave: "square",
            volume: 0.015,
            notes: [
                { freq: 164.81, dur: 0.55 }, // E3
                { freq: 196.00, dur: 0.55 }, // G3
                { freq: 233.08, dur: 0.55 }, // Bb3
                { freq: 220.00, dur: 0.7 }   // A3
            ]
        },
        night: {
            wave: "sine",
            volume: 0.02,
            notes: [
                { freq: 92.50, dur: 1.5 },   // F#2
                { freq: 130.81, dur: 1.5 },  // C3
                { freq: 155.56, dur: 1.5 },  // Eb3
                { freq: 146.83, dur: 1.8 }   // D3
            ]
        },
        library: {
            wave: "sine",
            volume: 0.02,
            notes: [
                { freq: 220.00, dur: 0.6 },  // A3
                { freq: 261.63, dur: 0.6 },  // C4
                { freq: 329.63, dur: 0.6 },  // E4
                { freq: 293.66, dur: 0.8 }   // D4
            ]
        },
        danger: {
            wave: "sawtooth",
            volume: 0.02,
            notes: [
                { freq: 98.00, dur: 0.25 },  // G2
                { freq: 103.83, dur: 0.25 }, // Ab2
                { freq: 98.00, dur: 0.25 },
                { freq: 87.31, dur: 0.4 }    // F2
            ]
        },
        ending_death: {
            wave: "sawtooth",
            volume: 0.02,
            notes: [
                { freq: 146.83, dur: 0.9 },  // D3
                { freq: 130.81, dur: 0.9 },  // C3
                { freq: 116.54, dur: 0.9 },  // Bb2
                { freq: 110.00, dur: 1.4 }   // A2
            ]
        },
        ending_dawn: {
            wave: "triangle",
            volume: 0.02,
            notes: [
                { freq: 174.61, dur: 0.8 },  // F3
                { freq: 220.00, dur: 0.8 },  // A3
                { freq: 261.63, dur: 0.8 },  // C4
                { freq: 233.08, dur: 1.0 }   // Bb3
            ]
        }
    },

    // ---------------- EFFETTI SONORI ----------------
    sfx: {
        sigillo_rotto: [
            { freq: 300, dur: 0.04, type: "sawtooth" },
            { freq: 180, dur: 0.06, type: "sawtooth" }
        ],
        oggetto: [
            { freq: 660, dur: 0.06 },
            { freq: 880, dur: 0.1 }
        ],
        porta_cigolio: [
            { freq: 220, dur: 0.15, type: "sawtooth" },
            { freq: 200, dur: 0.15, type: "sawtooth" },
            { freq: 180, dur: 0.2, type: "sawtooth" },
            { freq: 210, dur: 0.15, type: "sawtooth" }
        ],
        presagio: [
            { freq: 466, dur: 0.15, type: "triangle" },
            { freq: 440, dur: 0.15, type: "triangle" },
            { freq: 220, dur: 0.35, type: "triangle" }
        ],
        sussurro: [
            { freq: 300, dur: 0.12, type: "sine", volume: 0.03 },
            { freq: 260, dur: 0.18, type: "sine", volume: 0.025 }
        ],
        cigolio_muro: [
            { freq: 90, dur: 0.1, type: "square" },
            { freq: 70, dur: 0.15, type: "square" },
            { freq: 90, dur: 0.1, type: "square" },
            { freq: 70, dur: 0.2, type: "square" }
        ],
        impatto: [
            { freq: 180, dur: 0.08, type: "sawtooth" },
            { freq: 90, dur: 0.12, type: "sawtooth" },
            { freq: 50, dur: 0.25, type: "sawtooth" }
        ],
        carta_furtiva: [
            { freq: 900, dur: 0.04, type: "sine", volume: 0.03 },
            { freq: 1100, dur: 0.05, type: "sine", volume: 0.025 },
            { freq: 850, dur: 0.04, type: "sine", volume: 0.02 }
        ]
    },

    nodes: {

        // ============================================================
        // PARTENZA
        // ============================================================

        intro_letter: {
            location: "STUDIO DEL DOTTOR WREN — ALDERBROOK",
            music: "home",
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <rect x="70" y="55" width="160" height="75" />
                <path d="M70,55 L150,105 L230,55" />
                <rect x="95" y="18" width="110" height="55" fill="var(--color-bg)" />
                <line x1="105" y1="33" x2="185" y2="33" />
                <line x1="105" y1="43" x2="185" y2="43" />
                <line x1="105" y1="53" x2="160" y2="53" />
                <circle cx="150" cy="92" r="12" />
                <line x1="245" y1="28" x2="270" y2="88" />
                <path d="M245,28 Q233,18 250,8" />
            </svg>`,
            text: "La sera è già scesa quando il messaggero bussa. Arthur Wren posa la penna, i registri dei pazienti ancora aperti sulla scrivania, e riceve una busta sporca di fango di strada.\n\nLa calligrafia sulla busta è quella di Edmund Ashcombe — ma tremante, affrettata, così diversa dalla mano ordinata che ricordava dai tempi dell'università. Arthur rompe il sigillo.\n\nLe righe sono poche, scritte di fretta: parlano di rumori nella notte, della salute di Constance che peggiora, e di un 'vieni prima che sia troppo tardi' senza altra spiegazione. Non è da Edmund, scrivere così.",
            onArrive: [
                { type: "playSfx", sfx: "sigillo_rotto" },
                {
                    type: "addItem", id: "lettera_edmund", name: "Lettera di Edmund", desc: "Poche righe frettolose, macchiate d'inchiostro.",
                    examine: "'Arthur — perdonami la fretta, ma non ho tempo da perdere in cortesie. Le cose qui a Blackthorn Hall non vanno. Constance non sta bene, i medici del paese non sanno che pesci pigliare, o forse hanno troppa paura per dirlo apertamente. Ci sono rumori, la notte. Nei muri. Non oso scrivere altro su questa carta. Vieni, ti prego, e vieni presto — vieni prima che sia troppo tardi. Il tuo E.A.'\n\nRileggendola con più calma, noti che l'inchiostro trema visibilmente verso la fine, come se la mano di chi scriveva avesse esitato — o avesse sentito qualcosa.",
                    examineEffects: [
                        { type: "setFlag", flag: "noticedTremor", value: true },
                        { type: "modifyStat", stat: "indagine", delta: 1 }
                    ]
                },
                { type: "addLog", title: "LA LETTERA DI EDMUND", entry: "Edmund Ashcombe scrive da Blackthorn Hall: rumori notturni, la salute di Constance in declino. 'Vieni prima che sia troppo tardi.'" }
            ],
            options: [
                { text: "> Chiedi al messaggero se sa qualcosa di più", target: "messenger_query" },
                { text: "> Guarda ancora un momento lo studio, prima di partire", target: "study_details" },
                { text: "> Ripensa a come conobbe Edmund, tanti anni fa", target: "university_memories" },
                { text: "> Non c'è tempo da perdere: prepara i bagagli", target: "packing" }
            ]
        },

        study_details: {
            location: "STUDIO DEL DOTTOR WREN",
            text: "Lo studio è piccolo ma ordinato: scaffali di testi di medicina, un microscopio ereditato dal suo maestro a Edimburgo, e sulla scrivania una fotografia in una cornice d'argento — Eleanor, sua moglie, morta di febbre puerperale quasi sei anni fa insieme al bambino che portava in grembo. Da allora Arthur ha riempito ogni ora vuota con il lavoro, i pazienti, i libri. Non ha più avuto, in fondo, una vera ragione per restare fermo in un posto — né per lasciarlo, finché qualcuno come Edmund non gliene desse motivo.",
            onArrive: [
                { type: "addLog", title: "ELEANOR", entry: "Sua moglie Eleanor è morta quasi sei anni fa. Da allora, il lavoro ha riempito il vuoto." }
            ],
            options: [
                { text: "> Chiedi al messaggero se sa qualcosa di più", target: "messenger_query" },
                { text: "> Ripensa a come conobbe Edmund, tanti anni fa", target: "university_memories" },
                { text: "> Non c'è tempo da perdere: prepara i bagagli", target: "packing" }
            ]
        },

        university_memories: {
            location: "STUDIO DEL DOTTOR WREN",
            text: "Cambridge, quindici anni prima: Arthur, figlio di un medico di provincia, e Edmund, erede di una delle famiglie più antiche della contea, si erano ritrovati compagni di stanza per puro capriccio dell'amministrazione universitaria. Non sarebbe dovuta funzionare, quell'amicizia — troppo diversi per censo, per temperamento — eppure Edmund era stato l'unico, tra tutti i rampolli di buona famiglia, a trattarlo mai come un pari e mai come un progetto di carità. Gli deve, se non altro, questo viaggio.",
            onArrive: [
                { type: "addLog", title: "L'AMICIZIA CON EDMUND", entry: "Compagni di stanza a Cambridge, quindici anni fa. Edmund fu l'unico a trattarlo sempre da pari." }
            ],
            options: [
                { text: "> Chiedi al messaggero se sa qualcosa di più", target: "messenger_query" },
                { text: "> Guarda ancora un momento lo studio, prima di partire", target: "study_details" },
                { text: "> Non c'è tempo da perdere: prepara i bagagli", target: "packing" }
            ]
        },

        messenger_query: {
            location: "STUDIO DEL DOTTOR WREN",
            text: "Il messaggero, un ragazzo del villaggio vicino ad Alderbrook, si stringe nelle spalle. 'So solo che m'hanno pagato per portarla in fretta, signore. Ma laggiù, a Blackthorn Hall...' esita, poi scuote la testa. 'La gente non ci va più volentieri, ecco tutto. Da quando il vecchio Lord è morto, dicono che quella casa non sia più la stessa.' Non aggiunge altro, e non sembra intenzionato a farlo.",
            onArrive: [
                { type: "addLog", title: "VOCI SU ALDERBROOK", entry: "Il messaggero conferma solo che la gente del posto evita Blackthorn Hall 'da quando il vecchio Lord è morto'." },
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Guarda ancora un momento lo studio, prima di partire", target: "study_details" },
                { text: "> Ripensa a come conobbe Edmund, tanti anni fa", target: "university_memories" },
                { text: "> Non c'è tempo da perdere: prepara i bagagli", target: "packing" }
            ]
        },

        packing: {
            location: "CASA DEL DOTTOR WREN",
            text: "Mentre prepara la valigia, lo sguardo di Arthur cade sullo sgabuzzino in fondo al corridoio, dove tiene una vecchia lanterna a olio — utile per le visite notturne ai pazienti di campagna, quando i lampioni a gas finiscono ben prima delle strade.",
            options: [
                {
                    text: "> Prendi la lanterna a olio",
                    target: "packing_revolver",
                    effects: [
                        { type: "setFlag", flag: "hasLamp", value: true },
                        {
                            type: "addItem", id: "lanterna", name: "Lanterna a olio", desc: "Vecchia ma affidabile.",
                            examine: "Il vetro è incrinato in un angolo ma la fiamma tiene bene. L'ha portata in decine di case buie, di notte, per parti difficili e febbri improvvise. Non l'ha mai delusa."
                        },
                        { type: "playSfx", sfx: "oggetto" }
                    ]
                },
                { text: "> Lasciala: sarà solo una breve visita a un amico", target: "packing_revolver" }
            ]
        },

        packing_revolver: {
            location: "CASA DEL DOTTOR WREN",
            text: "Nell'ultimo cassetto della scrivania, sotto vecchie carte, la mano di Arthur sfiora il revolver che fu di suo padre. Non l'ha mai portato con sé per una visita, prima d'ora. Ma la lettera di Edmund non è come le altre.",
            options: [
                {
                    text: "> Prendi il vecchio revolver di famiglia",
                    target: "packing_thoughts",
                    effects: [
                        { type: "setFlag", flag: "hasRevolver", value: true },
                        {
                            type: "addItem", id: "revolver", name: "Revolver di famiglia", desc: "Appartenuto a suo padre.",
                            examine: "Un'arma vecchio stile, curata con più affetto che necessità negli anni. Arthur non l'ha mai usata contro nulla di vivo. Spera non gli servirà nemmeno stavolta."
                        },
                        { type: "playSfx", sfx: "oggetto" }
                    ]
                },
                { text: "> Lascialo: è solo una visita a un vecchio amico, non una spedizione", target: "packing_thoughts" }
            ]
        },

        packing_thoughts: {
            location: "CASA DEL DOTTOR WREN",
            text: "Chiude la valigia. Per un istante pensa ai pazienti che dovrà lasciare per qualche giorno, alla routine tranquilla di Alderbrook — poi rilegge mentalmente le parole di Edmund, 'vieni prima che sia troppo tardi', e ogni esitazione svanisce. Al mattino presto è già alla stazione.",
            options: [
                { text: "> Parti per Blackthorn Hall", target: "journey_train" }
            ]
        },

        // ============================================================
        // IL VIAGGIO E L'ARRIVO
        // ============================================================

        journey_train: {
            location: "TRENO PER ALDERBROOK",
            music: "journey",
            text: "Il treno lascia presto la città alle spalle. Colline, siepi, villaggi di pietra grigia scorrono fuori dal finestrino, e col passare delle ore la campagna si fa più selvaggia, meno curata. Verso il tardo pomeriggio una nebbia sottile inizia a salire dai campi, anche se il sole non è ancora tramontato — un dettaglio che Arthur, uomo di scienza, si sforza di non trovare inquietante.",
            options: [
                { text: "> Un compagno di viaggio attacca discorso", target: "train_stranger" },
                { text: "> Osserva il paesaggio in silenzio, immerso nei pensieri", target: "arrival_gates" }
            ]
        },

        train_stranger: {
            location: "TRENO PER ALDERBROOK",
            text: "Un uomo anziano seduto di fronte, notando la destinazione scritta sul suo biglietto, inarca un sopracciglio. 'Blackthorn Hall, dice? Vecchia famiglia, gli Ashcombe. Vecchia e...' si interrompe, sceglie le parole con cura, 'particolare. Mio nonno diceva che certe famiglie con troppa terra e troppa storia finiscono per dovere qualcosa a qualcosa, se capisce cosa intendo.' Non capisce, ma qualcosa nel tono dell'uomo gli fa venire la pelle d'oca.",
            onArrive: [
                { type: "addLog", title: "SUPERSTIZIONI LOCALI", entry: "Un passeggero allude a un debito antico della famiglia Ashcombe, senza spiegarsi oltre." },
                { type: "modifyStat", stat: "nervi", delta: -1 },
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Prosegui verso Blackthorn Hall", target: "arrival_gates" }
            ]
        },

        arrival_gates: {
            location: "CANCELLO DI BLACKTHORN HALL",
            music: "arrival",
            art: `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <path d="M90,90 L90,58 L150,18 L210,58 L210,90" />
                <rect x="105" y="68" width="20" height="22" />
                <rect x="175" y="68" width="20" height="22" />
                <rect x="140" y="72" width="20" height="18" />
                <path d="M40,150 L55,98 L70,150" />
                <path d="M230,150 L245,93 L260,150" />
                <line x1="60" y1="158" x2="60" y2="98" />
                <line x1="240" y1="158" x2="240" y2="98" />
                <path d="M60,98 Q150,68 240,98" />
                <line x1="90" y1="158" x2="90" y2="103" />
                <line x1="120" y1="158" x2="120" y2="98" />
                <line x1="150" y1="158" x2="150" y2="96" />
                <line x1="180" y1="158" x2="180" y2="98" />
                <line x1="210" y1="158" x2="210" y2="103" />
            </svg>`,
            text: "La carrozza a noleggio si ferma davanti a un cancello di ferro battuto, arrugginito, semiaperto su un viale che si perde nel verde. Oltre gli alberi, appena visibile nella luce che cala, la sagoma di Blackthorn Hall — enorme, silenziosa, con più finestre buie che illuminate.",
            onArrive: [
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Osserva il giardino incolto prima di entrare", target: "grounds_garden" },
                { text: "> Attraversa il cancello e avvicinati alla casa", target: "arrival_pemberton" }
            ]
        },

        grounds_garden: {
            location: "GIARDINO DI BLACKTHORN HALL",
            text: "Quello che doveva essere un giardino ordinato è ormai un groviglio di rovi ed erbacce. Una statua — un angelo, forse, o un bambino, è difficile dirlo — giace spezzata a metà tra le foglie morte, il volto eroso dal tempo o forse deliberatamente scalpellato via.",
            onArrive: [
                { type: "addLog", title: "IL GIARDINO", entry: "Statua spezzata e volto cancellato nel giardino incolto — nessuno cura questo posto da anni." },
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Attraversa il cancello e avvicinati alla casa", target: "arrival_pemberton" }
            ]
        },

        // ============================================================
        // L'INGRESSO E LA REUNION
        // ============================================================

        arrival_pemberton: {
            location: "INGRESSO DI BLACKTHORN HALL",
            music: "house_day",
            text: "La porta si apre prima ancora che Arthur bussi. Una donna anziana in nero, la schiena dritta come un fuso, lo osserva con una cortesia troppo formale per essere calorosa. 'Dottor Wren, presumo. Il signor Ashcombe l'aspetta. Sono Mrs. Pemberton — governante di questa casa da prima che il signor Edmund nascesse.' Non aggiunge altro, e si volta per farlo entrare.",
            options: [
                { text: "> Prova a fare due chiacchiere con la governante", target: "pemberton_smalltalk" },
                { text: "> Dai un'occhiata ai ritratti appesi nell'ingresso", target: "hall_portraits" },
                { text: "> Seguila dentro, verso Edmund", target: "arrival_edmund" }
            ]
        },

        pemberton_smalltalk: {
            location: "INGRESSO DI BLACKTHORN HALL",
            text: "Arthur tenta un commento cortese sul viaggio, sul tempo. Mrs. Pemberton risponde con monosillabi impeccabili e un sorriso che non raggiunge mai gli occhi. È chiaro che con lei la cordialità spicciola non funziona — servirà ben altro, se mai vorrà parlare davvero.",
            onArrive: [
                { type: "addLog", title: "MRS. PEMBERTON", entry: "Cortese ma impenetrabile. La cordialità superficiale non basta a farla parlare." }
            ],
            options: [
                { text: "> Dai un'occhiata ai ritratti appesi nell'ingresso", target: "hall_portraits" },
                { text: "> Seguila dentro, verso Edmund", target: "arrival_edmund" }
            ]
        },

        hall_portraits: {
            location: "INGRESSO DI BLACKTHORN HALL",
            text: "Una fila di ritratti sorveglia l'ingresso — generazioni di Ashcombe in abiti d'epoca, sguardi severi dipinti a olio. Uno in particolare attira la sua attenzione: un uomo dai lineamenti duri, una targhetta d'ottone alla base che recita 'Lord Josiah Ashcombe, 1791-1856'.",
            options: [
                {
                    text: "> Osserva con attenzione il ritratto di Josiah",
                    target: "arrival_edmund",
                    skillCheck: { stat: "indagine", difficulty: 5, success: "hall_portraits_notice", failure: "hall_portraits_nothing" }
                },
                { text: "> Non c'è tempo per i quadri: raggiungi Edmund", target: "arrival_edmund" }
            ]
        },

        hall_portraits_notice: {
            location: "INGRESSO DI BLACKTHORN HALL",
            text: "Più lo osserva, più Arthur nota un dettaglio strano: qualunque punto dell'ingresso scelga, gli occhi dipinti di Josiah Ashcombe sembrano sempre puntati esattamente su di lui. Sa che è un trucco della prospettiva pittorica, comune in questo tipo di ritratti — eppure non riesce a scrollarsi di dosso la sensazione di essere osservato.",
            onArrive: [
                { type: "setFlag", flag: "noticedJoshiahEyes", value: true },
                { type: "addLog", title: "LORD JOSIAH", entry: "Il ritratto di Josiah Ashcombe (1791-1856) sembra seguire chi si muove nell'ingresso." },
                { type: "playSfx", sfx: "presagio" }
            ],
            options: [
                { text: "> Raggiungi Edmund", target: "arrival_edmund" }
            ]
        },

        hall_portraits_nothing: {
            location: "INGRESSO DI BLACKTHORN HALL",
            text: "Un ritratto come tanti altri, si dice — un antenato austero come tutti gli antenati dipinti nei corridoi di famiglia. Non c'è tempo da perdere in fantasie: Edmund lo aspetta.",
            options: [
                { text: "> Raggiungi Edmund", target: "arrival_edmund" }
            ]
        },

        arrival_edmund: {
            location: "SALOTTO PRINCIPALE",
            text: "Edmund è in piedi davanti al camino spento, più magro di come Arthur lo ricordava, le occhiaie profonde di chi non dorme da settimane. Quando lo vede, un sollievo genuino gli attraversa il volto — ma dura solo un istante, prima che la cautela riprenda il sopravvento. 'Arthur. Sei venuto.' Non sembra sorpreso quanto grato.",
            options: [
                {
                    text: "> Abbraccialo e chiedigli subito cosa sta succedendo",
                    target: "dinner",
                    effects: [ { type: "modifyStat", stat: "fiducia", delta: 1 } ]
                },
                {
                    text: "> Sii cauto: lascia che sia lui a parlare, quando sarà pronto",
                    target: "dinner",
                    effects: [ { type: "modifyStat", stat: "indagine", delta: 1 } ]
                },
                { text: "> Chiedigli un momento da solo, lontano da orecchie indiscrete", target: "edmund_aside" }
            ]
        },

        edmund_aside: {
            location: "SALOTTO PRINCIPALE",
            text: "Edmund lancia un'occhiata alla porta, poi abbassa la voce. 'Non qui. Non con Pemberton che gira per casa.' Per un istante sembra sul punto di dire qualcosa di importante — poi scuote la testa. 'Dopo cena. Ti prego, Arthur, abbi pazienza con me. Non è che non mi fidi di te. È che a dirlo ad alta voce... diventa vero.' Il sollievo di avere un amico vicino, però, è visibile sul suo volto.",
            onArrive: [
                { type: "modifyStat", stat: "fiducia", delta: 1 },
                { type: "addLog", title: "EDMUND TRATTIENE QUALCOSA", entry: "'A dirlo ad alta voce diventa vero,' dice Edmund. Promette di parlare dopo cena." }
            ],
            options: [
                { text: "> Rispetta la sua richiesta, per ora", target: "dinner" }
            ]
        },

        // ============================================================
        // LA CENA
        // ============================================================

        dinner: {
            location: "SALA DA PRANZO",
            text: "La cena si consuma in un salone troppo grande per due persone sole, il servizio d'argento che tintinna nel silenzio. Edmund parla di cose superficiali — il raccolto, la ferrovia, vecchi conoscenti comuni — evitando con cura ogni domanda che si avvicini troppo al motivo della lettera. Di Constance, non fa parola.",
            options: [
                {
                    text: "> Chiedi apertamente notizie di Constance",
                    target: "retiring",
                    effects: [
                        { type: "modifyStat", stat: "nervi", delta: -1 },
                        { type: "modifyStat", stat: "indagine", delta: 1 },
                        { type: "addLog", title: "IL SILENZIO SU CONSTANCE", entry: "Alla domanda diretta, Edmund risponde solo che sua sorella 'non sta bene' e cambia argomento." }
                    ]
                },
                { text: "> Lascia correre: è ancora presto per insistere", target: "retiring" },
                { text: "> Nota il posto apparecchiato ma vuoto in fondo al tavolo", target: "dinner_empty_seat" },
                { text: "> Osserva i dettagli della sala mentre si parla del più e del meno", target: "dinner_local_color" },
                { text: "> Chiedi di suo padre, il vecchio Lord Ashcombe", target: "dinner_father" },
                { text: "> Nota quanto sembra nervoso il personale di servizio", target: "dinner_staff_unease" }
            ]
        },

        dinner_father: {
            location: "SALA DA PRANZO",
            text: "Alla menzione del padre, qualcosa nello sguardo di Edmund si irrigidisce. 'È morto tre anni fa. Malattia di famiglia, dicono i medici del paese — un lento declino delle facoltà mentali, non diverso da quello che portò via anche nostro nonno, a suo tempo.' Beve un sorso di vino prima di continuare, quasi controvoglia: 'A quanto pare è cosa che si tramanda, negli Ashcombe. Una specie di... maledizione di famiglia, se si crede alle superstizioni di paese. Io preferisco pensare fosse solo malattia.' Il modo in cui lo dice, però, non suona affatto convinto.",
            onArrive: [
                { type: "addLog", title: "LA 'MALATTIA DI FAMIGLIA'", entry: "Il padre e il nonno di Edmund sono morti dello stesso 'lento declino mentale'. Lui la chiama malattia. Non sembra crederci del tutto." }
            ],
            options: [
                { text: "> Torna alla conversazione", target: "dinner" }
            ]
        },

        dinner_staff_unease: {
            location: "SALA DA PRANZO",
            text: "Il giovane valletto che versa il vino ha le mani che tremano appena, gli occhi che scattano verso le finestre ad ogni scricchiolio della vecchia casa. Non è il nervosismo di chi serve per la prima volta a tavola — è qualcosa di più simile alla paura, accuratamente mascherata sotto un contegno professionale che sembra costargli uno sforzo evidente.",
            onArrive: [
                { type: "addLog", title: "IL NERVOSISMO DELLA SERVITÙ", entry: "Anche il personale di servizio sembra vivere nella paura, non solo nella discrezione." }
            ],
            onArriveOnce: [
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Torna alla conversazione", target: "dinner" }
            ]
        },

        dinner_empty_seat: {
            location: "SALA DA PRANZO",
            text: "In fondo al tavolo, un posto è apparecchiato con la stessa cura degli altri — tovagliolo piegato, bicchiere pulito — eppure nessuno vi si siede, e nessuno lo nomina. Arthur immagina sia il posto di Constance. Il fatto che venga comunque preparato ogni sera, per un'assenza che tutti fingono di non notare, gli sembra più inquietante di una sedia vuota e basta.",
            onArrive: [
                { type: "addLog", title: "IL POSTO DI CONSTANCE", entry: "Apparecchiato ogni sera, mai occupato, mai nominato." }
            ],
            options: [
                { text: "> Torna alla conversazione", target: "dinner" }
            ]
        },

        dinner_local_color: {
            location: "SALA DA PRANZO",
            text: "L'argenteria porta lo stemma di famiglia, consumato da generazioni di lucidatura. Il vino è buono ma la bottiglia ha evidentemente anni sul groppone, presa da una cantina che nessuno rifornisce più con regolarità. Ogni dettaglio di Blackthorn Hall racconta la stessa storia: una ricchezza antica che si mantiene per inerzia, non più per cura.",
            options: [
                { text: "> Torna alla conversazione", target: "dinner" }
            ]
        },

        // ============================================================
        // LA NOTTE
        // ============================================================

        retiring: {
            location: "STANZA DEGLI OSPITI",
            music: "night",
            theme: { colorMain: "#8fa8bd", colorDim: "#5c7285" },
            text: "Mrs. Pemberton lo accompagna nella stanza degli ospiti, nell'ala est della casa. 'Se le serve qualcosa, signore, tiri il cordone del campanello. Sebbene, di notte...' si interrompe, e per la prima volta la sua compostezza vacilla appena. '...di notte è meglio non girare troppo per la casa.' Poi se ne va, senza aggiungere altro.",
            options: [
                { text: "> Esamina la stanza prima di coricarti", target: "room_details" },
                { text: "> Affacciati alla finestra, verso il giardino", target: "window_silhouette" },
                { text: "> Nel corridoio, una cameriera sta spegnendo le candele", target: "corridor_agnes" },
                { text: "> Esplora il corridoio verso l'ala ovest", target: "westwing_door" },
                { text: "> Prima di dormire, sbircia nella biblioteca poco distante", target: "library_glance" },
                { text: "> Una porta socchiusa in fondo al corridoio lascia filtrare un lamento sommesso", target: "constance_glimpse" },
                { text: "> Sei stanco dal viaggio: prova a dormire", target: "night_sounds" }
            ]
        },

        constance_glimpse: {
            location: "CORRIDOIO DELL'ALA EST",
            text: "Attraverso lo spiraglio di una porta socchiusa, Arthur scorge una giovane donna seduta accanto alla finestra, il volto pallido illuminato dalla luna — dev'essere Constance. Lei si accorge di lui e, invece di allontanarsi spaventata, gli fa cenno di avvicinarsi. 'Lei è l'amico di Edmund,' sussurra, la voce roca come se parlasse poco, di rado. 'Non si fidi. Non di quello che mio fratello sta per fare.' Prima che Arthur possa chiedere altro, dei passi decisi risuonano in fondo al corridoio — Mrs. Pemberton — e Constance richiude la porta con un gesto rapido, quasi impaurito.",
            onArrive: [
                { type: "addLog", title: "CONSTANCE", entry: "'Non si fidi di quello che mio fratello sta per fare,' sussurra Constance, prima di richiudersi in fretta." },
                { type: "playSfx", sfx: "sussurro" }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "metConstance", value: true },
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Allontanati prima che Mrs. Pemberton ti trovi lì", target: "retiring" }
            ]
        },

        room_details: {
            location: "STANZA DEGLI OSPITI",
            text: "La stanza è arredata con gusto vittoriano ormai fuori moda — pesanti tende di velluto, un armadio scuro che scricchiola nel silenzio. Sopra il caminetto, un dipinto raffigura Blackthorn Hall vista dal giardino, ma qualcosa nella prospettiva non torna: una delle finestre dell'ala ovest, nel quadro, è illuminata. Nella realtà, quell'ala è buia e sigillata da anni, per quanto ne sa.",
            onArrive: [
                { type: "addLog", title: "IL DIPINTO SBAGLIATO", entry: "Un vecchio dipinto della casa mostra una finestra illuminata nell'ala ovest — oggi sigillata e buia." }
            ],
            onArriveOnce: [
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Torna a considerare la stanza", target: "retiring" }
            ]
        },

        window_silhouette: {
            location: "STANZA DEGLI OSPITI — FINESTRA",
            art: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <rect x="20" y="10" width="120" height="130" />
                <line x1="80" y1="10" x2="80" y2="140" />
                <line x1="20" y1="75" x2="140" y2="75" />
                <path d="M170,140 L185,80 L200,140" />
                <path d="M250,140 L262,95 L274,140" />
                <path d="M212,140 L212,110 Q212,102 224,102 Q236,102 236,110 L236,140 Z" fill="var(--color-dim)" stroke="none" />
                <circle cx="224" cy="94" r="8" fill="var(--color-dim)" stroke="none" />
            </svg>`,
            text: "Il giardino, sotto la luna velata di foschia, è immobile e silenzioso. Per un istante, però, tra gli alberi al margine del prato, Arthur crede di scorgere una sagoma ferma — alta, immobile, rivolta verso la casa. Sbatte le palpebre, e quando riguarda non c'è più nulla. Poteva essere un cervo. Poteva essere un ramo spezzato dal vento. Il suo battito cardiaco, però, non sembra convinto di nessuna delle due spiegazioni.",
            onArrive: [
                { type: "addLog", title: "LA SAGOMA NEL GIARDINO", entry: "Una figura immobile tra gli alberi, rivolta verso la casa. Scomparsa in un battito di ciglia." },
                { type: "playSfx", sfx: "presagio" }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "sawSilhouette", value: true },
                { type: "modifyStat", stat: "nervi", delta: -2 }
            ],
            options: [
                { text: "> Allontanati dalla finestra", target: "retiring" }
            ]
        },

        corridor_agnes: {
            location: "CORRIDOIO DELL'ALA EST",
            text: "Una giovane cameriera, intenta a spegnere le candele lungo il corridoio, sussulta vedendolo. 'Oh! Scusi, signore, non volevo... 'Si chiama Agnes, scopre, ed è l'unica persona in casa disposta a parlare con qualcosa che somigli alla sincerità. Abbassa la voce: 'Lei è amico del signor Edmund, vero? Allora forse la ascolterà. Dica alla signorina Constance che non è pazza. Qualunque cosa dicano in paese, non è pazzia quella che ha.' Prima che Arthur possa chiedere altro, sente dei passi e si affretta via.",
            onArrive: [
                { type: "addLog", title: "AGNES", entry: "'Non è pazzia quella che ha la signorina Constance,' dice la cameriera, prima di allontanarsi in fretta." },
                { type: "playSfx", sfx: "sussurro" }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "talkedToAgnes", value: true },
                { type: "setFlag", flag: "knowsLayout", value: true },
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Torna verso la tua stanza", target: "retiring" }
            ]
        },

        westwing_door: {
            location: "ALA OVEST — PORTA SIGILLATA",
            text: "Il corridoio verso l'ala ovest termina in una pesante porta di quercia, chiusa da un lucchetto che sembra più recente del resto della casa. Da sotto la porta filtra una corrente d'aria fredda, sorprendente per una casa altrimenti così soffocante. Non c'è modo di aprirla, non stanotte — ma Arthur si ripromette di scoprire cosa Edmund tenga così ostinatamente chiuso.",
            onArrive: [
                { type: "setFlag", flag: "knowsLayout", value: true },
                { type: "addLog", title: "L'ALA OVEST SIGILLATA", entry: "Una porta di quercia, lucchetto recente, corrente d'aria fredda da sotto la soglia." },
                { type: "playSfx", sfx: "porta_cigolio" }
            ],
            options: [
                { text: "> Torna verso la tua stanza", target: "retiring" }
            ]
        },

        library_glance: {
            location: "BIBLIOTECA",
            music: "library",
            theme: { colorMain: "#d4a441", colorDim: "#8a6a28" },
            art: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <rect x="10" y="10" width="90" height="130" />
                <line x1="10" y1="45" x2="100" y2="45" />
                <line x1="10" y1="80" x2="100" y2="80" />
                <line x1="10" y1="115" x2="100" y2="115" />
                <line x1="25" y1="10" x2="25" y2="130" />
                <line x1="40" y1="10" x2="40" y2="130" />
                <line x1="55" y1="10" x2="55" y2="130" />
                <line x1="70" y1="10" x2="70" y2="130" />
                <line x1="85" y1="10" x2="85" y2="130" />
                <ellipse cx="200" cy="112" rx="70" ry="18" />
                <line x1="150" y1="112" x2="150" y2="140" />
                <line x1="250" y1="112" x2="250" y2="140" />
                <path d="M175,102 L200,94 L225,102" />
                <line x1="255" y1="97" x2="255" y2="72" />
                <path d="M240,72 L270,72 L262,52 L248,52 Z" />
            </svg>`,
            text: "La porta della biblioteca è socchiusa. Dentro, scaffali di quercia scura arrivano fino al soffitto, carichi di volumi che sembrano non essere stati spolverati da anni — eppure, stranamente, alcuni dorsi sono più consumati di altri, come se qualcuno li consultasse spesso. Un tavolo al centro della stanza è ingombro di carte. Arthur sa che dovrebbe essere a letto, ma la curiosità è più forte del sonno.",
            options: [
                { text: "> Sfoglia l'albero genealogico della famiglia", target: "library_genealogy" },
                { text: "> Osserva i volumi più antichi sugli scaffali alti", target: "library_old_books" },
                {
                    text: "> Dai un'occhiata alle carte sparse sul tavolo",
                    target: "library_desk",
                    condition: { type: "flag", flag: "deskExamined", equals: false }
                },
                {
                    text: "> Dai un'occhiata alle carte sparse sul tavolo",
                    target: "library_desk_revisited",
                    condition: { type: "flag", flag: "deskExamined" }
                },
                { text: "> È tardi: torna verso la tua stanza", target: "retiring" }
            ]
        },

        library_genealogy: {
            location: "BIBLIOTECA — ALBERO GENEALOGICO",
            text: "Un enorme volume rilegato in pelle raccoglie l'albero genealogico degli Ashcombe, generazione dopo generazione, fin dal Seicento. Arthur nota però qualcosa di strano: due nomi, in due punti diversi dell'albero — sempre un primogenito, sempre a distanza di circa due generazioni l'uno dall'altro — sono stati accuratamente cancellati con l'inchiostro, al punto da rendere la carta quasi consumata in quei punti. Non manomessi per errore: cancellati con cura, con pazienza, come se qualcuno non volesse che restasse traccia.",
            onArrive: [
                { type: "addLog", title: "I NOMI CANCELLATI", entry: "Nell'albero genealogico, due primogenoti Ashcombe sono stati cancellati con cura, a distanza di circa due generazioni l'uno dall'altro." }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "knowsFamilyHistory", value: true },
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Osserva anche i volumi più antichi", target: "library_old_books" },
                { text: "> Dai un'occhiata alle carte sul tavolo", target: "library_desk" },
                { text: "> Torna verso la tua stanza", target: "retiring" }
            ]
        },

        library_old_books: {
            location: "BIBLIOTECA — SCAFFALI ALTI",
            text: "I volumi più antichi trattano di argomenti che stridono con la razionalità vittoriana del resto della casa: trattati di botanica esoterica, resoconti di viaggio in terre remote, un paio di testi di filosofia naturale che sfiorano l'occulto più che la scienza. Uno in particolare, più consumato degli altri, porta sul dorso solo le iniziali 'J.A.' impresse in oro. Arthur prova ad aprirlo, ma il testo è in un latino talmente arcaico e specialistico da restargli quasi incomprensibile.",
            onArrive: [
                { type: "addLog", title: "IL LIBRO DI J.A.", entry: "Un volume antico, iniziali 'J.A.' in oro sul dorso, testo in un latino troppo arcaico da decifrare stanotte." }
            ],
            onArriveOnce: [
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Sfoglia anche l'albero genealogico", target: "library_genealogy" },
                { text: "> Dai un'occhiata alle carte sul tavolo", target: "library_desk" },
                { text: "> Torna verso la tua stanza", target: "retiring" }
            ]
        },

        library_desk: {
            location: "BIBLIOTECA — SCRIVANIA DI EDMUND",
            text: "Le carte sul tavolo sono chiaramente opera di Edmund: appunti fitti, alcuni depennati con foga, in mezzo a libri di religione comparata e folklore locale aperti a metà. Una frase, sottolineata due volte, cattura l'attenzione di Arthur: 'deve esistere un modo per sciogliere un legame senza pagarne il prezzo intero.' Non è chiaro a cosa si riferisca — ma il tono, disperato più che accademico, dice più di quanto Edmund abbia mai detto a voce alta.",
            options: [
                {
                    text: "> Osserva le carte senza toccarle",
                    target: "library_glance",
                    effects: [
                        { type: "modifyStat", stat: "indagine", delta: 1 },
                        { type: "addLog", title: "LE RICERCHE DI EDMUND", entry: "'Deve esistere un modo per sciogliere un legame senza pagarne il prezzo intero,' ha scritto Edmund." },
                        { type: "setFlag", flag: "deskExamined", value: true }
                    ]
                },
                {
                    text: "> Prendi discretamente uno dei fogli di appunti",
                    target: "library_glance",
                    effects: [
                        { type: "modifyStat", stat: "fiducia", delta: -1 },
                        {
                            type: "addItem", id: "appunti_edmund", name: "Appunti di Edmund", desc: "Un foglio sottratto dalla sua scrivania.",
                            examine: "'...un legame senza pagarne il prezzo intero. Ho provato ogni via nei testi di Josiah, ma ogni pagina mi riporta alla stessa conclusione che rifiuto di accettare. Deve esserci un'alternativa al patto. Deve.' Le parole 'il patto' sono sottolineate tre volte, con una violenza quasi visibile nel tratto di penna."
                        },
                        { type: "addLog", title: "UN FOGLIO SOTTRATTO", entry: "Hai preso un appunto di Edmund. Menziona 'il patto' — sottolineato tre volte." },
                        { type: "playSfx", sfx: "carta_furtiva" },
                        { type: "setFlag", flag: "deskExamined", value: true }
                    ]
                }
            ]
        },

        library_desk_revisited: {
            location: "BIBLIOTECA — SCRIVANIA DI EDMUND",
            text: "Le carte sulla scrivania sono le stesse di prima. Le ha già esaminate con attenzione — non c'è altro da scoprire qui, per ora.",
            options: [
                { text: "> Torna a considerare la biblioteca", target: "library_glance" }
            ]
        },

        night_sounds: {
            location: "STANZA DEGLI OSPITI — NOTTE FONDA",
            music: "danger",
            theme: { colorMain: "#b3552f", colorDim: "#7a3a1f" },
            text: "Arthur si sveglia di soprassalto. La casa è immersa nel silenzio più totale — troppo totale, se non fosse per un suono sordo, ritmico, che sembra provenire da dentro i muri stessi. Non è il vento. Non sono tubature che si raffreddano. È qualcosa che si muove, lentamente, in uno spazio che secondo ogni logica architettonica non dovrebbe esistere.",
            onArrive: [
                { type: "modifyStat", stat: "nervi", delta: -2 },
                { type: "addLog", title: "RUMORE NEI MURI", entry: "Un suono sordo e ritmico dentro i muri, nel cuore della notte. Non è il vento." },
                { type: "playSfx", sfx: "cigolio_muro" }
            ],
            options: [
                {
                    text: "> Alzati e scendi a controllare",
                    target: "night_investigate_safe",
                    condition: { any: [ { type: "flag", flag: "hasLamp" }, { type: "flag", flag: "knowsLayout" } ] }
                },
                {
                    text: "> Alzati e scendi a controllare",
                    target: "night_investigate_dark",
                    condition: { all: [ { type: "flag", flag: "hasLamp", equals: false }, { type: "flag", flag: "knowsLayout", equals: false } ] }
                },
                { text: "> Resta a letto: qualunque cosa sia, aspetterà fino a domani", target: "night_wait" }
            ]
        },

        night_investigate_safe: {
            location: "CORRIDOIO DI SERVIZIO",
            text: "Con la lanterna in mano — o forte della conoscenza della casa raccolta durante la giornata — Arthur scende con cautela verso la scala di servizio, da dove sembrava provenire il suono. Non trova nulla di conclusivo: solo una porta che dovrebbe essere chiusa a chiave, socchiusa, e un'impronta di fango fresco sul pavimento di pietra, diretta verso l'ala ovest. Il suono, ormai, è cessato del tutto.",
            onArrive: [
                { type: "modifyStat", stat: "nervi", delta: -1 },
                { type: "modifyStat", stat: "indagine", delta: 1 },
                { type: "addLog", title: "L'IMPRONTA NEL CORRIDOIO", entry: "Una porta socchiusa che dovrebbe essere chiusa a chiave, e un'impronta di fango fresco verso l'ala ovest." },
                { type: "playSfx", sfx: "porta_cigolio" }
            ],
            options: [
                { text: "> Torna a letto: ne parlerai con Edmund domani mattina", target: "act1_close" }
            ]
        },

        night_investigate_dark: {
            location: "SCALA DI SERVIZIO — BUIO TOTALE",
            music: "ending_death",
            theme: { colorMain: "#8b1e1e", colorDim: "#4a0f0f" },
            text: "Senza luce, e senza la minima idea di come sia fatta questa parte della casa, Arthur avanza a tentoni nel corridoio di servizio, una mano contro il muro freddo. Il suono si è fatto più vicino, più insistente — e proprio mentre si volta per capire da dove venga, il suo piede trova il vuoto invece di un gradino.\n\nLa caduta lungo la scala di servizio è breve, ma la testa sbatte contro la pietra con un suono secco che Arthur, da medico, riconosce anche mentre gli si spegne la coscienza. Nessuno lo troverà prima dell'alba.\n\n[FINALE PREMATURO — UN PASSO NEL BUIO]",
            onArrive: [
                { type: "playSfx", sfx: "impatto" }
            ],
            options: [
                { text: "> Torna al Menu Principale", target: "__mainMenu__" }
            ]
        },

        night_wait: {
            location: "STANZA DEGLI OSPITI — NOTTE FONDA",
            text: "Arthur resta immobile sotto le coperte, il cuore che batte forte, finché il suono non svanisce da solo. Il sonno che segue è leggero e pieno di sogni che non ricorderà, ma almeno arriva. Quando apre di nuovo gli occhi, una luce grigia e incerta filtra dalle tende: è mattina.",
            onArrive: [
                { type: "setFlag", flag: "waitedTillDawn", value: true },
                { type: "modifyStat", stat: "nervi", delta: 1 }
            ],
            options: [
                { text: "> Alzati: è ora di affrontare la giornata", target: "act1_close" }
            ]
        },

        // ============================================================
        // CHIUSURA ATTO I
        // ============================================================

        act1_close: {
            location: "BLACKTHORN HALL — ALL'ALBA",
            music: "ending_dawn",
            theme: { colorMain: "#e0b96b", colorDim: "#a3823f" },
            text: "La luce del mattino rende Blackthorn Hall quasi ordinaria — quasi. Arthur si veste con cura, ripensando alla notte appena trascorsa, alla lettera che lo ha portato fin qui, allo sguardo di Edmund carico di qualcosa che non è ancora riuscito a nominare. Oggi, si ripromette, otterrà delle risposte. Con o senza il permesso di nessuno.\n\n[FINE DELL'ATTO I — continua nell'Atto II]",
            options: [
                { text: "> Fine dell'Atto I (Atto II non ancora disponibile)", target: "__mainMenu__" }
            ]
        }
    }
};
