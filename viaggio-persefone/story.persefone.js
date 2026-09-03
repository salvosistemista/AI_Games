// story.persefone.js
// "L'Ultimo Viaggio del Persefone" — avventura gotica marittima in 5 atti.
// Atto I — L'Imbarco. Atti II-V verranno aggiunti come nodi allo stesso
// oggetto STORY (stesso principio già usato per Blackthorn Hall: un solo
// file, nessun trasferimento di stato tra file diversi).
//
// Flag piantati in questo atto e usati più avanti nella saga:
//   - fiducia_peter (stat)  -> quanto Peter si fida di Rebecca (Atto IV/V)
//   - finch_ally (flag)     -> se Rebecca si è confidata con Finch (Atto IV)
//   - noticed_torn_page (flag) -> sblocca una domanda mirata al Capitano (Atto III)
//   - ove_hint_febbre (flag)   -> sblocca un dialogo più profondo con la
//                                 dott.ssa Salt (Atto II)

const STORY = {
    meta: {
        id: "persefone",
        title: "L'Ultimo Viaggio del Persefone",
        version: "0.1-atto1"
    },
    startNode: "act1_intro",
    initialState: {
        flags: {
            peter_met: false,
            peter_deepened: false,
            finch_met: false,
            finch_ally: false,
            noticed_torn_page: false,
            ove_hint_febbre: false,
            crane_seen: false,
            salt_met: false,
            capitano_scena_fatta: false,
            ufficio_tentato: false,

            // --- Atto II ---
            act2_capitano_al_timone: false,
            act2_ufficio_cercato: false,
            act2_guardia_fatta: false,
            vide_qualcosa_in_acqua: false,
            crane_scena2_fatta: false,
            crane_alleato: false,
            ove_scena2_fatta: false,
            salt_scena2_fatta: false,
            finch_scena2_fatta: false,
            finch_pieno_alleato: false,
            peter_scena2_fatta: false,
            sospetto_capitano: false,
            equipaggio_rispetto: false,

            // --- Atto III ---
            quarantena_vista: false,
            scoperta_manifesto: false,
            campo_trovato: false,
            segno_recente: false,
            finch_reazione_fatta: false,
            crane_reazione_fatta: false,
            confronto_fatto: false,
            capitano_confessione: false,
            capitano_ammissione_parziale: false,
            capitano_diniego: false,

            // --- Atto IV ---
            peter_ha_rivelato: false,
            finch_posizione_fatta: false,
            crane_organizza_fatto: false,
            crane_guida_squadra: false,
            peter_rivelazione_tardiva_fatta: false,
            kessler_route_fatta: false,
            verita_registrata: false,
            compromesso_kessler: false,
            minaccia_capitano: false,
            capitano_costretto: false,
            ammutinamento_aperto: false,
            spedizione_pronta: false,
            ricerca_fatta: false,
            tracce_fresche: false
        },
        stats: {
            forza: 2,
            agilita: 2,
            lucidita: 7,
            fiducia_peter: 0
        },
        inventory: []
    },

    music: {
        molo: {
            wave: "sine",
            volume: 0.02,
            notes: [ {freq:196, dur:1.2}, {freq:220, dur:1.0}, {freq:174, dur:1.4} ]
        },
        ponte: {
            wave: "triangle",
            volume: 0.025,
            notes: [ {freq:220, dur:0.8}, {freq:246, dur:0.6}, {freq:196, dur:1.0} ]
        },
        tensione: {
            wave: "sawtooth",
            volume: 0.018,
            notes: [ {freq:110, dur:0.5}, {freq:98, dur:0.7} ]
        },
        notte: {
            wave: "sine",
            volume: 0.015,
            notes: [ {freq:164, dur:1.6}, {freq:146, dur:1.8}, {freq:130, dur:2.0} ]
        },
        tempesta: {
            wave: "sawtooth",
            volume: 0.03,
            notes: [ {freq:130, dur:0.4}, {freq:180, dur:0.3}, {freq:110, dur:0.5}, {freq:196, dur:0.3} ]
        },
        ghiaccio: {
            wave: "sine",
            volume: 0.014,
            notes: [ {freq:140, dur:2.2}, {freq:110, dur:2.6} ]
        },
        confronto: {
            wave: "square",
            volume: 0.016,
            notes: [ {freq:98, dur:0.6}, {freq:104, dur:0.6}, {freq:92, dur:0.8} ]
        },
        ammutinamento: {
            wave: "sawtooth",
            volume: 0.022,
            notes: [ {freq:120, dur:0.3}, {freq:90, dur:0.3}, {freq:150, dur:0.4}, {freq:80, dur:0.5} ]
        },
        alba: {
            wave: "sine",
            volume: 0.02,
            notes: [ {freq:262, dur:1.2}, {freq:330, dur:1.4}, {freq:392, dur:1.8} ]
        },
        smarrimento: {
            wave: "triangle",
            volume: 0.012,
            notes: [ {freq:180, dur:1.0}, {freq:170, dur:1.0}, {freq:185, dur:1.4} ]
        }
    },

    sfx: {
        scoperta: [ {freq:660, dur:0.08}, {freq:880, dur:0.12} ],
        porta: [ {freq:140, dur:0.15, type:"square"}, {freq:100, dur:0.2, type:"square"} ],
        corda: [ {freq:300, dur:0.05}, {freq:250, dur:0.05}, {freq:300, dur:0.05} ],
        tuono: [ {freq:70, dur:0.3, type:"sawtooth"}, {freq:50, dur:0.5, type:"sawtooth"} ],
        acqua: [ {freq:400, dur:0.05}, {freq:200, dur:0.1} ],
        carta: [ {freq:800, dur:0.03}, {freq:750, dur:0.03}, {freq:820, dur:0.03} ],
        vento: [ {freq:180, dur:0.4, type:"sine"}, {freq:150, dur:0.6, type:"sine"} ],
        corno: [ {freq:220, dur:0.3, type:"square"}, {freq:220, dur:0.3, type:"square"} ],
        grido: [ {freq:500, dur:0.15, type:"sawtooth"}, {freq:300, dur:0.2, type:"sawtooth"} ]
    },

    // pagina_diario_a viene trovata nell'Atto I, pagina_diario_b nell'Atto II
    // (ufficio del capitano, durante la tempesta). La combinazione funziona
    // indipendentemente dall'ordine in cui i due oggetti vengono trovati.
    combinations: [
        {
            items: ["pagina_diario_a", "pagina_diario_b"],
            consumes: true,
            result: {
                id: "diario_completo",
                name: "Pagina di diario ricomposta",
                desc: "Le due metà, incastrate, restituiscono una frase intera.",
                examine: "La calligrafia di Edwin, spezzata a metà per settimane, torna leggibile: 'Se qualcuno la legge, sappia che non è stata una tempesta a prendermi. Kessler sa. Chiedete a Kessler cosa c'è sotto il ponte di poppa, sotto chiave, dal quindici di marzo.'"
            },
            message: "Incastri le due metà lungo lo strappo: la frase, finalmente, si legge tutta intera."
        }
    ],

    nodes: {

        // ---------- MOLO ----------

        act1_intro: {
            location: "MOLO DI WHITMOOR — ALBA",
            text: "La nebbia sale dall'acqua nera del porto. La Persefone è ormeggiata al molo tre, tre alberi contro un cielo color piombo, il nome scrostato sulla prua ma ancora leggibile. Un anno fa è tornata da questo stesso molo senza Edwin. Oggi Rebecca sale a bordo con un nome falso e una borsa di tela.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='100' width='300' height='2' stroke='var(--color-main)' fill='none'/><path d='M40 100 L60 60 L220 60 L240 100 Z' stroke='var(--color-main)' stroke-width='1.5' fill='none'/><line x1='90' y1='60' x2='90' y2='10' stroke='var(--color-main)' stroke-width='1.5'/><line x1='150' y1='60' x2='150' y2='4' stroke='var(--color-main)' stroke-width='1.5'/><line x1='90' y1='20' x2='130' y2='20' stroke='var(--color-main)'/><line x1='150' y1='14' x2='185' y2='14' stroke='var(--color-main)'/></svg>",
            music: "molo",
            options: [
                { text: "> Osserva la nave da qui, prima di salire", target: "act1_osserva_nave" },
                { text: "> Sali a bordo della Persefone", target: "act1_ponte_arrivo" }
            ]
        },

        act1_osserva_nave: {
            location: "MOLO DI WHITMOOR",
            text: "Lo scafo porta i segni di ghiacci passati: incrostazioni, una toppa di legno più chiaro a mezza fiancata. Sulla murata, qualcuno ha ridipinto di recente il nome — Persefone — coprendo qualcosa scritto sotto in gesso, ormai illeggibile. Rebecca si chiede chi, e perché.",
            options: [
                { text: "> Torna al molo", target: "act1_intro" }
            ]
        },

        act1_ponte_arrivo: {
            location: "PONTE PRINCIPALE",
            text: "Il capitano Ezra Kessler la aspetta in cima alla scaletta, le mani dietro la schiena, lo sguardo che valuta più che accogliere. \"La nuova cuoca di riserva\", dice, non è una domanda. \"A bordo si lavora, non si fanno domande sul viaggio passato. Buona permanenza, signorina Vane.\" Un istante di silenzio: ha usato il vero cognome, non quello con cui si è presentata all'armatore.",
            onArriveOnce: [
                { type: "addLog", title: "L'imbarco", entry: "Il Capitano Kessler conosce già il suo vero nome. Non è un buon inizio, o forse è esattamente quello che serve." },
                { type: "playSfx", sfx: "corda" }
            ],
            options: [
                { text: "> Non ribattere, raggiungi il ponte principale", target: "act1_ponte" }
            ]
        },

        // ---------- HUB: PONTE PRINCIPALE ----------

        act1_ponte: {
            location: "PONTE PRINCIPALE — PERSEFONE",
            text: "Cavi, botti, l'odore di catrame e sale. L'equipaggio si muove attorno a lei senza guardarla troppo: la nuova cuoca di riserva non è nessuno, il che le va benissimo. Ha ancora un'ora prima che si salpi.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><line x1='150' y1='140' x2='150' y2='10' stroke='var(--color-main)' stroke-width='2'/><line x1='150' y1='30' x2='40' y2='70' stroke='var(--color-main)'/><line x1='150' y1='30' x2='260' y2='70' stroke='var(--color-main)'/><line x1='150' y1='55' x2='60' y2='90' stroke='var(--color-main)'/><line x1='150' y1='55' x2='240' y2='90' stroke='var(--color-main)'/><ellipse cx='150' cy='125' rx='120' ry='10' stroke='var(--color-main)' fill='none'/></svg>",
            music: "ponte",
            options: [
                { text: "> Vai a prua", target: "act1_prua" },
                { text: "> Scendi agli alloggi dell'equipaggio", target: "act1_alloggi_equipaggio" },
                { text: "> Vai in infermeria", target: "act1_infermeria" },
                { text: "> Vai agli alloggi ufficiali", target: "act1_alloggi_ufficiali" },
                { text: "> Arrampicati verso la coffa", target: "act1_coffa" },
                { text: "> Parla ancora con il Capitano", condition: { type: "flag", flag: "capitano_scena_fatta", equals: false }, target: "act1_capitano_scena" },
                { text: "> Saluta il Capitano", condition: { type: "flag", flag: "capitano_scena_fatta", equals: true }, target: "act1_capitano_breve" },
                { text: "> È ora di salpare — prendi il largo", target: "act1_fine" }
            ]
        },

        act1_capitano_scena: {
            location: "PONTE PRINCIPALE",
            text: "\"Suo fratello era un buon carpentiere\", dice Kessler, senza che lei abbia chiesto nulla. \"Troppo curioso, verso la fine. La tempesta di marzo se lo prese al largo della banchisa, come altri prima di lui. Il mare non fa distinzioni.\" Non la guarda mentre lo dice. Rebecca nota che ha detto 'altri prima di lui' — non ne aveva mai sentito parlare, di altri.",
            onArriveOnce: [
                { type: "setFlag", flag: "capitano_scena_fatta", value: true },
                { type: "addLog", title: "Altri prima di lui", entry: "Il Capitano ha lasciato scivolare una frase che non doveva dire: non è stato solo Edwin, a non tornare." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_capitano_breve: {
            location: "PONTE PRINCIPALE",
            text: "Kessler le rivolge un cenno secco e torna a controllare il carico. Non ha altro da dire, per ora.",
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        // ---------- PRUA: SILAS CRANE ----------

        act1_prua: {
            location: "PRUA",
            text: "Il vento è più forte qui, tra i cavi dell'ancora. Un uomo tarchiato affila un arpione contro la murata, muovendo le labbra come in preghiera.",
            options: [
                { text: "> Avvicinati all'arpioniere", condition: { type: "flag", flag: "crane_seen", equals: false }, target: "act1_crane_scena" },
                { text: "> Saluta di nuovo Silas Crane", condition: { type: "flag", flag: "crane_seen", equals: true }, target: "act1_crane_breve" },
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_crane_scena: {
            location: "PRUA",
            text: "\"Silas Crane\", si presenta senza smettere di affilare. \"Terzo viaggio su questa nave, l'ultimo lo giuro sui denti di mia madre.\" Abbassa la voce. \"L'anno scorso, nel ghiaccio, qualcosa ci guardava dall'acqua per notti intere. Il vostro Edwin non era pazzo a dirlo. Era l'unico a dirlo forte.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "crane_seen", value: true },
                { type: "addLog", title: "Qualcosa nel ghiaccio", entry: "Silas Crane giura che l'equipaggio vide qualcosa, l'anno scorso, nell'acqua sotto la banchisa. Edwin ne parlava apertamente — forse troppo." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_crane_breve: {
            location: "PRUA",
            text: "Crane annuisce senza smettere di lavorare. \"Tenete gli occhi aperti stanotte\", borbotta, più a se stesso che a lei.",
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        // ---------- ALLOGGI EQUIPAGGIO: PETER e OLD OVE ----------

        act1_alloggi_equipaggio: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Cuccette strette, bauli impilati, un lume che oscilla piano. Da un angolo arriva odore di brodo dalla cambusa; da un altro, il rumore di qualcuno che sistema attrezzi con troppa cura per essere tranquillo.",
            options: [
                { text: "> Parla con il mozzo", condition: { type: "flag", flag: "peter_met", equals: false }, target: "act1_peter_scena1" },
                { text: "> Torna a parlare con Peter", condition: { all: [ { type: "flag", flag: "peter_met", equals: true }, { type: "flag", flag: "peter_deepened", equals: false } ] }, target: "act1_peter_scena2" },
                { text: "> Saluta Peter", condition: { type: "flag", flag: "peter_deepened", equals: true }, target: "act1_peter_breve" },
                { text: "> Vai in cambusa, da Old Ove", condition: { type: "flag", flag: "ove_hint_febbre", equals: false }, target: "act1_ove_scena" },
                { text: "> Saluta Old Ove in cambusa", condition: { type: "flag", flag: "ove_hint_febbre", equals: true }, target: "act1_ove_breve" },
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_peter_scena1: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Un ragazzino di forse tredici anni lascia cadere un fascio di corde, arrossisce, si affretta a raccoglierle. \"Scusate, signora. Sono Peter, faccio il mozzo.\" Ha le nocche sbucciate e non guarda mai negli occhi più di un secondo.",
            options: [
                {
                    text: "> Inginocchiati e aiutalo a raccogliere le corde",
                    target: "act1_alloggi_equipaggio",
                    effects: [
                        { type: "setFlag", flag: "peter_met", value: true },
                        { type: "modifyStat", stat: "fiducia_peter", delta: 2 },
                        { type: "addLog", title: "Peter", entry: "Il mozzo Peter sembra sollevato che qualcuno lo tratti da persona, non da ingombro." }
                    ]
                },
                {
                    text: "> Un cenno cortese, poi lascia che se la sbrighi da solo",
                    target: "act1_alloggi_equipaggio",
                    effects: [
                        { type: "setFlag", flag: "peter_met", value: true },
                        { type: "addLog", title: "Peter", entry: "Il mozzo Peter raccoglie le corde da solo, in fretta, come chi è abituato a non ricevere aiuto." }
                    ]
                }
            ]
        },

        act1_peter_scena2: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter la cerca lui, stavolta, con la scusa di mostrarle dove sono le pentole buone. Poi, piano: \"Voi siete la sorella, vero? Del carpentiere.\" Non aspetta risposta. \"L'anno scorso ero a bordo anch'io. Ho visto una cosa, quella notte. Non l'ho detto a nessuno.\" Si blocca, come pentito di aver parlato.",
            options: [
                {
                    text: "> \"Puoi fidarti di me, Peter. Qualunque cosa sia.\"",
                    target: "act1_alloggi_equipaggio",
                    effects: [
                        { type: "setFlag", flag: "peter_deepened", value: true },
                        { type: "modifyStat", stat: "fiducia_peter", delta: 2 },
                        { type: "addLog", title: "Ciò che Peter non dice", entry: "Peter ha quasi parlato, poi si è fermato. Ma ora sa che, quando sarà pronto, Rebecca lo ascolterà senza giudicarlo." }
                    ]
                },
                {
                    text: "> \"Se hai visto qualcosa, dovresti dirlo al Capitano, non a me.\"",
                    target: "act1_alloggi_equipaggio",
                    effects: [
                        { type: "setFlag", flag: "peter_deepened", value: true },
                        { type: "addLog", title: "Ciò che Peter non dice", entry: "Peter si richiude come un guscio. \"Certo\", dice, e non ne parla più." }
                    ]
                }
            ]
        },

        act1_peter_breve: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter le fa un cenno rapido, poi torna ai suoi attrezzi. C'è ancora qualcosa di non detto, tra loro.",
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act1_alloggi_equipaggio" }
            ]
        },

        act1_ove_scena: {
            location: "CAMBUSA",
            text: "Old Ove rimesta un brodo che non sembra migliorare col tempo, ma parla volentieri con chiunque gli tenga compagnia. \"Il carpentiere? Bravo ragazzo. Ultimi giorni prima che si perdesse, però, girava una febbre strana sottocoperta. Il dottore la chiamò 'niente di che'. Io ho visto tre uomini pallidi come lenzuola e nessuno ne parla più, da un anno.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "ove_hint_febbre", value: true },
                { type: "addLog", title: "Una febbre 'da niente'", entry: "Old Ove ricorda una febbre diffusa a bordo poco prima della scomparsa di Edwin, liquidata allora come 'niente di che'." }
            ],
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act1_alloggi_equipaggio" }
            ]
        },

        act1_ove_breve: {
            location: "CAMBUSA",
            text: "\"Il brodo non migliora aspettando\", dice Ove con un mezzo sorriso, offrendole comunque una scodella.",
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act1_alloggi_equipaggio" }
            ]
        },

        // ---------- INFERMERIA: DR. MIRIAM SALT ----------

        act1_infermeria: {
            location: "INFERMERIA",
            text: "Bottiglie etichettate a mano, un tavolo pulito in modo quasi ossessivo. Una donna sulla cinquantina alza lo sguardo da un registro e lo richiude di scatto.",
            options: [
                { text: "> Presentati alla dottoressa Salt", condition: { type: "flag", flag: "salt_met", equals: false }, target: "act1_salt_scena" },
                { text: "> Saluta di nuovo la dottoressa Salt", condition: { type: "flag", flag: "salt_met", equals: true }, target: "act1_salt_breve" },
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_salt_scena: {
            location: "INFERMERIA",
            text: "\"Miriam Salt, medico di bordo.\" La stretta di mano è breve, professionale. \"Se ha bisogno di qualcosa per il mal di mare, venga pure. Per il resto\" — uno sguardo appena più lungo del necessario — \"a bordo si guarisce meglio non facendo troppe domande sul passato.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "salt_met", value: true },
                { type: "addLog", title: "La dottoressa Salt", entry: "Il medico di bordo è cortese ma guardinga, come chi ha imparato a proprie spese cosa succede a fare troppe domande." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_salt_breve: {
            location: "INFERMERIA",
            text: "La dottoressa Salt le rivolge un cenno educato e torna al suo registro, che richiude non appena si accorge di essere osservata.",
            options: [
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        // ---------- ALLOGGI UFFICIALI ----------

        act1_alloggi_ufficiali: {
            location: "ALLOGGI UFFICIALI",
            text: "Un corridoio più stretto, porte numerate. In fondo, una porta senza numero è socchiusa: una cabina vuota, non riassegnata a nessuno.",
            options: [
                { text: "> Bussa alla porta del primo ufficiale", condition: { type: "flag", flag: "finch_met", equals: false }, target: "act1_finch_scena" },
                { text: "> Passa a salutare il primo ufficiale Finch", condition: { type: "flag", flag: "finch_met", equals: true }, target: "act1_finch_breve" },
                { text: "> Entra nella cabina vuota", target: "act1_cabina_edwin" },
                { text: "> Prova la porta dell'ufficio del Capitano, chiusa a chiave", condition: { type: "flag", flag: "ufficio_tentato", equals: false }, target: "act1_ufficio_capitano" },
                { text: "> Torna sul ponte", target: "act1_ponte" }
            ]
        },

        act1_finch_scena: {
            location: "ALLOGGI UFFICIALI",
            text: "Aldous Finch, primo ufficiale, la fa accomodare con una gentilezza che stona con la nave. \"So chi è, in realtà\", dice piano, chiudendo la porta. \"L'armatore l'ha detto solo a me, per sicurezza. Non le farò domande, signorina Vane. Ma se un giorno avrà bisogno di qualcuno che ascolti senza correre a riferire al Capitano...\" Lascia la frase in sospeso, un'offerta aperta.",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_met", value: true },
                { type: "addLog", title: "Aldous Finch", entry: "Il primo ufficiale sa già chi è davvero Rebecca e le offre, senza forzare, un ascolto discreto." }
            ],
            options: [
                {
                    text: "> \"Vi dirò la verità, allora: sono qui per scoprire cosa è successo a mio fratello.\"",
                    target: "act1_alloggi_ufficiali",
                    effects: [
                        { type: "setFlag", flag: "finch_ally", value: true },
                        { type: "addLog", title: "Un alleato, forse", entry: "Rebecca si è confidata con Finch. Se sarà sincero quanto sembra, potrebbe rivelarsi prezioso più avanti." }
                    ]
                },
                {
                    text: "> \"Non so di cosa parliate. Sono solo la cuoca di riserva.\"",
                    target: "act1_alloggi_ufficiali",
                    effects: [
                        { type: "addLog", title: "Distanza mantenuta", entry: "Rebecca ha preferito non fidarsi, per ora. Finch non insiste, ma l'offerta resta sul tavolo." }
                    ]
                }
            ]
        },

        act1_finch_breve: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch le rivolge un cenno complice, senza dire nulla davanti agli altri.",
            options: [
                { text: "> Torna nel corridoio", target: "act1_alloggi_ufficiali" }
            ]
        },

        act1_cabina_edwin: {
            location: "LA CABINA DI EDWIN",
            text: "Nessuno ha più assegnato questa cabina. La branda è nuda, ma il piccolo scrittoio è ancora quello di Edwin: un anello d'inchiostro secco, un cassetto che non si chiude bene. Dentro, incastrata contro il fondo, mezza pagina strappata di un diario.",
            onArriveOnce: [
                {
                    type: "addItem",
                    id: "pagina_diario_a",
                    name: "Mezza pagina di diario",
                    desc: "La calligrafia è quella di Edwin. La pagina è strappata verticalmente, manca metà di ogni riga.",
                    examine: "Le righe che restano dicono: '...non era una tempesta. L'ho visto scendere sottocoperta con le proprie mani, e da allora nessuno può più...' Il resto è sull'altra metà, mancante.",
                    examineEffects: [
                        { type: "setFlag", flag: "noticed_torn_page", value: true },
                        { type: "addLog", title: "Una pagina strappata", entry: "Le parole di Edwin si interrompono a metà frase. Da qualche parte su questa nave dev'esserci l'altra metà." }
                    ]
                },
                { type: "playSfx", sfx: "scoperta" }
            ],
            options: [
                { text: "> Esci, richiudendo piano il cassetto", target: "act1_alloggi_ufficiali" }
            ]
        },

        act1_ufficio_capitano: {
            location: "FUORI DALL'UFFICIO DEL CAPITANO",
            text: "La porta è chiusa, ma la serratura è vecchia e la nave scricchiola abbastanza da coprire un tentativo. Il cuore le batte più forte del necessario, per essere solo curiosità.",
            theme: { colorMain: "#6b1f1f" },
            music: "tensione",
            onArrive: [
                { type: "playSfx", sfx: "porta" }
            ],
            options: [
                {
                    text: "> Forza la serratura con uno spillo, in fretta",
                    skillCheck: { stat: "agilita", difficulty: 12, modifier: 0, success: "act1_ufficio_successo", failure: "act1_ufficio_fallito" }
                },
                { text: "> Non è il momento di rischiare, torna indietro", target: "act1_alloggi_ufficiali" }
            ]
        },

        act1_ufficio_successo: {
            location: "UFFICIO DEL CAPITANO",
            text: "La serratura cede con un piccolo scatto. Sulla scrivania, un registro spiccioli aperto su una pagina di marzo dello scorso anno: una voce di carico segnata come 'materiale in quarantena, stiva poppa' e poi nient'altro, come se la frase fosse stata interrotta apposta. Passi nel corridoio: non c'è tempo per leggere oltre.",
            onArriveOnce: [
                { type: "setFlag", flag: "ufficio_tentato", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Materiale in quarantena", entry: "Il registro del Capitano parla di 'materiale in quarantena' nella stiva di poppa, datato marzo dello scorso anno — proprio quando sparì Edwin." }
            ],
            theme: null,
            music: "ponte",
            options: [
                { text: "> Esci in fretta, prima di essere scoperta", target: "act1_alloggi_ufficiali" }
            ]
        },

        act1_ufficio_fallito: {
            location: "FUORI DALL'UFFICIO DEL CAPITANO",
            text: "Lo spillo scivola, la serratura non cede, e uno steward gira l'angolo proprio in quel momento. Rebecca si allontana con un sorriso forzato e il cuore in gola, la scusa di essersi persa a malapena credibile.",
            onArriveOnce: [
                { type: "setFlag", flag: "ufficio_tentato", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Quasi scoperta", entry: "Il tentativo sulla porta del Capitano è fallito. Meglio non riprovare, per ora: qualcuno potrebbe ricordarsene." }
            ],
            theme: null,
            music: "ponte",
            options: [
                { text: "> Torna nel corridoio, a passo normale", target: "act1_alloggi_ufficiali" }
            ]
        },

        // ---------- COFFA ----------

        act1_coffa: {
            location: "SARTIAME",
            text: "Le sartie salgono ripide verso la coffa. Da lassù si vede tutto il porto, e forse anche il punto esatto dove la Persefone tornò, un anno fa, senza Edwin.",
            onArrive: [
                { type: "playSfx", sfx: "corda" }
            ],
            options: [
                {
                    text: "> Arrampicati fino alla coffa",
                    skillCheck: { stat: "agilita", difficulty: 10, modifier: 0, success: "act1_coffa_successo", failure: "act1_coffa_fallito" }
                },
                { text: "> Resta sul ponte, non è il momento", target: "act1_ponte" }
            ]
        },

        act1_coffa_successo: {
            location: "COFFA",
            text: "Da qui il porto è una macchia grigia, la nave un giocattolo di legno sotto i piedi. Incastrato in una fessura del cesto di vedetta, dimenticato da chissà quale marinaio, un vecchio cannocchiale d'ottone ancora funzionante.",
            onArriveOnce: [
                {
                    type: "addItem",
                    id: "cannocchiale",
                    name: "Cannocchiale d'ottone",
                    desc: "Un vecchio cannocchiale da vedetta, lenti ancora limpide.",
                    examine: "Inciso alla base, un nome quasi cancellato: sembra 'E. Vane'. Edwin è salito fin qui, prima di lei."
                },
                { type: "addLog", title: "La coffa", entry: "Un cannocchiale dimenticato in coffa porta inciso, quasi illeggibile, il nome di Edwin." }
            ],
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><path d='M20 130 Q150 20 280 130' stroke='var(--color-main)' stroke-width='1.5' fill='none'/><circle cx='150' cy='60' r='18' stroke='var(--color-main)' fill='none'/><line x1='168' y1='60' x2='210' y2='60' stroke='var(--color-main)'/><line x1='132' y1='60' x2='90' y2='60' stroke='var(--color-main)'/></svg>",
            options: [
                { text: "> Scendi di nuovo sul ponte", target: "act1_ponte" }
            ]
        },

        act1_coffa_fallito: {
            location: "SARTIAME",
            text: "Un piede scivola su una sartia umida di salsedine. Rebecca si aggrappa in tempo, ma scende con un ginocchio sbucciato e l'orgoglio un po' ammaccato.",
            onArriveOnce: [
                { type: "addLog", title: "Un passo falso", entry: "Il tentativo di salire in coffa non è andato come sperato. Niente di grave, ma meglio essere più prudenti." }
            ],
            options: [
                { text: "> Scendi sul ponte, zoppicando appena", target: "act1_ponte" }
            ]
        },

        // ---------- FINE ATTO I ----------

        act1_fine: {
            location: "PONTE PRINCIPALE — PARTENZA",
            text: "Le cime vengono mollate una a una. Whitmoor scivola via nella nebbia del mattino, e con esso ogni possibilità di tornare indietro senza risposte. Rebecca stringe in tasca la mezza pagina di diario e guarda la linea grigia dove il mare incontra il cielo, verso la banchisa.",
            onArriveOnce: [
                { type: "addLog", title: "Si salpa", entry: "La Persefone lascia il porto. Atto I concluso." }
            ],
            options: [
                { text: "> Atto II — Il Mare Aperto", target: "act2_intro" }
            ]
        },

        // =====================================================
        // ATTO II — IL MARE APERTO
        // =====================================================
        // Nuovi flag piantati qui e usati più avanti:
        //   - vide_qualcosa_in_acqua / crane_alleato -> Atto III-V (la cosa nel ghiaccio)
        //   - sospetto_capitano -> Kessler più guardingo in Atto III-IV
        //   - finch_pieno_alleato -> alleanza forte con Finch in Atto IV
        //   - fiducia_peter (stat, da Atto I) determina se Peter parla ora o resta evasivo

        act2_intro: {
            location: "MARE APERTO — TERZO GIORNO",
            text: "Il porto è un ricordo grigio all'orizzonte. La Persefone taglia onde sempre più alte; l'aria sa già di ghiaccio, anche se la banchisa è ancora lontana giorni. Rebecca ha imparato i turni, i nomi, le facce. Ha anche imparato quanto poco, davvero, sa ancora.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><path d='M0 110 Q40 95 80 110 T160 110 T240 110 T300 110' stroke='var(--color-main)' fill='none'/><path d='M0 125 Q40 112 80 125 T160 125 T240 125 T300 125' stroke='var(--color-main)' fill='none' stroke-opacity='0.6'/><path d='M40 105 L60 55 L200 55 L220 105 Z' stroke='var(--color-main)' stroke-width='1.5' fill='none'/><line x1='90' y1='55' x2='90' y2='6' stroke='var(--color-main)' stroke-width='1.5'/><line x1='90' y1='16' x2='140' y2='16' stroke='var(--color-main)'/></svg>",
            music: "ponte",
            options: [
                { text: "> Torna ai tuoi doveri di bordo", target: "act2_ponte" }
            ]
        },

        act2_ponte: {
            location: "PONTE PRINCIPALE — MARE APERTO",
            text: "Il ponte è più affollato del solito, tra manovre e controlli. Il cielo a ovest si sta scurendo in una linea netta, poco rassicurante.",
            onArriveOnce: [
                { type: "addLog", title: "Voci alterate", entry: "Passando vicino alla cabina di comando, Rebecca sente Finch e Kessler litigare a bassa voce su 'quello che c'è scritto nel registro'. Smettono non appena si accorgono di lei." }
            ],
            options: [
                { text: "> Vai a prua", target: "act2_prua" },
                { text: "> Scendi agli alloggi dell'equipaggio", target: "act2_alloggi_equipaggio" },
                { text: "> Vai in infermeria", target: "act2_infermeria" },
                { text: "> Vai agli alloggi ufficiali", target: "act2_alloggi_ufficiali" },
                { text: "> Fai il turno di guardia notturno", condition: { type: "flag", flag: "act2_guardia_fatta", equals: false }, target: "act2_guardia_notturna" },
                { text: "> Il vento cambia: prepara la nave alla tempesta", condition: { type: "flag", flag: "act2_capitano_al_timone", equals: false }, target: "act2_tempesta_inizia" },
                { text: "> Vai al timone: la nave ha bisogno di mani forti", condition: { type: "flag", flag: "act2_capitano_al_timone", equals: true }, target: "act2_timone" },
                { text: "> Il Capitano è al timone: è la tua occasione per entrare nel suo ufficio", condition: { all: [ { type: "flag", flag: "act2_capitano_al_timone", equals: true }, { type: "flag", flag: "act2_ufficio_cercato", equals: false } ] }, target: "act2_ufficio_capitano_ricerca" },
                { text: "> Addentrati verso il cuore del ghiaccio", condition: { type: "flag", flag: "act2_capitano_al_timone", equals: true }, target: "act2_fine" }
            ]
        },

        act2_tempesta_inizia: {
            location: "PONTE PRINCIPALE — LA TEMPESTA SI AVVICINA",
            text: "\"Tutti ai loro posti!\" La voce di Kessler taglia il vento. Il Capitano stesso prende il timone: non si fida di nessun altro con questo mare. La Persefone si inclina, si raddrizza, si inclina di nuovo.",
            theme: { colorMain: "#1f3b4d" },
            music: "tempesta",
            onArriveOnce: [
                { type: "setFlag", flag: "act2_capitano_al_timone", value: true },
                { type: "playSfx", sfx: "tuono" },
                { type: "addLog", title: "La tempesta", entry: "Kessler ha preso personalmente il timone. Per la prima volta dall'imbarco, il suo ufficio resta incustodito." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- PRUA: SILAS CRANE (atto II) ----------

        act2_prua: {
            location: "PRUA — MARE APERTO",
            text: "Crane scruta l'orizzonte a ovest più che le onde davanti a sé, come se il pericolo peggiore non fosse la tempesta.",
            options: [
                { text: "> Chiedi a Crane cosa lo preoccupa davvero", condition: { type: "flag", flag: "crane_scena2_fatta", equals: false }, target: "act2_crane_scena2" },
                { text: "> Scambia ancora due parole con Crane", condition: { type: "flag", flag: "crane_scena2_fatta", equals: true }, target: "act2_crane_breve2" },
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_crane_scena2: {
            location: "PRUA",
            text: "\"Siamo quasi al punto\", dice Crane senza voltarsi. \"Dove la persero, l'anno scorso. Ci arriveremo tra pochi giorni, con questo vento anche prima.\" Stringe l'arpione più forte del necessario. \"Se vedete qualcosa nell'acqua di notte, ditemelo. A me, non al Capitano.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "crane_scena2_fatta", value: true },
                { type: "addLog", title: "Il punto esatto", entry: "Crane sa esattamente dove e quando la Persefone perse Edwin l'anno scorso — e vuole essere il primo a sapere se succede di nuovo qualcosa." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_crane_breve2: {
            location: "PRUA",
            text: "Crane annuisce appena, gli occhi sempre fissi sull'acqua scura oltre la prua.",
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- ALLOGGI EQUIPAGGIO (atto II) ----------

        act2_alloggi_equipaggio: {
            location: "ALLOGGI DELL'EQUIPAGGIO — MARE APERTO",
            text: "L'aria qui sotto è più densa, tra corpi stanchi e lampade a olio. Peter è seduto su un baule, le ginocchia strette al petto; Old Ove tiene banco come sempre in cambusa.",
            options: [
                { text: "> Cerca Peter: forse ora è pronto a parlare", condition: { all: [ { type: "flag", flag: "peter_scena2_fatta", equals: false }, { type: "stat", stat: "fiducia_peter", op: ">=", value: 3 } ] }, target: "act2_peter_rivelazione" },
                { text: "> Cerca Peter", condition: { all: [ { type: "flag", flag: "peter_scena2_fatta", equals: false }, { type: "stat", stat: "fiducia_peter", op: "<", value: 3 } ] }, target: "act2_peter_evasivo" },
                { text: "> Saluta di nuovo Peter", condition: { type: "flag", flag: "peter_scena2_fatta", equals: true }, target: "act2_peter_breve2" },
                { text: "> Parla con Old Ove", condition: { type: "flag", flag: "ove_scena2_fatta", equals: false }, target: "act2_ove_scena2" },
                { text: "> Saluta di nuovo Old Ove", condition: { type: "flag", flag: "ove_scena2_fatta", equals: true }, target: "act2_ove_breve2" },
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_peter_rivelazione: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter la tira per una manica in un angolo, la voce appena un soffio. \"Quella notte ho visto vostro fratello scendere in stiva scortato dal Capitano in persona e dal dottore di allora — non la dottoressa Salt, un altro, che non è più a bordo. Non è più risalito. Al mattino ci hanno detto che era caduto in mare durante il suo turno. Ma io il suo turno non l'ho mai sentito chiamare.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "peter_scena2_fatta", value: true },
                { type: "setFlag", flag: "peter_ha_rivelato", value: true },
                { type: "addLog", title: "La testimonianza di Peter", entry: "Peter ha visto Edwin scendere in stiva, scortato, la notte in cui sarebbe 'caduto in mare'. Non è mai più risalito — e il suo turno di guardia non fu mai annunciato." }
            ],
            options: [
                { text: "> \"Grazie, Peter. Non lo dimenticherò.\"", target: "act2_alloggi_equipaggio" }
            ]
        },

        act2_peter_evasivo: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter la vede arrivare e si irrigidisce. \"Non ho altro da dirvi\", mormora, gli occhi bassi. Non è cattiveria: è paura pura, quella che le impedisce di insistere.",
            onArriveOnce: [
                { type: "setFlag", flag: "peter_scena2_fatta", value: true },
                { type: "addLog", title: "Ancora silenzio", entry: "Peter non si fida ancora abbastanza per parlare. Qualunque cosa sappia, resta con lui." }
            ],
            options: [
                { text: "> Non insistere, per ora", target: "act2_alloggi_equipaggio" }
            ]
        },

        act2_peter_breve2: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter le rivolge un cenno, un po' meno guardingo di prima.",
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act2_alloggi_equipaggio" }
            ]
        },

        act2_ove_scena2: {
            location: "CAMBUSA",
            text: "\"Quarantena\", ripete Ove quando Rebecca gli chiede della febbre. \"Parola grossa per dire 'chiuso sottocoperta e nessuno può più vederlo'. L'ho sentita anch'io, quella parola, uscire dalla bocca del Capitano una volta, per sbaglio. Poi più.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "ove_scena2_fatta", value: true },
                { type: "addLog", title: "La parola del Capitano", entry: "Old Ove conferma: ha sentito Kessler stesso usare la parola 'quarantena' — la stessa del registro trovato nell'ufficio." }
            ],
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act2_alloggi_equipaggio" }
            ]
        },

        act2_ove_breve2: {
            location: "CAMBUSA",
            text: "Ove le offre un'altra scodella di brodo, senza aggiungere altro. Ha già detto quello che sapeva.",
            options: [
                { text: "> Torna dagli alloggi comuni", target: "act2_alloggi_equipaggio" }
            ]
        },

        // ---------- INFERMERIA (atto II) ----------

        act2_infermeria: {
            location: "INFERMERIA — MARE APERTO",
            text: "La dottoressa Salt smista bende con mani ferme, ma le occhiaie sono più marcate di qualche giorno fa.",
            options: [
                { text: "> Chiedile della febbre di cui ha sentito parlare Old Ove", condition: { all: [ { type: "flag", flag: "salt_scena2_fatta", equals: false }, { type: "flag", flag: "ove_hint_febbre", equals: true } ] }, target: "act2_salt_profonda" },
                { text: "> Prova a farla parlare del viaggio dell'anno scorso", condition: { all: [ { type: "flag", flag: "salt_scena2_fatta", equals: false }, { type: "flag", flag: "ove_hint_febbre", equals: false } ] }, target: "act2_salt_generica" },
                { text: "> Saluta di nuovo la dottoressa Salt", condition: { type: "flag", flag: "salt_scena2_fatta", equals: true }, target: "act2_salt_breve2" },
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_salt_profonda: {
            location: "INFERMERIA",
            text: "Salt smette di lavorare. \"Chi ve ne ha parlato... non importa.\" Sospira, si siede. \"Sì, ci fu un'epidemia, l'anno scorso. Non grave quanto pensavano — ma il Capitano precedente al comando temeva la quarantena del porto, così la nave restò in mare più del dovuto. Alcuni non ce la fecero. Vostro fratello curava i malati più di quanto gli spettasse. Poi si ammalò anche lui. Dopo... la versione ufficiale cambiò da malattia a tempesta. Più facile da spiegare a un armatore.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "salt_scena2_fatta", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "La verità della dottoressa Salt", entry: "Un'epidemia insabbiata, non una tempesta. Edwin si ammalò curando gli altri. La versione ufficiale fu riscritta per convenienza — ma Salt non dice se Edwin sia davvero morto." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_salt_generica: {
            location: "INFERMERIA",
            text: "\"Il viaggio dell'anno scorso fu duro\", ammette Salt, misurando le parole. \"Più duro di quanto dica il registro ufficiale. Non chiedetemi altro, non qui.\" Il suo sguardo, però, dice che c'è molto altro.",
            onArriveOnce: [
                { type: "setFlag", flag: "salt_scena2_fatta", value: true },
                { type: "addLog", title: "Poche parole, molto non detto", entry: "Salt ammette solo che il viaggio scorso fu 'più duro del registro ufficiale', senza scendere nei dettagli." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_salt_breve2: {
            location: "INFERMERIA",
            text: "Salt la saluta con un cenno breve e torna alle sue bende, come se avesse già detto troppo.",
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- ALLOGGI UFFICIALI (atto II) ----------

        act2_alloggi_ufficiali: {
            location: "ALLOGGI UFFICIALI — MARE APERTO",
            text: "Il corridoio degli ufficiali è silenzioso, la porta della cabina vuota di Edwin sempre socchiusa come un rimprovero.",
            options: [
                { text: "> Racconta a Finch quello che hai scoperto", condition: { all: [ { type: "flag", flag: "finch_scena2_fatta", equals: false }, { type: "flag", flag: "finch_ally", equals: true } ] }, target: "act2_finch_confidente" },
                { text: "> Parla con Finch, con cautela", condition: { all: [ { type: "flag", flag: "finch_scena2_fatta", equals: false }, { type: "flag", flag: "finch_ally", equals: false } ] }, target: "act2_finch_cauto" },
                { text: "> Saluta di nuovo Finch", condition: { type: "flag", flag: "finch_scena2_fatta", equals: true }, target: "act2_finch_breve2" },
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_finch_confidente: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch ascolta tutto senza interromperla, la mascella sempre più tesa. \"Anch'io ho notato incongruenze nei registri di carico\", ammette infine. \"Non sapevo si trattasse di questo. Se trovate altro, portatelo a me prima che a chiunque altro. Il Capitano non deve sapere quanto sappiamo, non ancora.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_scena2_fatta", value: true },
                { type: "setFlag", flag: "finch_pieno_alleato", value: true },
                { type: "addLog", title: "Un alleato vero", entry: "Finch si schiera apertamente al fianco di Rebecca. D'ora in poi sa di poter contare su di lui, non solo su un ascolto discreto." }
            ],
            options: [
                { text: "> Torna nel corridoio", target: "act2_alloggi_ufficiali" }
            ]
        },

        act2_finch_cauto: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch la ascolta con attenzione ma resta sulle sue. \"Sono voci, signorina Vane. Pericolose, se dette alla persona sbagliata.\" Non nega nulla, ma non si sbilancia nemmeno.",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_scena2_fatta", value: true },
                { type: "addLog", title: "Cautela reciproca", entry: "Finch resta prudente. Senza la fiducia costruita all'imbarco, non si espone." }
            ],
            options: [
                { text: "> Torna nel corridoio", target: "act2_alloggi_ufficiali" }
            ]
        },

        act2_finch_breve2: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch le rivolge uno sguardo che dice più di quanto oserebbe dire ad alta voce.",
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- UFFICIO DEL CAPITANO, DURANTE LA TEMPESTA ----------

        act2_ufficio_capitano_ricerca: {
            location: "UFFICIO DEL CAPITANO",
            text: "Con Kessler al timone e la tempesta a coprire ogni rumore, la porta cede più facilmente del previsto. Sulla scrivania lo stesso registro della volta scorsa; dietro un pannello smosso della libreria, qualcosa di bianco spunta appena.",
            theme: { colorMain: "#6b1f1f" },
            onArrive: [
                { type: "playSfx", sfx: "carta" }
            ],
            options: [
                {
                    text: "> Fruga in fretta tra le carte e il pannello nascosto",
                    skillCheck: { stat: "agilita", difficulty: 11, modifier: 0, success: "act2_ufficio_trovato_calma", failure: "act2_ufficio_trovato_spavento" }
                },
                { text: "> Troppo rischioso, richiudi la porta", target: "act2_ponte" }
            ]
        },

        act2_ufficio_trovato_calma: {
            location: "UFFICIO DEL CAPITANO",
            text: "Dietro il pannello, una seconda mezza pagina di diario, ripiegata con cura come una reliquia. Rebecca la prende, richiude tutto esattamente come l'ha trovato, ed esce senza far rumore.",
            onArriveOnce: [
                { type: "setFlag", flag: "act2_ufficio_cercato", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                {
                    type: "addItem",
                    id: "pagina_diario_b",
                    name: "L'altra metà della pagina",
                    desc: "Il frammento superiore della stessa pagina strappata trovata nella cabina di Edwin.",
                    examine: "'...toccare quell'uomo. Da allora nessuno pronuncia più il nome del marinaio che curava. Se leggete questo, non fidatevi delle date sul registro ufficiale.' Le due metà, insieme, potrebbero dire di più."
                },
                { type: "addLog", title: "L'altra metà", entry: "Nascosta dietro un pannello della libreria, la seconda metà della pagina di Edwin. Le due parti, combinate, potrebbero rivelare la frase intera." }
            ],
            theme: null,
            music: "tempesta",
            options: [
                { text: "> Esci con calma, come se nulla fosse", target: "act2_ponte" }
            ]
        },

        act2_ufficio_trovato_spavento: {
            location: "UFFICIO DEL CAPITANO",
            text: "Un passo pesante nel corridoio, troppo vicino: Rebecca strappa il frammento dal pannello ed esce quasi correndo, il cuore che le martella le tempie. Non è sicura di essere stata vista — ma non ne è nemmeno sicura del contrario.",
            onArriveOnce: [
                { type: "setFlag", flag: "act2_ufficio_cercato", value: true },
                { type: "setFlag", flag: "sospetto_capitano", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -2 },
                {
                    type: "addItem",
                    id: "pagina_diario_b",
                    name: "L'altra metà della pagina",
                    desc: "Il frammento superiore della stessa pagina strappata trovata nella cabina di Edwin, un angolo stropicciato dalla fretta.",
                    examine: "'...toccare quell'uomo. Da allora nessuno pronuncia più il nome del marinaio che curava. Se leggete questo, non fidatevi delle date sul registro ufficiale.' Le due metà, insieme, potrebbero dire di più."
                },
                { type: "addLog", title: "Quasi scoperta, di nuovo", entry: "Ha preso il frammento, ma qualcuno l'ha quasi vista uscire dall'ufficio del Capitano. Da ora, Kessler potrebbe guardarla con occhi diversi." }
            ],
            theme: null,
            music: "tempesta",
            options: [
                { text: "> Torna sul ponte, ricomponendoti", target: "act2_ponte" }
            ]
        },

        // ---------- TIMONE ----------

        act2_timone: {
            location: "AL TIMONE — TEMPESTA",
            text: "Il legno del timone vibra sotto le mani, la pioggia orizzontale. Kessler le lancia un'occhiata: \"Se volete rendervi utile, tenetelo dritto quando lo dico io.\"",
            options: [
                {
                    text: "> Aggrappati al timone con tutta la forza che hai",
                    skillCheck: { stat: "forza", difficulty: 11, modifier: 0, success: "act2_timone_successo", failure: "act2_timone_fallito" }
                },
                { text: "> Meglio lasciare la manovra a chi sa il fatto suo", target: "act2_ponte" }
            ]
        },

        act2_timone_successo: {
            location: "AL TIMONE",
            text: "La nave risponde, si raddrizza. Per un istante Kessler le rivolge quasi un'approvazione, e più tardi Rebecca nota che qualche marinaio la guarda con occhi diversi — persino Peter, da lontano, sorride appena.",
            onArriveOnce: [
                { type: "setFlag", flag: "equipaggio_rispetto", value: true },
                { type: "modifyStat", stat: "fiducia_peter", delta: 1 },
                { type: "addLog", title: "Mani forti", entry: "Rebecca ha retto il timone nella tempesta. L'equipaggio, e persino Peter, la guardano ora con più rispetto." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_timone_fallito: {
            location: "AL TIMONE",
            text: "Le braccia cedono, il timone quasi le sfugge: qualcuno la afferra per un braccio prima che scivoli sul ponte bagnato. \"Attenta\", dice solo, senza rimprovero.",
            onArriveOnce: [
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Quasi trascinata via", entry: "La tempesta ha avuto la meglio, almeno stavolta. Rebecca è illesa, ma scossa." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- GUARDIA NOTTURNA ----------

        act2_guardia_notturna: {
            location: "PONTE — TURNO DI NOTTE",
            text: "Il mare è nero, punteggiato appena dalla luce di poppa. Per un lungo momento, qualcosa di pallido scivola appena sotto la superficie, alla stessa velocità della nave, poi scompare senza una increspatura.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='300' height='140' fill='none'/><path d='M0 100 Q60 90 120 100 T240 100 T300 100' stroke='var(--color-main)' fill='none'/><ellipse cx='170' cy='108' rx='24' ry='6' stroke='var(--color-main)' fill='none' stroke-opacity='0.5'/></svg>",
            music: "notte",
            onArriveOnce: [
                { type: "setFlag", flag: "act2_guardia_fatta", value: true },
                { type: "setFlag", flag: "vide_qualcosa_in_acqua", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "playSfx", sfx: "acqua" },
                { type: "addLog", title: "Qualcosa nell'acqua", entry: "Durante il turno di notte, Rebecca vede — o crede di vedere — qualcosa di pallido muoversi appena sotto la superficie, alla stessa velocità della nave." }
            ],
            options: [
                { text: "> Corri a svegliare Silas Crane", target: "act2_guardia_condivisa" },
                { text: "> Non dire nulla a nessuno, potrebbe essere stata suggestione", target: "act2_guardia_silenziosa" }
            ]
        },

        act2_guardia_condivisa: {
            location: "PRUA — NOTTE",
            text: "Crane non sembra affatto sorpreso. \"Ve l'avevo detto\", sussurra, quasi sollevato di non essere l'unico. Da questo momento parla con lei come si parla a chi ha visto la stessa cosa — con la fiducia di chi condivide una colpa.",
            onArriveOnce: [
                { type: "setFlag", flag: "crane_alleato", value: true },
                { type: "addLog", title: "Non più sola a saperlo", entry: "Crane crede a Rebecca senza esitazione. Ora sa di avere, nel bene o nel male, un alleato che capisce cosa ha visto." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        act2_guardia_silenziosa: {
            location: "PONTE — NOTTE",
            text: "Rebecca resta in silenzio, le mani strette sulla murata. Forse è stata solo stanchezza, si dice. Non ne è del tutto convinta.",
            onArriveOnce: [
                { type: "addLog", title: "Un segreto in più", entry: "Rebecca ha scelto di non dire nulla a nessuno, per ora. Qualunque cosa fosse, resta solo sua." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act2_ponte" }
            ]
        },

        // ---------- FINE ATTO II ----------

        act2_fine: {
            location: "VERSO LA BANCHISA",
            text: "La tempesta si placa lasciando dietro di sé un silenzio innaturale. All'orizzonte, una linea bianca e frastagliata: la banchisa. Da qualche parte, tra quel ghiaccio, la Persefone perse Edwin un anno fa — e sta per tornare esattamente nello stesso punto.",
            onArriveOnce: [
                { type: "addLog", title: "La banchisa", entry: "La Persefone raggiunge la banchisa. Atto II concluso." }
            ],
            options: [
                { text: "> Atto III — Il Cuore del Ghiaccio", target: "act3_intro" }
            ]
        },

        // =====================================================
        // ATTO III — IL CUORE DEL GHIACCIO
        // =====================================================
        // Il colpo di scena centrale della saga. Qui la storia ufficiale
        // ("tempesta") crolla del tutto: non fu il mare a prendersi Edwin,
        // ma una decisione umana. La qualità del confronto con Kessler
        // dipende da cosa il giocatore ha davvero raccolto negli Atti I-II
        // (noticed_torn_page, diario_completo, sospetto_capitano).

        act3_intro: {
            location: "NELLA BANCHISA",
            text: "Il ghiaccio stringe lo scafo con un lamento di legno e metallo. La Persefone è ferma, incastrata, esattamente — Crane lo giura — nello stesso punto dell'anno scorso. Kessler ordina un'ispezione della stiva per i danni: per la prima volta, a Rebecca viene detto di scendere là sotto invece che doverlo rubare di nascosto.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><path d='M0 120 L40 95 L75 120 L110 90 L150 120 L190 92 L230 120 L270 96 L300 120' stroke='var(--color-main)' fill='none'/><path d='M30 90 L60 60 L110 60 L120 90' stroke='var(--color-main)' stroke-width='1.5' fill='none'/><line x1='75' y1='60' x2='75' y2='10' stroke='var(--color-main)' stroke-width='1.5'/></svg>",
            music: "ghiaccio",
            options: [
                { text: "> Scendi in stiva con la scusa dell'ispezione", target: "act3_ponte" }
            ]
        },

        act3_ponte: {
            location: "PONTE PRINCIPALE — NAVE INCASTRATA NEL GHIACCIO",
            text: "Il vento fischia tra il sartiame immobile. La nave non va da nessuna parte, per ora — il che significa che, per la prima volta dall'imbarco, Rebecca ha tempo per cercare risposte vere.",
            options: [
                { text: "> Scendi in stiva", target: "act3_stiva_ingresso" },
                { text: "> Osserva il ghiaccio dal ponte", condition: { type: "flag", flag: "scoperta_manifesto", equals: false }, target: "act3_osserva_ghiaccio" },
                { text: "> Esci sul pack, verso il punto sulla mappa", condition: { type: "flag", flag: "scoperta_manifesto", equals: true }, target: "act3_ghiaccio_uscita" },
                { text: "> Parla con Finch di quello che avete trovato", condition: { all: [ { type: "flag", flag: "finch_reazione_fatta", equals: false }, { type: "flag", flag: "quarantena_vista", equals: true } ] }, target: "act3_finch_reazione" },
                { text: "> Parla con Crane di quello che avete trovato", condition: { all: [ { type: "flag", flag: "crane_reazione_fatta", equals: false }, { type: "flag", flag: "quarantena_vista", equals: true } ] }, target: "act3_crane_reazione" },
                { text: "> Confronta il Capitano con quello che sai", condition: { all: [ { type: "flag", flag: "quarantena_vista", equals: true }, { type: "flag", flag: "scoperta_manifesto", equals: true }, { type: "flag", flag: "confronto_fatto", equals: false } ] }, target: "act3_confronto_capitano" },
                { text: "> È il momento di lasciare che le cose precipitino", condition: { type: "flag", flag: "confronto_fatto", equals: true }, target: "act3_fine" }
            ]
        },

        act3_osserva_ghiaccio: {
            location: "PONTE",
            text: "Da qui il pack è solo una distesa bianca senza forma, senza indizi. Bisogna trovare qualcosa di più concreto prima di potersi spingere là fuori.",
            options: [
                { text: "> Torna alla stiva", target: "act3_ponte" }
            ]
        },

        act3_stiva_ingresso: {
            location: "STIVA",
            text: "Casse, ghiaccio colato dalle paratie, l'odore stantio di un luogo chiuso da mesi. In fondo, oltre il carico regolare, una porta più stretta delle altre — verso poppa, dove il registro del Capitano parlava di 'materiale in quarantena'.",
            options: [
                { text: "> Entra nella cella oltre la porta stretta", target: "act3_stiva_quarantena" },
                { text: "> Cerca tra i documenti di carico lasciati qui sotto", target: "act3_stiva_scoperta" },
                { text: "> Risali sul ponte", target: "act3_ponte" }
            ]
        },

        act3_stiva_quarantena: {
            location: "LA CELLA DI QUARANTENA",
            text: "Una brandina, una catinella, una coperta ancora piegata con cura militare. Sulla parete di legno, incise con un chiodo, delle tacche in file di sette: qualcuno ha contato i giorni, qui dentro, per settimane. Sotto la branda, dimenticato o nascosto, un piccolo ciondolo con l'incisione 'E.V.'",
            onArriveOnce: [
                { type: "setFlag", flag: "quarantena_vista", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                {
                    type: "addItem",
                    id: "ciondolo_edwin",
                    name: "Ciondolo di Edwin",
                    desc: "Un piccolo ciondolo d'ottone, iniziali 'E.V.' incise a mano.",
                    examine: "Le tacche sulla parete, contate una a una, arrivano a quarantadue. Quarantadue giorni chiuso qui dentro. Non è il tempo di un naufragio: è il tempo di qualcuno tenuto in vita, e in attesa.",
                    examineEffects: [
                        { type: "addLog", title: "Quarantadue giorni", entry: "Le tacche sulla parete della cella contano quarantadue giorni. Edwin non è annegato in una notte di tempesta: è stato tenuto qui, vivo, per settimane." }
                    ]
                }
            ],
            options: [
                { text: "> Esci, portando con te il ciondolo", target: "act3_stiva_ingresso" }
            ]
        },

        act3_stiva_scoperta: {
            location: "STIVA — DOCUMENTI DI CARICO",
            text: "Tra le carte umide, un manifesto di rifornimenti mai consegnato all'armatore: razioni per una persona, per sei settimane, destinazione 'a terra, presso il punto di rilevamento'. Sotto, piegata dentro una scatola di latta, una piccola mappa incisa su una tavoletta di legno — coordinate rozze, una X su un tratto di costa rocciosa vicino alla banchisa.",
            onArriveOnce: [
                { type: "setFlag", flag: "scoperta_manifesto", value: true },
                {
                    type: "addItem",
                    id: "mappa_incisa",
                    name: "Mappa incisa su legno",
                    desc: "Coordinate approssimative incise a coltello, una X segnata su un tratto di costa vicino alla banchisa.",
                    examine: "Non è la calligrafia di Edwin, questa volta: è più squadrata, più adulta. Qualcun altro ha segnato questo punto, e sapeva esattamente cosa significasse."
                },
                { type: "addLog", title: "Razioni per sei settimane", entry: "Un manifesto mai consegnato all'armatore parla di razioni per una sola persona, per sei settimane, destinate 'a terra'. Una mappa incisa segna il punto esatto." }
            ],
            options: [
                { text: "> Risali sul ponte, con la mappa in mano", target: "act3_ponte" }
            ]
        },

        act3_ghiaccio_uscita: {
            location: "SUL PACK, VERSO LA X SULLA MAPPA",
            text: "Il ghiaccio scricchiola sotto gli stivali. Il punto segnato sulla mappa non è lontano: una sporgenza di roccia nera che rompe il bianco, e qualcosa — i resti di un piccolo riparo, forse — appoggiato contro la parete di roccia.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><path d='M0 130 L300 130' stroke='var(--color-main)'/><path d='M200 130 L220 70 L260 70 L275 130' stroke='var(--color-main)' stroke-width='1.5' fill='none'/><path d='M225 100 L250 100 L250 130 L225 130 Z' stroke='var(--color-main)' fill='none'/></svg>",
            music: "ghiaccio",
            onArrive: [
                { type: "playSfx", sfx: "vento" }
            ],
            options: [
                {
                    text: "> Avvicinati con cautela sul ghiaccio scricchiolante",
                    skillCheck: { stat: "agilita", difficulty: 10, modifier: 0, success: "act3_ghiaccio_successo", failure: "act3_ghiaccio_fallito" }
                }
            ]
        },

        act3_ghiaccio_successo: {
            location: "IL RIPARO SULLA ROCCIA",
            text: "Il riparo è rudimentale ma non abbandonato da sempre: sotto un telo indurito dal gelo, resti di un piccolo fuoco, ossa di foca ripulite con cura, e inciso sulla roccia, fresco rispetto al resto — 'VIVO. ANDATO A NORD. E.V.' Non ci sono mesi di polvere su quei segni.",
            onArriveOnce: [
                { type: "setFlag", flag: "campo_trovato", value: true },
                { type: "setFlag", flag: "segno_recente", value: true },
                { type: "addLog", title: "Vivo. Andato a nord.", entry: "Il riparo sulla roccia non è una tomba: i segni sono recenti. Edwin ha sopravvissuto abbastanza a lungo da lasciare un messaggio — e forse è ancora vivo, da qualche parte più a nord." }
            ],
            options: [
                { text: "> Torna alla nave con questa speranza", target: "act3_ponte" }
            ]
        },

        act3_ghiaccio_fallito: {
            location: "IL RIPARO SULLA ROCCIA",
            text: "Uno scivolone sul ghiaccio le fa perdere secondi preziosi; quando raggiunge il riparo il vento ha già eroso i segni più freschi. Restano solo tracce vecchie, mesi di gelo e disgelo: un piccolo fuoco spento da tempo, ossa sbiancate. Impossibile dire quanto a lungo Edwin sia rimasto qui, o quando se ne sia andato.",
            onArriveOnce: [
                { type: "setFlag", flag: "campo_trovato", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Tracce troppo vecchie", entry: "Il riparo sulla roccia è stato usato, ma il tempo ha cancellato ogni indizio su quanto a lungo, o su cosa sia successo dopo." }
            ],
            options: [
                { text: "> Torna alla nave, col dubbio addosso", target: "act3_ponte" }
            ]
        },

        act3_finch_reazione: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch osserva il ciondolo a lungo, senza toccarlo. \"Quarantadue giorni\", ripete, come se il numero da solo bastasse a condannare qualcuno. Se si fida già di Rebecca, la sua rabbia si trasforma in fretta in determinazione: qualcuno dovrà rispondere di questo, e non sarà lui a proteggerlo oltre.",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_reazione_fatta", value: true },
                { type: "addLog", title: "Finch decide da che parte stare", entry: "Davanti alle prove, Finch smette di proteggere il Capitano per lealtà d'abitudine. La sua posizione, ora, è chiara." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act3_ponte" }
            ]
        },

        act3_crane_reazione: {
            location: "PRUA",
            text: "Crane ascolta e annuisce piano, come chi riceve conferma di qualcosa che temeva da tempo. \"Quarantadue giorni chiuso al buio\", dice. \"E noi a bere birra sul ponte sopra di lui, senza saperlo. O sapendolo, e fingendo di no.\" Non lo dice con rabbia. Lo dice con vergogna.",
            onArriveOnce: [
                { type: "setFlag", flag: "crane_reazione_fatta", value: true },
                { type: "addLog", title: "La vergogna di Crane", entry: "Crane non è sorpreso, ma è scosso: sapeva che qualcosa non tornava, e non ha mai insistito abbastanza per scoprirlo." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act3_ponte" }
            ]
        },

        act3_confronto_capitano: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler la riceve in piedi, le mani dietro la schiena come il primo giorno a Whitmoor. Rebecca posa sul tavolo il ciondolo, poi il manifesto di rifornimenti. Per un lungo momento, nessuno dei due parla.",
            theme: { colorMain: "#1f3b4d" },
            music: "confronto",
            options: [
                {
                    text: "> Posa anche il diario ricomposto: \"Edwin ha scritto ogni parola, Capitano. So cosa c'è sotto il ponte di poppa.\"",
                    condition: { type: "item", item: "diario_completo", quantity: 1 },
                    target: "act3_capitano_confessione"
                },
                {
                    text: "> \"So cosa significa 'materiale in quarantena, stiva di poppa'. L'ho letto di mio pugno nel vostro registro.\"",
                    condition: { type: "flag", flag: "noticed_torn_page", equals: true },
                    target: "act3_capitano_ammissione_parziale"
                },
                {
                    text: "> \"Cosa è successo davvero a mio fratello, Capitano?\"",
                    condition: { all: [ { type: "flag", flag: "sospetto_capitano", equals: true } ] },
                    target: "act3_capitano_diniego_ostile"
                },
                {
                    text: "> \"Cosa è successo davvero a mio fratello, Capitano?\"",
                    condition: { type: "flag", flag: "sospetto_capitano", equals: false },
                    target: "act3_capitano_diniego"
                }
            ]
        },

        act3_capitano_confessione: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler si siede, di colpo più vecchio. \"Volevo tornare a prenderlo\", dice, la voce piatta di chi ha ripetuto questa frase solo a se stesso, di notte. \"C'era un'altra baleniera attesa in quella zona due settimane dopo. Contavo su quella. Non è mai passata — o è passata e non l'ha trovato. Non lo so. Ho scelto di crederlo vivo, perché l'alternativa era ammettere di aver abbandonato un uomo per salvare la rotta commerciale.\" Non chiede perdono. Ammette, e basta.",
            onArriveOnce: [
                { type: "setFlag", flag: "confronto_fatto", value: true },
                { type: "setFlag", flag: "capitano_confessione", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "La confessione", entry: "Kessler ammette tutto: la quarantena, l'abbandono calcolato, la speranza mai verificata che un'altra nave lo recuperasse. Non è un mostro. È qualcosa di più difficile da perdonare: un uomo che ha fatto un conto, e ha scelto." }
            ],
            options: [
                { text: "> Lascia la cabina, senza sapere se odiarlo o compatirlo", target: "act3_ponte" }
            ]
        },

        act3_capitano_ammissione_parziale: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler non nega la quarantena — non può, non più. Ma sulla decisione di lasciarlo lì, si trincera: \"Fu il dottore di allora a dire che il rischio di contagio era troppo alto per riportarlo a bordo. Io ho eseguito un parere medico, signorina Vane. Non l'ho condannato io.\" Non è tutta la verità, e lo sanno entrambi — ma è quanto è disposto a dire, per ora.",
            onArriveOnce: [
                { type: "setFlag", flag: "confronto_fatto", value: true },
                { type: "setFlag", flag: "capitano_ammissione_parziale", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Una mezza verità", entry: "Kessler ammette la quarantena ma scarica la responsabilità della decisione finale su un medico che non è più a bordo per smentirlo." }
            ],
            options: [
                { text: "> Lascia la cabina, con più domande di prima", target: "act3_ponte" }
            ]
        },

        act3_capitano_diniego: {
            location: "CABINA DEL CAPITANO",
            text: "\"Non so di cosa parliate\", dice Kessler, e per la prima volta la sua voce misurata vacilla appena. \"Suo fratello è morto in una tempesta. È scritto nel registro ufficiale, ed è quello che conta per l'armatore, per l'assicurazione, e per lei.\" Non è un'ammissione. Ma non è nemmeno la freddezza di chi non ha nulla da nascondere.",
            onArriveOnce: [
                { type: "setFlag", flag: "confronto_fatto", value: true },
                { type: "setFlag", flag: "capitano_diniego", value: true },
                { type: "addLog", title: "Un diniego che non convince", entry: "Kessler nega tutto, ma la sua voce lo tradisce. Senza prove più solide, però, non c'è modo di smentirlo apertamente — non ancora." }
            ],
            options: [
                { text: "> Lascia la cabina, decisa a trovare prove migliori", target: "act3_ponte" }
            ]
        },

        act3_capitano_diniego_ostile: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler la fissa a lungo. \"Ho notato che vi aggirate dove non dovreste, signorina Vane\", dice piano — sa dell'ufficio, o lo sospetta abbastanza. \"Vi consiglio di lasciar perdere questa storia della tempesta. Per il resto del viaggio, e per il vostro bene.\" Non è più un diniego: è un avvertimento.",
            onArriveOnce: [
                { type: "setFlag", flag: "confronto_fatto", value: true },
                { type: "setFlag", flag: "capitano_diniego", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "addLog", title: "Un avvertimento, non una risposta", entry: "Kessler non conferma né nega più nulla: la mette in guardia, apertamente. Sa, o sospetta, quanto lei abbia già scoperto." }
            ],
            options: [
                { text: "> Lascia la cabina, con il sangue freddo", target: "act3_ponte" }
            ]
        },

        // ---------- FINE ATTO III ----------

        act3_fine: {
            location: "NAVE INCASTRATA NEL GHIACCIO",
            text: "Qualunque cosa Kessler abbia detto o taciuto, la verità ormai circola sottocoperta come una corrente sotto il ghiaccio. Rebecca sente che la nave, da questo momento, non è più la stessa: presto qualcuno dovrà scegliere da che parte stare, apertamente.",
            onArriveOnce: [
                { type: "addLog", title: "La verità circola", entry: "Il confronto con Kessler è avvenuto. Atto III concluso." }
            ],
            options: [
                { text: "> Atto IV — La Notte del Ghiaccio", target: "act4_intro" }
            ]
        },

        // =====================================================
        // ATTO IV — LA NOTTE DEL GHIACCIO
        // =====================================================
        // Conflitto aperto. Le scelte qui sono deliberatamente rischiose e
        // hanno conseguenze vere, non semplici "game over": il percorso
        // scelto per organizzare la spedizione di soccorso (tramite Kessler
        // o contro di lui) determina quali finali saranno disponibili in
        // Atto V.

        act4_intro: {
            location: "NAVE INCASTRATA NEL GHIACCIO — GIORNI DOPO",
            text: "La voce ha fatto il giro della nave, come previsto: chi in un sussurro, chi con la rabbia silenziosa di chi si sente ingannato da un anno. Il ghiaccio, dicono i più esperti, comincerà a muoversi entro pochi giorni — dopo, la finestra per cercare chiunque sia ancora là fuori si chiuderà per la stagione.",
            music: "confronto",
            options: [
                { text: "> Affronta quello che resta da fare", target: "act4_ponte" }
            ]
        },

        act4_ponte: {
            location: "PONTE PRINCIPALE — LA NAVE DIVISA",
            text: "Gruppetti di marinai si sciolgono ogni volta che Rebecca si avvicina. La Persefone non è più la nave ordinata di Whitmoor: è una nave in attesa di sapere da che parte stare.",
            options: [
                { text: "> Parla con Finch della situazione", condition: { all: [ { type: "flag", flag: "finch_posizione_fatta", equals: false }, { type: "flag", flag: "finch_pieno_alleato", equals: true } ] }, target: "act4_finch_posizione_alleato" },
                { text: "> Parla con Finch della situazione", condition: { all: [ { type: "flag", flag: "finch_posizione_fatta", equals: false }, { type: "flag", flag: "finch_pieno_alleato", equals: false } ] }, target: "act4_finch_posizione_cauto" },
                { text: "> Scambia ancora parole con Finch", condition: { type: "flag", flag: "finch_posizione_fatta", equals: true }, target: "act4_finch_breve3" },
                { text: "> Parla con Crane, valuta una spedizione", condition: { type: "flag", flag: "crane_organizza_fatto", equals: false }, target: "act4_crane_organizza" },
                { text: "> Torna da Crane", condition: { type: "flag", flag: "crane_organizza_fatto", equals: true }, target: "act4_crane_breve" },
                { text: "> Cerca ancora Peter: forse ora è pronto", condition: { all: [ { type: "flag", flag: "peter_scena2_fatta", equals: true }, { type: "flag", flag: "peter_ha_rivelato", equals: false }, { type: "flag", flag: "peter_rivelazione_tardiva_fatta", equals: false }, { type: "stat", stat: "fiducia_peter", op: ">=", value: 3 } ] }, target: "act4_peter_rivelazione_tardiva" },
                { text: "> Affronta di nuovo il Capitano: chiedi una spedizione di soccorso", condition: { all: [ { type: "flag", flag: "capitano_confessione", equals: true }, { type: "flag", flag: "kessler_route_fatta", equals: false } ] }, target: "act4_kessler_redenzione" },
                { text: "> Affronta di nuovo il Capitano: chiedi una spedizione di soccorso", condition: { all: [ { type: "flag", flag: "capitano_confessione", equals: false }, { type: "flag", flag: "kessler_route_fatta", equals: false } ] }, target: "act4_kessler_tensione" },
                { text: "> La squadra è pronta: dirigetevi sul ghiaccio", condition: { all: [ { type: "flag", flag: "spedizione_pronta", equals: true }, { type: "flag", flag: "ricerca_fatta", equals: false } ] }, target: "act4_ricerca_sul_ghiaccio" },
                { text: "> È tempo di tornare alla Persefone", condition: { type: "flag", flag: "ricerca_fatta", equals: true }, target: "act4_fine" }
            ]
        },

        act4_finch_posizione_alleato: {
            location: "ALLOGGI UFFICIALI",
            text: "\"Ho già parlato con alcuni uomini di cui mi fido\", dice Finch, sottovoce ma senza esitazione. \"Sono con noi, se decidiamo di cercarlo davvero. Ma dobbiamo muoverci prima che il ghiaccio cambi.\" Non chiede a Rebecca cosa intenda fare: lo sta già facendo con lei.",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_posizione_fatta", value: true },
                { type: "addLog", title: "Finch è già in movimento", entry: "Finch ha già iniziato a radunare uomini fidati per una possibile spedizione, senza aspettare il permesso di nessuno." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        act4_finch_posizione_cauto: {
            location: "ALLOGGI UFFICIALI",
            text: "\"Voglio aiutare\", dice Finch, \"ma con giudizio. Se ci muoviamo contro Kessler senza una buona ragione agli occhi degli uomini, rischiamo un ammutinamento vero, non solo una spedizione.\" È dalla sua parte, ma vuole farlo nel modo giusto.",
            onArriveOnce: [
                { type: "setFlag", flag: "finch_posizione_fatta", value: true },
                { type: "addLog", title: "Finch vuole fare le cose per bene", entry: "Finch è con Rebecca, ma preferisce un percorso che non spacchi apertamente l'equipaggio." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        act4_finch_breve3: {
            location: "ALLOGGI UFFICIALI",
            text: "Finch le fa un cenno, teso ma deciso. Non c'è molto altro da dirsi, ora: solo da agire.",
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        act4_crane_organizza: {
            location: "PRUA",
            text: "Crane studia il cielo, poi la carta incisa. \"Conosco quella costa. Se qualcuno deve guidare un gruppo là fuori senza lasciarci le ossa, sono io.\" Per la prima volta da quando è salita a bordo, Rebecca lo vede sorridere, appena. \"Finalmente qualcosa di utile da fare con questo arpione.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "crane_organizza_fatto", value: true },
                { type: "setFlag", flag: "crane_guida_squadra", value: true },
                { type: "addLog", title: "Crane guiderà la squadra", entry: "Crane conosce la costa e si offre di guidare qualunque spedizione venga organizzata." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        act4_crane_breve: {
            location: "PRUA",
            text: "Crane controlla corde e ramponi, pronto a partire non appena ci sarà una squadra da guidare.",
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        act4_peter_rivelazione_tardiva: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Peter la trova lui, stavolta, gli occhi rossi. \"Avevate ragione a insistere\", dice piano. \"Quella notte ho anche sentito il Capitano dire al dottore 'digli che è morto, così nessuno farà domande'. Non pensavo sarebbe servito a qualcosa, dirlo. Ma forse serve, adesso.\"",
            onArriveOnce: [
                { type: "setFlag", flag: "peter_rivelazione_tardiva_fatta", value: true },
                { type: "modifyStat", stat: "fiducia_peter", delta: 1 },
                { type: "addLog", title: "Peter parla, finalmente", entry: "Peter rivela una frase udita quella notte: fu Kessler stesso a ordinare che si dicesse a tutti che Edwin era morto. Non fu un'assunzione: fu una decisione precisa." }
            ],
            options: [
                { text: "> Torna sul ponte", target: "act4_ponte" }
            ]
        },

        // ---------- ROTTA A: KESSLER GIÀ SI È CONFESSATO ----------

        act4_kessler_redenzione: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler l'ascolta senza interromperla. Quando lei finisce di chiedere una spedizione formale, lui annuisce lentamente, come se l'avesse già decisa da solo, di notte, senza il coraggio di proporla per primo. \"Va bene\", dice. \"Ma il come, lo decido io.\"",
            options: [
                {
                    text: "> \"Deve finire sul registro ufficiale, Capitano. Tutto quanto, senza omissioni.\"",
                    target: "act4_verita_registrata"
                },
                {
                    text: "> \"Basta che si organizzi la ricerca. Il registro può aspettare.\"",
                    target: "act4_compromesso_kessler"
                }
            ]
        },

        act4_verita_registrata: {
            location: "CABINA DEL CAPITANO",
            text: "Kessler chiude gli occhi un istante più del necessario, poi prende la penna. \"Che sia scritto, allora. Tutto.\" Mette in gioco la sua carriera, forse la sua libertà, davanti a un armatore che non perdona facilmente. Lo fa comunque.",
            onArriveOnce: [
                { type: "setFlag", flag: "kessler_route_fatta", value: true },
                { type: "setFlag", flag: "verita_registrata", value: true },
                { type: "setFlag", flag: "spedizione_pronta", value: true },
                { type: "addLog", title: "Scritto nero su bianco", entry: "Kessler accetta di mettere la verità intera sul registro ufficiale della nave, rischiando conseguenze reali al ritorno in porto." }
            ],
            options: [
                { text: "> Torna sul ponte: la squadra può prepararsi", target: "act4_ponte" }
            ]
        },

        act4_compromesso_kessler: {
            location: "CABINA DEL CAPITANO",
            text: "\"D'accordo\", dice Kessler, chiudendo il registro senza scrivere nulla di nuovo. \"Cerchiamolo. Ma quello che è scritto qui dentro resta come sta, per ora.\" Rebecca accetta: trovare Edwin conta più di una riga di inchiostro, per il momento.",
            onArriveOnce: [
                { type: "setFlag", flag: "kessler_route_fatta", value: true },
                { type: "setFlag", flag: "compromesso_kessler", value: true },
                { type: "setFlag", flag: "spedizione_pronta", value: true },
                { type: "addLog", title: "Un compromesso silenzioso", entry: "Kessler organizza la spedizione ma il registro ufficiale resta immutato. La verità resterà, per ora, solo tra chi la conosce già." }
            ],
            options: [
                { text: "> Torna sul ponte: la squadra può prepararsi", target: "act4_ponte" }
            ]
        },

        // ---------- ROTTA B: KESSLER NON HA CONFESSATO DEL TUTTO ----------

        act4_kessler_tensione: {
            location: "CABINA DEL CAPITANO",
            text: "\"Una spedizione, per cercare un uomo morto in una tempesta?\" Kessler non alza la voce, il che la rende più fredda di qualunque urlo. \"Non sprecherò giorni e uomini per un fantasma, signorina Vane.\"",
            options: [
                {
                    text: "> \"Allora dirò all'armatore, al ritorno, cosa ho trovato nella vostra stiva.\"",
                    target: "act4_minaccia_capitano"
                },
                {
                    text: "> Rivolgiti direttamente all'equipaggio, senza il suo permesso",
                    target: "act4_spedizione_clandestina"
                }
            ]
        },

        act4_minaccia_capitano: {
            location: "CABINA DEL CAPITANO",
            text: "Per la prima volta, qualcosa si incrina davvero nella maschera di Kessler. Calcola, in silenzio, quanto ha da perdere. \"Due giorni\", dice infine. \"Vi do due giorni di uomini e provviste. Non uno di più. E se non trovate nulla, questa storia finisce qui, per sempre.\" Non è una vittoria piena. È abbastanza.",
            onArriveOnce: [
                { type: "setFlag", flag: "kessler_route_fatta", value: true },
                { type: "setFlag", flag: "capitano_costretto", value: true },
                { type: "setFlag", flag: "spedizione_pronta", value: true },
                { type: "addLog", title: "Costretto, non convinto", entry: "Kessler cede sotto minaccia, non per scelta. Concede la spedizione, ma a denti stretti e con un limite di tempo netto." }
            ],
            options: [
                { text: "> Torna sul ponte: la squadra può prepararsi", target: "act4_ponte" }
            ]
        },

        act4_spedizione_clandestina: {
            location: "ALLOGGI DELL'EQUIPAGGIO — DI NASCOSTO",
            text: "Radunare uomini contro un ordine diretto del Capitano è, con qualunque altro nome la si voglia chiamare, un ammutinamento. Alcuni accettano subito; altri esitano, temendo le conseguenze quando si tornerà in porto. Bisogna convincerli in fretta, prima che qualcuno corra a riferire.",
            music: "ammutinamento",
            options: [
                {
                    text: "> Fai leva sulla testimonianza di Peter e sulle prove trovate in stiva",
                    skillCheck: { stat: "agilita", difficulty: 11, modifier: 0, success: "act4_spedizione_clandestina_bene", failure: "act4_spedizione_clandestina_male" }
                }
            ]
        },

        act4_spedizione_clandestina_bene: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Le parole giuste, dette alle persone giuste: entro un'ora una squadra è pronta, silenziosa e determinata, senza che la voce sia arrivata a Kessler in tempo per fermarla.",
            onArriveOnce: [
                { type: "setFlag", flag: "kessler_route_fatta", value: true },
                { type: "setFlag", flag: "ammutinamento_aperto", value: true },
                { type: "setFlag", flag: "spedizione_pronta", value: true },
                { type: "addLog", title: "Una spedizione clandestina", entry: "La squadra parte senza il permesso del Capitano. È, a tutti gli effetti, un ammutinamento — riuscito, per ora, senza spargimento di sangue." }
            ],
            options: [
                { text: "> Muovetevi in fretta, verso il ghiaccio", target: "act4_ponte" }
            ]
        },

        act4_spedizione_clandestina_male: {
            location: "ALLOGGI DELL'EQUIPAGGIO",
            text: "Le voci si alzano più del previsto. Un ufficiale fedele a Kessler tenta di fermare la manovra a forza; nella confusione uno dei più giovani marinai scivola contro una cassa e si rompe un polso. Kessler arriva troppo tardi per impedire la partenza, ma la squadra si muove ora con un ferito in più e la rabbia del Capitano alle spalle.",
            onArriveOnce: [
                { type: "setFlag", flag: "kessler_route_fatta", value: true },
                { type: "setFlag", flag: "ammutinamento_aperto", value: true },
                { type: "setFlag", flag: "spedizione_pronta", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "playSfx", sfx: "grido" },
                { type: "addLog", title: "Un ammutinamento costato caro", entry: "La spedizione parte comunque, ma nel caos un giovane marinaio si è ferito e Kessler ora sa esattamente chi ha disobbedito ai suoi ordini." }
            ],
            options: [
                { text: "> Muovetevi in fretta, verso il ghiaccio", target: "act4_ponte" }
            ]
        },

        // ---------- LA RICERCA SUL GHIACCIO ----------

        act4_ricerca_sul_ghiaccio: {
            location: "SUL PACK, VERSO NORD",
            text: "La squadra avanza in fila sul ghiaccio, corde tra loro contro le crepe nascoste dalla neve fresca. Il cielo a nord è già scuro di un'altra tempesta in arrivo: hanno poche ore, non giorni.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><path d='M0 120 L300 120' stroke='var(--color-main)'/><circle cx='60' cy='108' r='4' stroke='var(--color-main)' fill='none'/><circle cx='90' cy='108' r='4' stroke='var(--color-main)' fill='none'/><circle cx='120' cy='108' r='4' stroke='var(--color-main)' fill='none'/><path d='M40 60 Q150 20 260 60' stroke='var(--color-main)' fill='none' stroke-dasharray='4 4'/></svg>",
            music: "ghiaccio",
            options: [
                {
                    text: "> Spingiti oltre, verso il punto più lontano segnato sulla mappa",
                    skillCheck: { stat: "forza", difficulty: 12, modifier: 0, success: "act4_ricerca_successo", failure: "act4_ricerca_fallito" }
                }
            ]
        },

        act4_ricerca_successo: {
            location: "OLTRE LA ROCCIA NERA",
            text: "Oltre la roccia, altre tracce: un secondo riparo, più recente del primo, e resti di pesca ancora umidi. Chiunque sia stato qui, ci è stato di recente — pochi giorni, forse meno. La tempesta li costringe a tornare prima di poter cercare oltre, ma ora sanno con certezza una cosa: Edwin, o comunque sia, non è morto quarantadue giorni fa.",
            onArriveOnce: [
                { type: "setFlag", flag: "ricerca_fatta", value: true },
                { type: "setFlag", flag: "tracce_fresche", value: true },
                { type: "addLog", title: "Tracce recenti", entry: "La squadra trova segni di presenza umana recente, ben oltre il primo riparo. La tempesta li costringe a tornare, ma la speranza, ora, ha basi concrete." }
            ],
            options: [
                { text: "> Torna verso la Persefone, prima che la tempesta chiuda la strada", target: "act4_ponte" }
            ]
        },

        act4_ricerca_fallito: {
            location: "SUL PACK",
            text: "La tempesta li anticipa: il vento si alza tanto in fretta che Crane ordina il ritiro prima che possano raggiungere il punto più lontano. Tornano alla nave a mani vuote, il tempo — e la stagione — ormai contro di loro.",
            onArriveOnce: [
                { type: "setFlag", flag: "ricerca_fatta", value: true },
                { type: "modifyStat", stat: "lucidita", delta: -1 },
                { type: "playSfx", sfx: "vento" },
                { type: "addLog", title: "Fermati dalla tempesta", entry: "La tempesta ha vinto questa volta. La squadra torna senza nuove tracce, e la finestra per cercare ancora si è appena ristretta." }
            ],
            options: [
                { text: "> Torna verso la Persefone", target: "act4_ponte" }
            ]
        },

        // ---------- FINE ATTO IV ----------

        act4_fine: {
            location: "PONTE PRINCIPALE — LA NAVE DIVISA",
            text: "Che abbia trovato speranza o solo altra incertezza, la squadra è tornata. La Persefone stessa scricchiola, il ghiaccio intorno comincia lentamente a muoversi: presto sarà libera, per tornare a casa o per tentare un'ultima volta.",
            onArriveOnce: [
                { type: "addLog", title: "Il ghiaccio si muove", entry: "La nave sta per liberarsi dalla banchisa. Atto IV concluso." }
            ],
            options: [
                { text: "> Atto V — L'Alba", target: "act5_intro" }
            ]
        },

        // =====================================================
        // ATTO V — L'ALBA
        // =====================================================
        // Cinque finali, determinati da ciò che il giocatore ha accumulato
        // negli atti precedenti — non dalle ultime scelte soltanto.
        // Priorità di valutazione (la prima condizione vera vince):
        //   1. lucidità <= 2                          -> Naufragio dei Nervi
        //   2. ammutinamento_aperto (Atto IV)          -> Ammutinamento
        //   3. tracce_fresche == false (Atto IV)       -> Sola
        //   4. tracce_fresche + verita_registrata      -> Redenzione
        //   5. tracce_fresche + non verita_registrata  -> Il Prezzo del Silenzio

        act5_intro: {
            location: "IL GHIACCIO SI APRE — ALBA",
            text: "Durante la notte il pack si è spaccato con un boato lungo come un tuono continuo. All'alba la Persefone galleggia di nuovo libera, in un canale d'acqua nera tra i ghiacci che si allontanano. È il momento di scoprire cosa resta, di tutto questo, quando la nave punterà finalmente a sud.",
            art: "<svg viewBox='0 0 300 140' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='300' height='75' fill='none'/><circle cx='150' cy='60' r='28' stroke='var(--color-main)' fill='none'/><line x1='0' y1='95' x2='300' y2='95' stroke='var(--color-main)'/><path d='M20 95 L45 75 L90 75 L100 95 Z' stroke='var(--color-main)' stroke-width='1.5' fill='none'/></svg>",
            music: "alba",
            options: [
                { text: "> Guarda cosa porta con sé quest'alba", target: "act5_bivio" }
            ]
        },

        act5_bivio: {
            location: "PONTE PRINCIPALE — ROTTA VERSO SUD",
            text: "Rebecca stringe la balaustra bagnata di brina e guarda l'acqua libera davanti alla prua. Qualunque cosa sia successa su questa nave, tra questi ghiacci, ora bisogna portarla a casa — dentro di sé, prima ancora che nel racconto.",
            options: [
                { text: "> Il ghiaccio nella mente non si è mai davvero sciolto", condition: { type: "stat", stat: "lucidita", op: "<=", value: 2 }, target: "act5_naufragio_nervi" },
                { text: "> La nave che torna a casa non è più la stessa", condition: { all: [ { type: "stat", stat: "lucidita", op: ">", value: 2 }, { type: "flag", flag: "ammutinamento_aperto", equals: true } ] }, target: "act5_ammutinamento" },
                { text: "> Il mare non restituisce sempre quello che prende", condition: { all: [ { type: "stat", stat: "lucidita", op: ">", value: 2 }, { type: "flag", flag: "ammutinamento_aperto", equals: false }, { type: "flag", flag: "tracce_fresche", equals: false } ] }, target: "act5_sola" },
                { text: "> Un fuoco acceso su una roccia lontana", condition: { all: [ { type: "stat", stat: "lucidita", op: ">", value: 2 }, { type: "flag", flag: "ammutinamento_aperto", equals: false }, { type: "flag", flag: "tracce_fresche", equals: true }, { type: "flag", flag: "verita_registrata", equals: true } ] }, target: "act5_redenzione" },
                { text: "> Un fuoco acceso su una roccia lontana", condition: { all: [ { type: "stat", stat: "lucidita", op: ">", value: 2 }, { type: "flag", flag: "ammutinamento_aperto", equals: false }, { type: "flag", flag: "tracce_fresche", equals: true }, { type: "flag", flag: "verita_registrata", equals: false } ] }, target: "act5_prezzo_silenzio" }
            ]
        },

        // ---------- FINALE 1: REDENZIONE ----------

        act5_redenzione: {
            location: "FINALE — REDENZIONE",
            text: "Lo trovano al terzo giorno di navigazione lungo la costa, magrissimo ma vivo, che accende un fuoco di segnalazione con mani che tremano più per l'emozione che per il freddo. Edwin non dice quasi nulla, all'inizio — solo stringe sua sorella come se non credesse ancora che sia reale. Al ritorno a Whitmoor, il registro di Kessler racconta tutto: la quarantena, la decisione, l'abbandono. Il Capitano affronterà l'armatore, forse un processo. Ma sul ponte, quel giorno, Finch, Crane, Peter e persino Old Ove si stringono attorno a Edwin e Rebecca come un solo equipaggio — non più diviso da un segreto che finalmente ha smesso di pesare su tutti loro in silenzio.",
            onArriveOnce: [
                { type: "addLog", title: "Redenzione", entry: "Edwin è vivo. La verità è scritta nero su bianco. La Persefone torna a casa come un equipaggio intero, non più spaccato da un segreto." }
            ],
            options: [
                { text: "> Torna al menu principale", target: "__mainMenu__" }
            ]
        },

        // ---------- FINALE 2: IL PREZZO DEL SILENZIO ----------

        act5_prezzo_silenzio: {
            location: "FINALE — IL PREZZO DEL SILENZIO",
            text: "Lo trovano vivo, più magro e più silenzioso dell'uomo che era, ma vivo. La gioia di riportarlo a bordo è vera, enorme — eppure il registro ufficiale della Persefone continuerà a raccontare di una tempesta, non di una quarantena e di un abbandono. Kessler manterrà il comando, l'armatore non saprà mai. Rebecca ha suo fratello indietro; non ha la giustizia che era venuta a cercare. Sul molo di Whitmoor, mesi dopo, si chiederà ancora se sia stato un prezzo giusto da pagare — e non troverà mai una risposta che la convinca del tutto.",
            onArriveOnce: [
                { type: "addLog", title: "Il Prezzo del Silenzio", entry: "Edwin è vivo, ma la verità resta sepolta. Rebecca ha ottenuto ciò per cui era partita, al prezzo di lasciare tutto il resto irrisolto." }
            ],
            options: [
                { text: "> Torna al menu principale", target: "__mainMenu__" }
            ]
        },

        // ---------- FINALE 3: SOLA ----------

        act5_sola: {
            location: "FINALE — SOLA",
            text: "Non lo trovano. La costa oltre la roccia nera resta silenziosa, il canale d'acqua libera si richiude un poco più ogni giorno, e alla fine anche Crane, con gli occhi bassi, ammette che non c'è più tempo. La Persefone torna a Whitmoor con una sola mezza verità a bordo: che Edwin è sopravvissuto più a lungo di quanto chiunque credesse, da qualche parte, per un tempo che nessuno saprà mai con certezza. Rebecca scende sul molo da sola, cambiata, con un ciondolo d'ottone in tasca e un vuoto che nessuna verità, a questo punto, potrà davvero colmare. Finch le scrive, ogni tanto. Peter, dicono, è diventato un buon marinaio.",
            onArriveOnce: [
                { type: "addLog", title: "Sola", entry: "Edwin non viene ritrovato. Rebecca torna a casa da sola, con una verità parziale e un dolore che il tempo non ha ancora imparato a portare." }
            ],
            options: [
                { text: "> Torna al menu principale", target: "__mainMenu__" }
            ]
        },

        // ---------- FINALE 4: NAUFRAGIO DEI NERVI ----------

        act5_naufragio_nervi: {
            location: "FINALE — NAUFRAGIO DEI NERVI",
            text: "Rebecca non è più sicura di cosa sia successo davvero, tra quei ghiacci. Ricorda un fuoco sulla roccia, o crede di ricordarlo. Ricorda la voce di Kessler che confessa, o forse era solo il vento tra il sartiame a suonare come una voce umana. Sul registro ufficiale della Persefone, alla voce 'passeggera aggiunta, Vane R.', qualcuno ha scritto una sola parola: 'instabile'. Nessuno, a Whitmoor, saprà mai dire con certezza cosa sia realmente accaduto in quelle settimane — nemmeno lei.",
            onArriveOnce: [
                { type: "addLog", title: "Naufragio dei Nervi", entry: "Tra ghiaccio, isolamento e rivelazioni troppo pesanti da reggere, Rebecca non è più certa di cosa fosse reale e cosa no. Il confine tra verità e allucinazione resta, per sempre, sfumato." }
            ],
            options: [
                { text: "> Torna al menu principale", target: "__mainMenu__" }
            ]
        },

        // ---------- FINALE 5: AMMUTINAMENTO ----------

        act5_ammutinamento: {
            location: "FINALE — AMMUTINAMENTO",
            text: "La Persefone che attracca a Whitmoor non è la stessa nave che era salpata. La notizia dell'ammutinamento la precede, sussurrata sui moli prima ancora che getti l'ancora: uomini che si sono rivoltati contro il proprio Capitano, in mezzo al ghiaccio, per una donna e una storia di famiglia. Alcuni marinai non lavoreranno mai più su una nave dell'armatore. Kessler, umiliato ma tecnicamente ancora al comando, non perdonerà mai chi si è schierato contro di lui — Finch tra i primi. Di Edwin, in tutto questo, si è quasi smesso di parlare: la sua sorte resta una nota a margine di una storia più grande, e più amara, di lui.",
            onArriveOnce: [
                { type: "addLog", title: "Ammutinamento", entry: "L'aperto scontro con Kessler ha spaccato l'equipaggio in modo irreparabile. Il prezzo pagato dalla nave e dai suoi uomini finisce per pesare più della stessa ricerca di Edwin." }
            ],
            options: [
                { text: "> Torna al menu principale", target: "__mainMenu__" }
            ]
        }

    }
};
