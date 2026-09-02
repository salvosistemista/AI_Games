/* ============================================================
   NEBBIE SU BLACKTHORN HALL — ATTO II: LE OMBRE DEL MATTINO
   ------------------------------------------------------------
   Stessa 'series' dell'Atto I: se giocato di seguito, eredita
   flag/stat/inventario/log tramite il meccanismo di continuità
   del motore. Giocabile anche da solo (default di initialState).
   ============================================================ */

const STORY = {
    meta: {
        id: "blackthorn-hall-act2",
        series: "blackthorn-hall",
        title: "Nebbie su Blackthorn Hall - Atto II: Le Ombre del Mattino",
        version: "0.1-atto2"
    },

    startNode: "dawn_wake",

    initialState: {
        flags: {
            // Ereditati dall'Atto I se presenti — questi sono i default per chi gioca solo l'Atto II
            hasLamp: false,
            hasRevolver: false,
            knowsLayout: false,
            talkedToAgnes: false,
            pembertonWarmedUp: false,
            noticedTremor: false,
            noticedJoshiahEyes: false,
            sawSilhouette: false,
            waitedTillDawn: false,
            metConstance: false,
            knowsFamilyHistory: false,
            deskExamined: false,
            // Nuovi dell'Atto II
            edmundConfessedPartial: false,
            hasWestWingKey: false,
            sawErasedGraves: false,
            readInscription: false,
            pickAttempted: false,
            scoutedGrounds: false
        },
        stats: {
            fiducia: 5,
            nervi: 10,
            indagine: 3
        },
        inventory: [
            {
                id: "borsa_medica", name: "Borsa medica", desc: "Gli strumenti del mestiere: non si sa mai.",
                examine: "Ferri chirurgici, bende pulite, una boccetta di laudano. Utile anche per aprire più di un tipo di serratura, a saperla usare."
            }
        ]
    },

    // ---------------- MUSICA ----------------
    music: {
        morning: {
            wave: "triangle",
            volume: 0.02,
            notes: [
                { freq: 261.63, dur: 0.8 },
                { freq: 329.63, dur: 0.8 },
                { freq: 392.00, dur: 0.8 },
                { freq: 349.23, dur: 1.0 }
            ]
        },
        grounds: {
            wave: "sine",
            volume: 0.02,
            notes: [
                { freq: 220.00, dur: 0.6 },
                { freq: 246.94, dur: 0.6 },
                { freq: 293.66, dur: 0.6 },
                { freq: 261.63, dur: 0.7 }
            ]
        },
        crypt: {
            wave: "sine",
            volume: 0.022,
            notes: [
                { freq: 87.31, dur: 1.6 },
                { freq: 103.83, dur: 1.6 },
                { freq: 116.54, dur: 1.6 },
                { freq: 98.00, dur: 1.9 }
            ]
        },
        danger: {
            wave: "sawtooth",
            volume: 0.02,
            notes: [
                { freq: 100.00, dur: 0.25 },
                { freq: 106.00, dur: 0.25 },
                { freq: 100.00, dur: 0.25 },
                { freq: 88.00, dur: 0.4 }
            ]
        },
        ending_death: {
            wave: "sawtooth",
            volume: 0.02,
            notes: [
                { freq: 155.56, dur: 0.9 },
                { freq: 138.59, dur: 0.9 },
                { freq: 116.54, dur: 0.9 },
                { freq: 98.00, dur: 1.4 }
            ]
        },
        threshold: {
            wave: "sine",
            volume: 0.022,
            notes: [
                { freq: 146.83, dur: 1.2 },
                { freq: 174.61, dur: 1.2 },
                { freq: 130.81, dur: 1.2 },
                { freq: 116.54, dur: 1.6 }
            ]
        }
    },

    // ---------------- EFFETTI SONORI ----------------
    sfx: {
        campana: [
            { freq: 440, dur: 0.3, type: "sine" },
            { freq: 440, dur: 0.3, type: "sine" }
        ],
        passi_pietra: [
            { freq: 120, dur: 0.08, type: "square" },
            { freq: 100, dur: 0.08, type: "square" }
        ],
        chiave_gira: [
            { freq: 300, dur: 0.06, type: "square" },
            { freq: 500, dur: 0.08, type: "square" },
            { freq: 700, dur: 0.12, type: "square" }
        ],
        lucchetto_forzato: [
            { freq: 250, dur: 0.05, type: "square" },
            { freq: 600, dur: 0.1, type: "square" }
        ],
        pergamena: [
            { freq: 800, dur: 0.05, type: "sine", volume: 0.03 },
            { freq: 700, dur: 0.06, type: "sine", volume: 0.025 }
        ],
        oggetto: [
            { freq: 660, dur: 0.06 },
            { freq: 880, dur: 0.1 }
        ],
        impatto: [
            { freq: 180, dur: 0.08, type: "sawtooth" },
            { freq: 90, dur: 0.12, type: "sawtooth" },
            { freq: 50, dur: 0.25, type: "sawtooth" }
        ]
    },

    nodes: {

        dawn_wake: {
            location: "STANZA DEGLI OSPITI — MATTINO",
            music: "morning",
            theme: { colorMain: "#e0b96b", colorDim: "#a3823f" },
            art: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <rect x="60" y="20" width="120" height="110" />
                <line x1="120" y1="20" x2="120" y2="130" />
                <line x1="60" y1="75" x2="180" y2="75" />
                <line x1="130" y1="10" x2="160" y2="40" />
                <line x1="145" y1="5" x2="175" y2="35" />
                <line x1="160" y1="15" x2="190" y2="45" />
                <circle cx="220" cy="30" r="18" />
            </svg>`,
            text: "Un fascio di luce grigia e polverosa filtra dalle tende pesanti. Arthur si sveglia con la sensazione di non aver dormito affatto, per quanto la notte gli sembri già distante, quasi irreale alla luce del giorno. Da qualche parte, in lontananza, una campana di chiesa rintocca due volte — le otto del mattino ad Alderbrook.",
            onArrive: [
                { type: "playSfx", sfx: "campana" },
                { type: "addLog", title: "SECONDO GIORNO", entry: "Il mattino dopo la prima notte a Blackthorn Hall. Arthur è deciso a ottenere risposte." }
            ],
            options: [
                { text: "> Vestiti e scendi per la colazione", target: "breakfast_edmund" }
            ]
        },

        breakfast_edmund: {
            location: "SALA DA PRANZO — MATTINO",
            text: "Edmund è già seduto, un piatto intatto davanti a sé. Ha l'aria di chi non ha dormito meglio di Arthur. Il silenzio tra i due si allunga, carico di tutto ciò che non è stato ancora detto.",
            options: [
                { text: "> Racconta cosa hai sentito e visto la notte scorsa, senza giri di parole", target: "breakfast_press" },
                { text: "> Lascia che sia Edmund a parlare per primo, con calma", target: "breakfast_patient" },
                {
                    text: "> Mostragli l'appunto che hai preso dalla sua scrivania",
                    target: "breakfast_notes_confront",
                    condition: { type: "item", item: "appunti_edmund", quantity: 1 }
                },
                { text: "> Chiedigli un momento, prima che l'atmosfera si irrigidisca", target: "edmund_aside2" },
                { text: "> Nota un giornale locale ripiegato accanto al piatto di Edmund", target: "breakfast_newspaper" }
            ]
        },

        edmund_aside2: {
            location: "SALA DA PRANZO — MATTINO",
            text: "Arthur posa una mano sul braccio dell'amico, un gesto semplice, quello di sempre. 'Sono qui per te, Edmund. Qualunque cosa sia.' Per un istante gli occhi di Edmund si inumidiscono — poi annuisce, senza riuscire ancora a parlare, e il momento passa.",
            options: [
                {
                    text: "> Torna alla colazione",
                    target: "breakfast_edmund",
                    effects: [ { type: "modifyStat", stat: "fiducia", delta: 1 } ]
                }
            ]
        },

        breakfast_newspaper: {
            location: "SALA DA PRANZO — MATTINO",
            text: "La Gazzetta di Alderbrook riporta, in un trafiletto in seconda pagina, la scomparsa di un bracciante della zona 'in circostanze poco chiare', e un editoriale che si lamenta genericamente dei 'nervi deboli' che affliggerebbero sempre più famiglie di campagna. Nessun nome. Nessun collegamento esplicito a Blackthorn Hall. Eppure.",
            onArrive: [
                { type: "addLog", title: "LA GAZZETTA DI ALDERBROOK", entry: "Un bracciante scomparso 'in circostanze poco chiare'. Nessun nome fatto, ma il sospetto resta." }
            ],
            options: [
                { text: "> Torna alla colazione", target: "breakfast_edmund" }
            ]
        },

        breakfast_press: {
            location: "SALA DA PRANZO — MATTINO",
            text: "Arthur non gira più intorno alla questione: il rumore nei muri, gli sguardi di Mrs. Pemberton, il posto vuoto di Constance. Edmund lo ascolta senza interromperlo, il volto sempre più teso, ma quando Arthur finisce si limita a dire: 'Non qui dentro. Ti prego. Dopo, in giardino — te lo prometto.' Non è un rifiuto, ma nemmeno una vera risposta.",
            onArrive: [
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Accetta, per ora", target: "pemberton_morning" }
            ]
        },

        breakfast_patient: {
            location: "SALA DA PRANZO — MATTINO",
            text: "Arthur sceglie la pazienza. Mangiano quasi in silenzio, e proprio quando sembra che la colazione finirà senza una parola di senso, Edmund dice, piano: 'Grazie di non avermi obbligato a spiegare tutto stamattina. Non sono ancora pronto. Ma lo sarò, prima che tu debba ripartire.' Sembra sincero — o disperatamente voglioso di esserlo.",
            onArrive: [
                { type: "modifyStat", stat: "fiducia", delta: 1 }
            ],
            options: [
                { text: "> Concedigli il tempo che chiede", target: "pemberton_morning" }
            ]
        },

        breakfast_notes_confront: {
            location: "SALA DA PRANZO — MATTINO",
            text: "Arthur posa il foglio sul tavolo, tra loro. Edmund lo fissa a lungo prima di alzare lo sguardo — non c'è rabbia nei suoi occhi, solo un sollievo quasi doloroso, come chi non deve più portare da solo un peso. 'Allora l'hai visto,' mormora. 'Il patto.' Si passa una mano sul volto. 'Non qui. Ma sì — hai ragione a chiedere. Te lo dirò. Tutto.'",
            onArrive: [
                { type: "modifyStat", stat: "fiducia", delta: -1 },
                { type: "addLog", title: "EDMUND SA CHE SAI", entry: "Messo di fronte all'appunto, Edmund promette di raccontare tutto — ma non qui." }
            ],
            options: [
                { text: "> Accetta la sua promessa", target: "edmund_confession_partial" }
            ]
        },

        edmund_confession_partial: {
            location: "SALA DA PRANZO — MATTINO",
            text: "'Non posso dirti tutto a stomaco vuoto e con Pemberton che passa ogni cinque minuti,' dice Edmund a bassa voce, 'ma questo sì: la mia famiglia deve qualcosa a qualcosa, da molto prima che io nascessi. E credo che tocchi a me pagare il conto. Sto solo cercando di capire se esiste un altro modo.' Non aggiunge altro — ma per la prima volta, Arthur ha la sensazione che Edmund voglia davvero essere aiutato, non solo consolato.",
            onArrive: [
                { type: "setFlag", flag: "edmundConfessedPartial", value: true },
                { type: "modifyStat", stat: "fiducia", delta: 2 },
                { type: "addLog", title: "IL PATTO, IN PARTE", entry: "Edmund conferma: la famiglia 'deve qualcosa' e teme che tocchi a lui pagare. Cerca un'alternativa." }
            ],
            options: [
                { text: "> Prosegui la giornata", target: "pemberton_morning" }
            ]
        },

        pemberton_morning: {
            location: "CORRIDOIO PRINCIPALE — MATTINO",
            text: "Mrs. Pemberton attraversa il corridoio con una pila di lenzuola tra le braccia, il passo un po' meno saldo del solito. Alla luce del giorno, senza le ombre di candela a nasconderlo, Arthur nota per la prima volta quanto sia pallida — e quanto le tremino leggermente le mani.",
            options: [
                {
                    text: "> Nota che Mrs. Pemberton non sembra stare bene, e offriti di aiutarla",
                    target: "pemberton_kindness",
                    condition: { type: "flag", flag: "pembertonWarmedUp", equals: false }
                },
                { text: "> Esci in giardino a cercare Edmund", target: "grounds_daylight" }
            ]
        },

        pemberton_kindness: {
            location: "CORRIDOIO PRINCIPALE — MATTINO",
            text: "'Non è nulla, dottore, solo il cuore che invecchia più in fretta del resto,' dice lei, quasi seccata — ma non si sottrae quando Arthur insiste, con la delicatezza di chi lo fa per mestiere, per controllarle il polso. Qualcosa, in quel gesto professionale e privo di morbosità, sembra spezzare una diga tenuta a forza per anni. Per un istante, i suoi occhi si inumidiscono. 'Nessuno, in questa casa, chiede più come sto io. Da molto tempo.'",
            onArrive: [
                { type: "addLog", title: "MRS. PEMBERTON SI APRE", entry: "Un semplice gesto di cura medica, offerto senza secondi fini, sembra aver raggiunto qualcosa che anni di cortesia non avevano scalfito." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "pembertonWarmedUp", value: true },
                { type: "modifyStat", stat: "fiducia", delta: 1 }
            ],
            options: [
                { text: "> Chiedile, con delicatezza, cosa sa davvero di questa casa", target: "pemberton_reveals" }
            ]
        },

        pemberton_reveals: {
            location: "CORRIDOIO PRINCIPALE — MATTINO",
            text: "Mrs. Pemberton abbassa la voce fino a un sussurro, come se le pareti stesse potessero ascoltare. 'Ho servito il padre del signor Edmund, e prima ancora suo nonno. So che nell'ala ovest c'è qualcosa che nessun Ashcombe ha mai osato spiegarmi del tutto — solo che la chiave della porta grande è nascosta dietro il ritratto di Lord Josiah, nell'ingresso. Non gliel'ho mai detto a nessuno. Gliela dico a lei perché forse lei può ancora salvarlo, quel ragazzo, dove io non sono mai riuscita.'",
            onArrive: [
                { type: "addLog", title: "LA CHIAVE NASCOSTA", entry: "Mrs. Pemberton rivela: la chiave dell'ala ovest è nascosta dietro il ritratto di Lord Josiah nell'ingresso." }
            ],
            options: [
                { text: "> Ringraziala ed esci in giardino a cercare Edmund", target: "grounds_daylight" }
            ]
        },

        grounds_daylight: {
            location: "GIARDINO DI BLACKTHORN HALL — MATTINO",
            music: "grounds",
            theme: { colorMain: "#8fae6b", colorDim: "#5c7a3f" },
            text: "Alla luce del giorno il giardino incolto perde parte della sua minaccia notturna, ma non tutta: i rovi, la statua spezzata, il silenzio innaturale di un luogo che nessuno cura più restano lì, semplicemente più visibili. Di Edmund, nessuna traccia immediata — ma un sentiero appena distinguibile tra i rovi conduce verso il bosco, in direzione della vecchia cappella di famiglia.",
            options: [
                { text: "> Osserva di nuovo la statua spezzata, ora alla luce del giorno", target: "statue_daylight" },
                { text: "> Dai un'occhiata alla vecchia serra abbandonata", target: "greenhouse" },
                { text: "> Incamminati lungo il sentiero verso la cappella e il cimitero di famiglia", target: "crypt_entrance" }
            ]
        },

        statue_daylight: {
            location: "GIARDINO DI BLACKTHORN HALL — MATTINO",
            text: "Da vicino, il volto scalpellato via della statua rivela tracce di scalpellature deliberate e recenti — non l'usura di decenni, ma il lavoro di qualcuno che ha voluto, in tempi non troppo lontani, cancellare un viso specifico. Sul basamento, a stento leggibile, resta solo la prima lettera di un nome: una 'J'.",
            onArrive: [
                { type: "addLog", title: "LA STATUA SFIGURATA", entry: "Il volto della statua è stato scalpellato di proposito, non consumato dal tempo. Resta solo una 'J' sul basamento." }
            ],
            options: [
                { text: "> Torna a considerare il giardino", target: "grounds_daylight" }
            ]
        },

        greenhouse: {
            location: "SERRA ABBANDONATA",
            text: "Una serra di ferro e vetro, per metà crollata, ospita ancora file di vasi con piante esotiche ormai secche — orchidee, forse, o qualcosa di più insolito, impossibile dirlo ormai. Un cartellino ingiallito su uno dei vasi porta una scritta a mano: 'J.A. — coltivazione sperimentale, non disturbare.' La stessa calligrafia del libro nella biblioteca.",
            onArrive: [
                { type: "addLog", title: "LA SERRA DI J.A.", entry: "Piante esotiche essiccate, etichettate dalla stessa mano del libro in biblioteca: 'J.A. — non disturbare.'" }
            ],
            onArriveOnce: [
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Torna a considerare il giardino", target: "grounds_daylight" }
            ]
        },

        crypt_entrance: {
            location: "CIMITERO DI FAMIGLIA",
            music: "crypt",
            theme: { colorMain: "#6b8f8a", colorDim: "#3f5c58" },
            art: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <path d="M110,140 L110,60 L150,20 L190,60 L190,140" />
                <rect x="140" y="90" width="20" height="50" />
                <line x1="150" y1="30" x2="150" y2="10" />
                <line x1="142" y1="18" x2="158" y2="18" />
                <path d="M30,140 Q40,120 50,140" />
                <path d="M230,140 Q245,115 260,140" />
                <rect x="60" y="125" width="18" height="15" />
                <rect x="210" y="128" width="18" height="12" />
            </svg>`,
            text: "Il bosco si apre su una piccola cappella di pietra scura, la porta socchiusa su un interno che Arthur non ha intenzione di esplorare per primo. Intorno, un piccolo cimitero di famiglia: lapidi consumate dal tempo e dal muschio, alcune quasi illeggibili. Sulla porta della cappella, un'iscrizione latina è incisa in caratteri più profondi delle altre.",
            options: [
                { text: "> Osserva le lapidi del cimitero", target: "crypt_graves" },
                { text: "> Prova a leggere l'iscrizione sulla porta della cappella", target: "crypt_inscription" },
                { text: "> Entra nella cappella", target: "crypt_enter_check" }
            ]
        },

        crypt_graves: {
            location: "CIMITERO DI FAMIGLIA",
            text: "La maggior parte delle lapidi è quello che ci si aspetterebbe: nomi consumati, date illeggibili, muschio ovunque. Ma due tombe, poco distanti l'una dall'altra, spiccano per un dettaglio sconcertante — sono chiaramente più curate delle altre. L'erba intorno è tagliata, la pietra ripulita di recente. Nessun nome inciso su nessuna delle due: solo uno spazio liscio, dove un nome avrebbe dovuto esserci.",
            onArrive: [
                { type: "addLog", title: "LE TOMBE SENZA NOME", entry: "Due tombe, curate meglio di tutte le altre, senza alcun nome inciso. Combaciano con i due nomi cancellati dall'albero genealogico." }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "sawErasedGraves", value: true },
                { type: "setFlag", flag: "scoutedGrounds", value: true },
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Torna a considerare il cimitero", target: "crypt_entrance" }
            ]
        },

        crypt_inscription: {
            location: "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            text: "L'iscrizione è consumata ma non del tutto persa. Il latino di Arthur, arrugginito dai tempi dell'università, fatica a ricostruire il senso completo della frase.",
            options: [
                {
                    text: "> Concentrati e prova a tradurla per intero",
                    target: "crypt_entrance",
                    skillCheck: { stat: "indagine", difficulty: 6, success: "crypt_inscription_success", failure: "crypt_inscription_fail" }
                },
                { text: "> Lascia perdere per ora, non è il momento", target: "crypt_entrance" }
            ]
        },

        crypt_inscription_success: {
            location: "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            text: "Pezzo per pezzo, il senso emerge: 'Ciò che riceviamo dal bosco, al bosco un giorno torna. Che il custode non dimentichi mai il prezzo pattuito.' Non è una preghiera. È un promemoria — inciso in pietra perché nessuno, mai, potesse fingere di aver dimenticato i termini.",
            onArrive: [
                { type: "playSfx", sfx: "pergamena" }
            ],
            onArriveOnce: [
                { type: "setFlag", flag: "readInscription", value: true },
                { type: "setFlag", flag: "scoutedGrounds", value: true },
                { type: "modifyStat", stat: "indagine", delta: 1 }
            ],
            options: [
                { text: "> Torna a considerare il cimitero", target: "crypt_entrance" }
            ]
        },

        crypt_inscription_fail: {
            location: "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            text: "Il latino resta ostinatamente frammentario — Arthur riconosce solo poche parole isolate, 'bosco' e 'prezzo', senza riuscire a comporne il senso completo. Forse con più tempo, o più luce.",
            options: [
                { text: "> Torna a considerare il cimitero", target: "crypt_entrance" }
            ]
        },

        crypt_enter_check: {
            location: "SOGLIA DELLA CAPPELLA",
            text: "La porta socchiusa lascia intravedere solo buio, oltre la soglia.",
            options: [
                {
                    text: "> Entra nella cappella",
                    target: "crypt_safe",
                    condition: { any: [ { type: "flag", flag: "hasLamp" }, { type: "flag", flag: "knowsLayout" }, { type: "flag", flag: "scoutedGrounds" } ] }
                },
                {
                    text: "> Entra nella cappella",
                    target: "crypt_danger",
                    condition: { all: [ { type: "flag", flag: "hasLamp", equals: false }, { type: "flag", flag: "knowsLayout", equals: false }, { type: "flag", flag: "scoutedGrounds", equals: false } ] }
                },
                { text: "> Ripensaci: torna a considerare il cimitero", target: "crypt_entrance" }
            ]
        },

        crypt_danger: {
            location: "INTERNO DELLA CAPPELLA — BUIO TOTALE",
            music: "ending_death",
            theme: { colorMain: "#8b1e1e", colorDim: "#4a0f0f" },
            text: "Senza luce, Arthur avanza a tentoni tra le panche di pietra. Il pavimento, sotto i suoi piedi, cede improvvisamente — non terra, ma il vuoto di una cripta sotterranea mai segnalata, celata sotto lastre di pietra marce. La caduta è breve ma la posizione in cui atterra, tra ossa antiche e pietra spezzata, non lascia scampo: il collo si spezza nell'impatto.\n\n[FINALE PREMATURO — IL PAVIMENTO CHE INGHIOTTE]",
            onArrive: [
                { type: "playSfx", sfx: "impatto" }
            ],
            options: [
                { text: "> Torna al Menu Principale", target: "__mainMenu__" }
            ]
        },

        crypt_safe: {
            location: "INTERNO DELLA CAPPELLA",
            text: "Con la lanterna a rischiarare il passo — o semplicemente sapendo dove non mettere i piedi — Arthur esplora l'interno della cappella senza incidenti. È spoglia, quasi dimessa, tranne per un dettaglio: un piccolo altare laterale, ripulito di recente, con tracce di cera fresca. Qualcuno viene ancora qui. Di recente. Forse regolarmente.",
            onArrive: [
                { type: "addLog", title: "L'ALTARE CURATO", entry: "Un altare laterale nella cappella è ripulito di recente, con tracce di cera fresca. Qualcuno lo usa ancora." }
            ],
            options: [
                { text: "> Esci e va' a cercare Edmund", target: "key_search_intro" }
            ]
        },

        key_search_intro: {
            location: "BLACKTHORN HALL — TARDO MATTINO",
            text: "Tornato in casa, Arthur è ormai deciso: prima o poi dovrà vedere con i suoi occhi cosa nasconde l'ala ovest. La domanda è come procurarsi la chiave.",
            options: [
                {
                    text: "> Segui l'indicazione di Mrs. Pemberton: cerca dietro il ritratto di Lord Josiah",
                    target: "key_from_pemberton",
                    condition: { type: "flag", flag: "pembertonWarmedUp" }
                },
                { text: "> Fruga nello studio di Edmund quando non guarda", target: "key_from_study" },
                {
                    text: "> Usa gli strumenti della borsa medica per forzare la serratura",
                    target: "key_pick_lock",
                    condition: { type: "flag", flag: "pickAttempted", equals: false }
                }
            ]
        },

        key_from_pemberton: {
            location: "INGRESSO DI BLACKTHORN HALL",
            text: "Come indicato, dietro la cornice del ritratto di Lord Josiah, le dita di Arthur trovano una piccola chiave di ferro battuto, fredda e pesante. Per un istante, alzando lo sguardo, ha di nuovo l'impressione che gli occhi dipinti di Josiah lo stiano osservando con qualcosa che somiglia, stranamente, a un'approvazione.",
            onArrive: [
                { type: "setFlag", flag: "hasWestWingKey", value: true },
                {
                    type: "addItem", id: "chiave_ala_ovest", name: "Chiave dell'Ala Ovest", desc: "Ferro battuto, pesante, fredda al tatto.",
                    examine: "Una chiave antica, di fattura non recente. Il ferro è freddo anche tenuto in mano a lungo — più freddo di quanto la temperatura della stanza giustifichi."
                },
                { type: "modifyStat", stat: "fiducia", delta: 1 },
                { type: "addLog", title: "LA CHIAVE TROVATA", entry: "Trovata dietro il ritratto di Lord Josiah, esattamente come indicato da Mrs. Pemberton." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            options: [
                { text: "> Vai alla porta dell'ala ovest", target: "westwing_threshold" }
            ]
        },

        key_from_study: {
            location: "STUDIO DI EDMUND",
            text: "Con il cuore in gola, Arthur fruga rapidamente tra i cassetti dello studio di Edmund mentre la casa è silenziosa. Nel terzo cassetto, sotto una pila di lettere non spedite, trova una chiave di ferro battuto che sembra fatta apposta per una porta pesante. Si sente in colpa — ma non abbastanza da rimetterla al suo posto.",
            onArrive: [
                { type: "setFlag", flag: "hasWestWingKey", value: true },
                {
                    type: "addItem", id: "chiave_ala_ovest", name: "Chiave dell'Ala Ovest", desc: "Ferro battuto, pesante, fredda al tatto.",
                    examine: "Una chiave antica, di fattura non recente. Il ferro è freddo anche tenuto in mano a lungo — più freddo di quanto la temperatura della stanza giustifichi."
                },
                { type: "modifyStat", stat: "fiducia", delta: -2 },
                { type: "addLog", title: "LA CHIAVE SOTTRATTA", entry: "Trovata di nascosto nello studio di Edmund. Un peso sulla coscienza, ma un passo avanti." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            options: [
                { text: "> Vai alla porta dell'ala ovest", target: "westwing_threshold" }
            ]
        },

        key_pick_lock: {
            location: "ALA OVEST — PORTA SIGILLATA",
            text: "Arthur si inginocchia davanti al lucchetto, tirando fuori dalla borsa medica un paio di strumenti chirurgici sottili — non fatti per quello scopo, ma sufficientemente simili a dei grimaldelli da poter funzionare, forse.",
            options: [
                {
                    text: "> Tenta di forzare la serratura",
                    target: "westwing_threshold",
                    effects: [ { type: "setFlag", flag: "pickAttempted", value: true } ],
                    skillCheck: { stat: "indagine", difficulty: 8, success: "key_pick_success", failure: "key_pick_fail" }
                }
            ]
        },

        key_pick_success: {
            location: "ALA OVEST — PORTA SIGILLATA",
            text: "Con un ultimo scatto secco, il meccanismo cede. Arthur si rialza, il cuore che batte forte più per l'adrenalina che per lo sforzo — ha appena scassinato una serratura in casa di un amico, e in qualche modo questo pensiero lo diverte quasi, nel mezzo di tutto il resto.",
            onArrive: [
                { type: "setFlag", flag: "hasWestWingKey", value: true },
                { type: "addLog", title: "SERRATURA FORZATA", entry: "Nessuna chiave: solo pazienza, mano ferma e gli strumenti sbagliati usati nel modo giusto." },
                { type: "playSfx", sfx: "lucchetto_forzato" }
            ],
            options: [
                { text: "> Entra nell'ala ovest", target: "westwing_threshold" }
            ]
        },

        key_pick_fail: {
            location: "ALA OVEST — PORTA SIGILLATA",
            text: "Gli strumenti scivolano, il meccanismo non cede, e uno schiocco metallico troppo rumoroso rimbomba nel corridoio deserto. Arthur si blocca, il fiato sospeso, aspettando passi che non arrivano. Il lucchetto, però, resta ostinatamente chiuso. Serve un'altra strada.",
            onArrive: [
                { type: "addLog", title: "TENTATIVO FALLITO", entry: "Il lucchetto non ha ceduto. Rumore pericoloso, nessun risultato." }
            ],
            onArriveOnce: [
                { type: "modifyStat", stat: "nervi", delta: -1 }
            ],
            options: [
                { text: "> Cerca un'altra via per procurarti la chiave", target: "key_search_intro" }
            ]
        },

        westwing_threshold: {
            location: "ALA OVEST — PORTA SIGILLATA",
            music: "threshold",
            theme: { colorMain: "#7a6bb0", colorDim: "#4a3f7a" },
            art: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-main)" fill="none" stroke-width="2">
                <rect x="90" y="15" width="120" height="130" />
                <rect x="95" y="20" width="110" height="120" />
                <circle cx="180" cy="80" r="6" />
                <line x1="186" y1="80" x2="230" y2="80" />
                <rect x="225" y="65" width="30" height="30" />
                <circle cx="240" cy="80" r="4" fill="var(--color-main)" stroke="none" />
            </svg>`,
            text: "La chiave entra nella serratura con una precisione che sembra quasi innaturale, come se la porta stesse solo aspettando di essere aperta. Il meccanismo cede con un rumore secco che riecheggia lungo tutto il corridoio silenzioso. Al di là, solo buio — e una corrente d'aria fredda che sembra esalare dalla casa stessa, come un respiro trattenuto per troppo tempo.\n\n[FINE DELL'ATTO II — continua nell'Atto III]",
            onArrive: [
                { type: "playSfx", sfx: "chiave_gira" },
                { type: "carryOverState" }
            ],
            options: [
                { text: "> Fine dell'Atto II — prosegui nell'Atto III", target: "__mainMenu__" }
            ]
        }
    }
};
