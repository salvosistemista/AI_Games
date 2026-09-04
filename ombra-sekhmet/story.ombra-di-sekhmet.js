/* ============================================================
   L'OMBRA DI SEKHMET
   ------------------------------------------------------------
   Storia originale (misteri d'ambientazione museale, anni '30),
   scritta per il "Motore Avventure". Nessun testo, personaggio
   o enigma riprodotto da opere terze: trama e nomi sono inventati.
   3 atti in un solo file (act1_/act2_/act3_), sessione continua.
   ============================================================ */

const STORY = {
    meta: { id: "ombra-di-sekhmet", title: "L'OMBRA DI SEKHMET", version: "1.0" },
    startNode: "act1_intro",

    initialState: {
        flags: {
            metAshworth: false, metMarchetti: false, metKane: false, metOkafor: false, metLowry: false,
            sawDagger: false, bodyFound: false,
            officeUnlocked: false, okaforHintGiven: false, ufficioVisitato: false,
            bibliotecaVisitata: false, laboratorioVisitato: false,
            magazzinoVisitato: false, forgeriaTrovata: false,
            scenaAnalizzata: false,
            discoveredMotive: false, cartoucheCombined: false,
            askedAshworthDeep: false, askedMarchettiDeep: false, askedKaneDeep: false, askedLowryDeep: false
        },
        stats: { percezione: 2, fascino: 2, cultura: 2 },
        inventory: []
    },

    music: {
        tema_gala: { wave: "triangle", volume: 0.02, notes: [
            { freq: 294, dur: 0.5 }, { freq: 349, dur: 0.5 }, { freq: 392, dur: 0.5 }, { freq: 349, dur: 0.5 }
        ]},
        tema_tensione: { wave: "sawtooth", volume: 0.015, notes: [
            { freq: 110, dur: 0.8 }, { freq: 116, dur: 0.8 }
        ]},
        tema_indagine: { wave: "sine", volume: 0.02, notes: [
            { freq: 220, dur: 0.6 }, { freq: 247, dur: 0.6 }, { freq: 196, dur: 0.6 }
        ]},
        tema_confronto: { wave: "square", volume: 0.012, notes: [
            { freq: 165, dur: 0.4 }, { freq: 175, dur: 0.4 }, { freq: 165, dur: 0.4 }, { freq: 147, dur: 0.4 }
        ]},
        tema_notturna: { wave: "sawtooth", volume: 0.015, notes: [
            { freq: 98, dur: 0.5 }, { freq: 104, dur: 0.9 }
        ]},
        tema_finale_vittoria: { wave: "triangle", volume: 0.025, notes: [
            { freq: 392, dur: 0.4 }, { freq: 440, dur: 0.4 }, { freq: 494, dur: 0.6 }
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

        /* ================= ATTO I — LA SERATA DI GALA ================= */

        act1_intro: {
            location: "INGRESSO DEL MUSEO CAVENDISH",
            music: "tema_gala",
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--color-main)" stroke-width="2">
                <rect x="40" y="60" width="220" height="70"/>
                <polygon points="40,60 150,15 260,60"/>
                <rect x="130" y="90" width="40" height="40"/>
                <line x1="70" y1="60" x2="70" y2="130"/>
                <line x1="230" y1="60" x2="230" y2="130"/>
            </svg>`,
            text: `Sei Cora Ashby, cronista del Chicago Ledger, invitata stasera al Museo Cavendish per l'inaugurazione della nuova ala egizia. Le vetrate illuminate proiettano ombre lunghe sui gradini di pietra. Dentro, l'orchestra suona piano e le voci degli ospiti si mescolano al tintinnio dei calici.\n\nIl curatore Adrian Voss ha promesso, nel biglietto d'invito, "una rivelazione che cambierà il modo in cui guardiamo questa collezione". Non hai idea di quanto, tra poche ore, quella frase si rivelerà vera in un senso che nessuno si aspettava.`,
            options: [
                { text: "> Entra nell'atrio del museo", target: "act1_atrio" }
            ]
        },

        act1_atrio: {
            location: "ATRIO DEL MUSEO",
            text: `L'atrio brulica di ospiti in abito da sera. Al centro, sotto un lucernario, una nuova vetrina attende ancora il drappo che la coprirà fino al discorso di Voss. Riconosci alcuni volti dagli articoli che hai scritto in passato: il professor Ashworth, la Contessa Marchetti, e un uomo con un sorriso troppo curato che non ricordi di aver invitato tu stessa alla lista degli ospiti.`,
            options: [
                { text: "> Parla con il professor Ashworth", target: "act1_ashworth", condition: { type: "flag", flag: "metAshworth", equals: false } },
                { text: "> Saluta di nuovo il professor Ashworth", target: "act1_ashworth_again", condition: { type: "flag", flag: "metAshworth", equals: true } },
                { text: "> Parla con la Contessa Marchetti", target: "act1_marchetti", condition: { type: "flag", flag: "metMarchetti", equals: false } },
                { text: "> Saluta di nuovo la Contessa Marchetti", target: "act1_marchetti_again", condition: { type: "flag", flag: "metMarchetti", equals: true } },
                { text: "> Avvicinati all'uomo che non conosci", target: "act1_kane", condition: { type: "flag", flag: "metKane", equals: false } },
                { text: "> Scambia ancora due parole con Silas Kane", target: "act1_kane_again", condition: { type: "flag", flag: "metKane", equals: true } },
                { text: "> Osserva la nuova sala egizia", target: "act1_sala_egizia", condition: { type: "flag", flag: "sawDagger", equals: false } },
                { text: "> Torna a osservare la sala egizia", target: "act1_sala_egizia_again", condition: { type: "flag", flag: "sawDagger", equals: true } },
                { text: "> Raggiungi la sala conferenze per il discorso di Voss", target: "act1_discorso" }
            ]
        },

        act1_ashworth: {
            location: "ATRIO — CON IL PROF. ASHWORTH",
            onArriveOnce: [
                { type: "setFlag", flag: "metAshworth", value: true },
                { type: "addLog", title: "Professor Reginald Ashworth", entry: "Egittologo, un tempo ridicolizzato per una teoria sulla 'vera' maledizione di Sekhmet. Parla di Voss con un misto di rispetto e amarezza." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `Il professor Ashworth stringe un bicchiere di sherry come fosse un'ancora. "Ashby, del Ledger. Bene, almeno qualcuno che scrive di fatti, per una volta." Sorride appena. "Voss ha buon fiuto per gli oggetti e pessimo per le persone che gli stanno intorno. Ma questo lei non lo scriva, mi raccomando."\n\nQuando gli chiedi della sua vecchia teoria sulla maledizione, il sorriso si spegne. "Storia vecchia. Chieda a chi ancora ci crede."`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },
        act1_ashworth_again: {
            location: "ATRIO — CON IL PROF. ASHWORTH",
            text: `Ashworth alza il bicchiere in un brindisi silenzioso verso di te, ma è distratto, gli occhi fissi sulla vetrina ancora coperta. Non sembra avere altro da aggiungere, per ora.`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },

        act1_marchetti: {
            location: "ATRIO — CON LA CONTESSA MARCHETTI",
            onArriveOnce: [
                { type: "setFlag", flag: "metMarchetti", value: true },
                { type: "addLog", title: "Contessa Ilsa Marchetti", entry: "Collezionista e mecenate del museo. Elegante, misurata, ma qualcosa nel suo sguardo tradisce inquietudine quando si parla della nuova ala." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `La Contessa Marchetti la saluta con un cenno del capo perfetto, da manuale. "Signorina Ashby. Spero scriverà bene di questa serata." Le sue dita giocano nervosamente con una collana di scarabei d'oro. "Ho donato una parte non piccola della mia collezione a questo museo, sa? Voglio solo che ne valga la pena."`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },
        act1_marchetti_again: {
            location: "ATRIO — CON LA CONTESSA MARCHETTI",
            text: `La Contessa le sorride con cortesia formale, ma continua a guardare oltre la sua spalla, verso l'ingresso della sala egizia, come se aspettasse qualcuno — o temesse qualcosa.`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },

        act1_kane: {
            location: "ATRIO — CON UNO SCONOSCIUTO",
            onArriveOnce: [
                { type: "setFlag", flag: "metKane", value: true },
                { type: "addLog", title: "Silas Kane", entry: "Si presenta come 'mercante d'antiquariato'. Non risulta tra gli invitati ufficiali del Ledger, eppure si muove come se il museo fosse casa sua." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `"Silas Kane," dice l'uomo, tendendole la mano con un sorriso troppo largo. "Mercante d'arte, per gli amici. Compro, vendo, autentico — quando serve." Quando gli chiedi chi lo abbia invitato, ride piano. "Diciamo che conosco qualcuno nello staff. Un museo come questo ha sempre bisogno di... consulenti discreti."`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },
        act1_kane_again: {
            location: "ATRIO — CON SILAS KANE",
            text: `Kane controlla l'orologio da taschino per la terza volta in pochi minuti. "Il discorso del curatore tarda," osserva, con un tono che sembra più sollievo che impazienza.`,
            options: [ { text: "> Torna tra gli ospiti", target: "act1_atrio" } ]
        },

        act1_sala_egizia: {
            location: "SALA EGIZIA — ANTEPRIMA",
            onArriveOnce: [
                { type: "setFlag", flag: "sawDagger", value: true },
                { type: "addLog", title: "Il Pugnale Rituale di Anubi", entry: "In una teca separata, un pugnale cerimoniale in oro e ossidiana, proveniente dallo stesso scavo del sarcofago di Nefret-Ka. La targhetta lo definisce 'strumento sacerdotale, non un'arma'." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            art: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--color-main)" stroke-width="2">
                <rect x="20" y="20" width="120" height="100"/>
                <polygon points="150,40 280,40 265,110 165,110"/>
                <line x1="150" y1="45" x2="280" y2="45"/>
                <line x1="200" y1="40" x2="200" y2="110"/>
            </svg>`,
            text: `La sala non è ancora aperta al pubblico, ma nessuno ferma una cronista con un bicchiere in mano e un'aria abbastanza sicura. Al centro campeggia il sarcofago dorato della sacerdotessa Nefret-Ka, restaurato per l'occasione. In una teca a parte, illuminato da un faretto, un pugnale cerimoniale in oro e ossidiana attira il tuo sguardo più del sarcofago stesso: la lama è troppo affilata, per essere solo un oggetto da museo.`,
            options: [ { text: "> Torna nell'atrio", target: "act1_atrio" } ]
        },
        act1_sala_egizia_again: {
            location: "SALA EGIZIA — ANTEPRIMA",
            text: `Il sarcofago di Nefret-Ka riposa in silenzio sotto le luci, il pugnale accanto ad esso. Niente di nuovo, per ora — ma non riesci a scrollarti di dosso l'impressione che qualcuno, poco prima di te, sia stato qui a lungo.`,
            options: [ { text: "> Torna nell'atrio", target: "act1_atrio" } ]
        },

        act1_discorso: {
            location: "SALA CONFERENZE",
            onArriveOnce: [
                { type: "addLog", title: "Il Discorso di Voss", entry: "Prima di scoprire la vetrina, Voss annuncia che 'qualcosa di disonesto si è insinuato in questa collezione' e promette di nominare il responsabile entro fine serata." }
            ],
            text: `Il curatore Adrian Voss sale sul podio tra un applauso educato. È pallido, le mani gli tremano appena mentre sistema gli appunti. "Questa sera non parlerò solo di restauro," dice, la voce più tesa del previsto. "Qualcosa di disonesto si è insinuato in questa collezione, e prima che la serata finisca, ne farò il nome." Un silenzio gelido cala sulla sala. Vedi Ashworth irrigidirsi, la Contessa sbiancare, Kane scomparire discretamente verso il fondo della stanza.`,
            options: [ { text: "> Il discorso finisce tra mormorii; la festa riprende, incerta", target: "act1_blackout" } ]
        },

        act1_blackout: {
            location: "SALA CONFERENZE",
            music: null,
            onArriveOnce: [
                { type: "addLog", title: "Il Blackout", entry: "Le luci saltano per pochi secondi. Al ritorno della corrente, un grido proviene dalla sala egizia." },
                { type: "playSfx", sfx: "impatto" }
            ],
            text: `Le luci saltano, tutte insieme, per non più di dieci secondi. Nel buio senti passi affrettati, una porta che sbatte, un tonfo sordo. Quando la corrente torna, un grido squarcia il brusio degli ospiti — viene dalla sala egizia.`,
            options: [ { text: "> Corri verso la sala egizia", target: "act1_body_found" } ]
        },

        act1_body_found: {
            location: "SALA EGIZIA — LA SCOPERTA",
            music: "tema_tensione",
            onArriveOnce: [
                { type: "setFlag", flag: "bodyFound", value: true },
                { type: "addLog", title: "Il Corpo di Adrian Voss", entry: "Il curatore giace ai piedi della teca del pugnale, che ora è vuota. Nessuno dei presenti dice di aver visto nulla." },
                { type: "addItem", id: "frammento_cartiglio_a", name: "Frammento di Cartiglio (A)", desc: "Un pezzo di metallo inciso con geroglifici, spezzato in modo netto.", examine: "Un frammento triangolare, forse metà di un sigillo o di un ciondolo. I bordi della rottura sono recenti — troppo netti per essere antichi." },
                { type: "playSfx", sfx: "impatto" }
            ],
            text: `Adrian Voss giace immobile ai piedi della teca ormai vuota — il pugnale rituale è scomparso. Sul pavimento, vicino alla sua mano, luccica un piccolo frammento di metallo inciso. Gli ospiti si accalcano sulla porta, ma nessuno osa entrare. Qualcuno chiama la polizia; tu ti chini, per prima, a raccogliere quel frammento prima che qualcun altro lo calpesti.`,
            options: [ { text: "> Fine dell'Atto I — le indagini cominciano", target: "act2_intro" } ]
        },

        /* ================= ATTO II — LE INDAGINI ================= */

        act2_intro: {
            location: "MUSEO CAVENDISH — NOTTE INOLTRATA",
            music: "tema_indagine",
            text: `La polizia ha isolato la sala egizia ma, in attesa degli ispettori di grado superiore, l'agente di turno — un vecchio conoscente del Ledger — ti lascia muovere per il museo "purché non tocchi niente di importante". Hai poco tempo prima che ti caccino fuori insieme agli altri ospiti. Devi scoprire chi ha ucciso Adrian Voss, e perché, prima che qualcuno ripulisca ogni traccia.`,
            options: [ { text: "> Comincia a indagare", target: "act2_atrio" } ]
        },

        act2_atrio: {
            location: "ATRIO — INDAGINI",
            text: `L'atrio, così sfarzoso poche ore fa, ora sembra spoglio e freddo. Gli ospiti rimasti si stringono in piccoli gruppi silenziosi. Da qui puoi raggiungere le altre sale del museo, oppure tornare a parlare con chi era presente stasera.`,
            options: [
                { text: "> Esamina di nuovo la scena del delitto", target: "act2_scena", condition: { type: "flag", flag: "scenaAnalizzata", equals: false } },
                { text: "> Torna sulla scena del delitto", target: "act2_scena_again", condition: { type: "flag", flag: "scenaAnalizzata", equals: true } },

                { text: "> Cerca Desmond Okafor, il guardiano notturno", target: "act2_okafor", condition: { type: "flag", flag: "metOkafor", equals: false } },
                { text: "> Parla ancora con Okafor", target: "act2_okafor_again", condition: { type: "flag", flag: "metOkafor", equals: true } },

                { text: "> Prova la porta dell'ufficio di Voss", target: "act2_ufficio_locked", condition: { all: [ { type: "flag", flag: "officeUnlocked", equals: false }, { type: "flag", flag: "okaforHintGiven", equals: false } ] } },
                { text: "> Cerca la chiave di scorta nel vaso vicino alla porta", target: "act2_ufficio_cerca_chiave", condition: { all: [ { type: "flag", flag: "officeUnlocked", equals: false }, { type: "flag", flag: "okaforHintGiven", equals: true } ] } },
                { text: "> Entra nell'ufficio di Voss", target: "act2_ufficio_voss", condition: { all: [ { type: "flag", flag: "officeUnlocked", equals: true }, { type: "flag", flag: "ufficioVisitato", equals: false } ] } },
                { text: "> Torna nell'ufficio di Voss", target: "act2_ufficio_voss_again", condition: { type: "flag", flag: "ufficioVisitato", equals: true } },

                { text: "> Vai in biblioteca", target: "act2_biblioteca", condition: { type: "flag", flag: "bibliotecaVisitata", equals: false } },
                { text: "> Torna in biblioteca", target: "act2_biblioteca_again", condition: { type: "flag", flag: "bibliotecaVisitata", equals: true } },

                { text: "> Vai al laboratorio di restauro", target: "act2_laboratorio", condition: { type: "flag", flag: "laboratorioVisitato", equals: false } },
                { text: "> Torna al laboratorio di restauro", target: "act2_laboratorio_again", condition: { type: "flag", flag: "laboratorioVisitato", equals: true } },

                { text: "> Scendi nel magazzino dei reperti", target: "act2_magazzino", condition: { type: "flag", flag: "magazzinoVisitato", equals: false } },
                { text: "> Torna nel magazzino dei reperti", target: "act2_magazzino_again", condition: { type: "flag", flag: "magazzinoVisitato", equals: true } },

                { text: "> Parla con Vivian Lowry, l'assistente di Voss", target: "act2_lowry", condition: { type: "flag", flag: "metLowry", equals: false } },
                { text: "> Parla ancora con Vivian Lowry", target: "act2_lowry_again", condition: { all: [ { type: "flag", flag: "metLowry", equals: true }, { any: [ { type: "flag", flag: "cartoucheCombined", equals: false }, { type: "flag", flag: "askedLowryDeep", equals: true } ] } ] } },
                { text: "> Mostra a Lowry il cartiglio ricomposto", target: "act2_lowry_deep", condition: { all: [ { type: "flag", flag: "cartoucheCombined", equals: true }, { type: "flag", flag: "askedLowryDeep", equals: false } ] } },

                { text: "> Chiedi ad Ashworth del suo passato", target: "act2_ashworth2", condition: { all: [ { type: "flag", flag: "bibliotecaVisitata", equals: true }, { type: "flag", flag: "askedAshworthDeep", equals: false } ] } },
                { text: "> Parla ancora con Ashworth", target: "act2_ashworth2_again", condition: { type: "flag", flag: "askedAshworthDeep", equals: true } },

                { text: "> Affronta la Contessa sui suoi acquisti", target: "act2_marchetti2", condition: { all: [ { type: "flag", flag: "discoveredMotive", equals: true }, { type: "flag", flag: "askedMarchettiDeep", equals: false } ] } },
                { text: "> Parla ancora con la Contessa", target: "act2_marchetti2_again", condition: { type: "flag", flag: "askedMarchettiDeep", equals: true } },

                { text: "> Affronta Kane con la statuetta falsa", target: "act2_kane2", condition: { all: [ { type: "flag", flag: "forgeriaTrovata", equals: true }, { type: "flag", flag: "askedKaneDeep", equals: false } ] } },
                { text: "> Parla ancora con Kane", target: "act2_kane2_again", condition: { type: "flag", flag: "askedKaneDeep", equals: true } },

                { text: "> Sei pronta: vai alla resa dei conti", target: "act3_intro" }
            ]
        },

        act2_scena: {
            location: "SALA EGIZIA — SCENA DEL DELITTO",
            onArriveOnce: [
                { type: "setFlag", flag: "scenaAnalizzata", value: true },
                { type: "modifyStat", stat: "percezione", delta: 1 },
                { type: "addLog", title: "Analisi della Scena", entry: "La teca del pugnale è vuota e forzata dall'interno, non scassinata dall'esterno: chi ha preso l'arma aveva già accesso alla sala, o una chiave." }
            ],
            text: `Con più calma, noti un dettaglio che nella concitazione ti era sfuggito: la serratura della teca del pugnale non è forzata dall'esterno, ma aperta con una chiave — o da qualcuno che sapeva già come farlo. Chiunque abbia colpito Voss conosceva questa sala fin troppo bene.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_scena_again: {
            location: "SALA EGIZIA — SCENA DEL DELITTO",
            text: `Il nastro della polizia delimita ancora lo spazio intorno al sarcofago di Nefret-Ka. Non c'è altro da notare, per ora: hai bisogno di prove altrove.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_okafor: {
            location: "CORRIDOIO DI SERVIZIO — CON OKAFOR",
            onArriveOnce: [
                { type: "setFlag", flag: "metOkafor", value: true },
                { type: "addLog", title: "Desmond Okafor", entry: "Guardiano notturno del museo da otto anni. Conosce ogni porta e ogni chiave dell'edificio, ed è visibilmente terrorizzato di essere incolpato per qualcosa che non ha fatto." }
            ],
            text: `Desmond Okafor stringe il mazzo di chiavi come se qualcuno stesse per portarglielo via. "Non ho visto niente, signorina. Ero al piano di sotto quando sono saltate le luci." Solo dopo qualche istante di silenzio aggiunge, più piano: "Ma se le serve entrare nell'ufficio del curatore... quella è un'altra questione."`,
            options: [
                { text: "> Chiedigli di aprirti l'ufficio di Voss", skillCheck: { stat: "fascino", difficulty: 12, modifier: 0, success: "act2_okafor_apre", failure: "act2_okafor_rifiuta" } },
                { text: "> Torna nell'atrio", target: "act2_atrio" }
            ]
        },
        act2_okafor_again: {
            location: "CORRIDOIO DI SERVIZIO — CON OKAFOR",
            text: `Okafor annuisce appena quando ti vede, ma resta vicino alla porta di servizio, come se il suo posto in questo momento fosse proprio lì, a fare la guardia.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_okafor_apre: {
            location: "CORRIDOIO DI SERVIZIO",
            onArriveOnce: [
                { type: "setFlag", flag: "officeUnlocked", value: true },
                { type: "addLog", title: "Accesso all'Ufficio di Voss", entry: "Okafor apre la porta dell'ufficio del curatore, guardandosi le spalle. 'Cinque minuti. Non un secondo di più.'" },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `Okafor esita, poi sceglie di fidarsi. "Cinque minuti," dice, girando la chiave nella toppa. "Non un secondo di più, e se qualcuno chiede, questa porta non l'ho mai aperta io."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_okafor_rifiuta: {
            location: "CORRIDOIO DI SERVIZIO",
            onArriveOnce: [
                { type: "setFlag", flag: "okaforHintGiven", value: true },
                { type: "addLog", title: "La Prudenza di Okafor", entry: "Okafor non se la sente di aprire l'ufficio, ma lascia scappare che una chiave di scorta è nascosta 'nel solito vaso, vicino alla porta, da quando il curatore perdeva sempre la sua'." }
            ],
            text: `Okafor scuote la testa. "Non posso, mi dispiace — se qualcuno mi vede, perdo il posto." Poi, quasi controvoglia: "Ma il vecchio Voss perdeva sempre le chiavi. Ne teneva una di scorta nel vaso di fiori accanto alla sua porta. Non l'ha saputo da me."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_ufficio_locked: {
            location: "CORRIDOIO — UFFICIO DEL CURATORE",
            text: `La porta dell'ufficio di Voss è chiusa a chiave. Attraverso il vetro smerigliato intravedi una scrivania in disordine. Ti servirà un modo per entrare — o qualcuno disposto ad aprirtela.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_ufficio_cerca_chiave: {
            location: "CORRIDOIO — UFFICIO DEL CURATORE",
            text: `Ti inginocchi accanto al grande vaso di fiori secchi vicino alla porta e affondi le dita nella terra, cercando qualcosa che non dovrebbe esserci.`,
            options: [
                { text: "> Fruga a fondo nel vaso", skillCheck: { stat: "percezione", difficulty: 11, modifier: 0, success: "act2_ufficio_chiave_trovata", failure: "act2_ufficio_chiave_fallita" } }
            ]
        },
        act2_ufficio_chiave_trovata: {
            location: "CORRIDOIO — UFFICIO DEL CURATORE",
            onArriveOnce: [
                { type: "setFlag", flag: "officeUnlocked", value: true },
                { type: "addLog", title: "La Chiave di Scorta", entry: "Nascosta nella terra del vaso, una chiave di ottone apre la porta dell'ufficio di Voss." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `Le tue dita incontrano il metallo freddo di una chiave. Okafor aveva ragione: la porta si apre con un semplice scatto.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_ufficio_chiave_fallita: {
            location: "CORRIDOIO — UFFICIO DEL CURATORE",
            text: `Solo terra secca e radici. Se la chiave è davvero lì dentro, ti sta sfuggendo.`,
            options: [
                { text: "> Riprova a frugare nel vaso", skillCheck: { stat: "percezione", difficulty: 11, modifier: 0, success: "act2_ufficio_chiave_trovata", failure: "act2_ufficio_chiave_fallita" } },
                { text: "> Torna nell'atrio", target: "act2_atrio" }
            ]
        },

        act2_ufficio_voss: {
            location: "UFFICIO DEL CURATORE",
            onArriveOnce: [
                { type: "setFlag", flag: "ufficioVisitato", value: true },
                { type: "addLog", title: "L'Ufficio di Adrian Voss", entry: "Un ufficio in perfetto ordine, tranne il primo cassetto della scrivania, forzato e svuotato in fretta." },
                { type: "addItem", id: "diario_voss", name: "Diario di Adrian Voss", desc: "Un taccuino di pelle nera, pieno di appunti fitti e nervosi.", examine: "Le ultime pagine parlano di 'pezzi sostituiti', di confronti tra registri d'inventario e certificati d'autenticità che non tornano. L'ultima riga, scritta in fretta: 'Stasera lo dirò a tutti. Non posso più fingere di non sapere chi.'", examineEffects: [ { type: "setFlag", flag: "discoveredMotive", value: true }, { type: "addLog", title: "Il Movente", entry: "Voss aveva scoperto che pezzi autentici della collezione venivano sostituiti con copie. Stava per rivelare pubblicamente chi c'era dietro." }, { type: "playSfx", sfx: "rivelazione" } ] },
                { type: "addItem", id: "frammento_cartiglio_b", name: "Frammento di Cartiglio (B)", desc: "Una seconda metà di sigillo inciso, gemella di quella trovata sulla scena del delitto.", examine: "I bordi spezzati combaciano perfettamente, a colpo d'occhio, con l'altro frammento che hai già in tasca." },
                { type: "playSfx", sfx: "oggetto" }
            ],
            text: `L'ufficio è ordinato, quasi impersonale — tranne il primo cassetto della scrivania, forzato e svuotato in fretta. Sul piano di lavoro trovi un diario di pelle nera e, in un angolo nascosto del cassetto forzato, un secondo frammento di metallo inciso, identico per fattura a quello raccolto sulla scena del delitto.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_ufficio_voss_again: {
            location: "UFFICIO DEL CURATORE",
            text: `L'ufficio è ormai vuoto di segreti facili da trovare. Il resto, forse, lo scoprirai parlando con le persone giuste.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_biblioteca: {
            location: "BIBLIOTECA DEL MUSEO",
            onArriveOnce: [
                { type: "setFlag", flag: "bibliotecaVisitata", value: true },
                { type: "modifyStat", stat: "cultura", delta: 1 },
                { type: "addLog", title: "Vecchi Scandali", entry: "Un ritaglio di dieci anni fa: il professor Ashworth fu pubblicamente screditato per una teoria sulla 'maledizione' di Sekhmet legata a un furto mai risolto in un altro museo. Il nome di un giovane antiquario coinvolto in quel caso: Silas Kane." }
            ],
            text: `Tra scaffali alti fino al soffitto, trovi un raccoglitore di vecchi ritagli di giornale conservato dal museo stesso. Un articolo di dieci anni fa racconta di un furto irrisolto in un altro museo e di un giovane egittologo — Ashworth — ridicolizzato per aver insistito su una "maledizione" legata alla vicenda. Un nome minore, citato di sfuggita come consulente esterno di quel caso, ti fa sobbalzare: Silas Kane.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_biblioteca_again: {
            location: "BIBLIOTECA DEL MUSEO",
            text: `Hai già trovato ciò che serviva in questi scaffali. Il resto della biblioteca è silenzio e polvere.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_laboratorio: {
            location: "LABORATORIO DI RESTAURO",
            onArriveOnce: [
                { type: "setFlag", flag: "laboratorioVisitato", value: true },
                { type: "addLog", title: "Il Panno Macchiato", entry: "Un panno per la pulizia dei metalli, ancora umido, macchiato di un residuo scuro. Solo il personale del museo ha accesso a questa stanza dopo l'orario di chiusura." }
            ],
            text: `Bisturi, pennelli e solventi sono allineati con cura maniacale. Su un banco, però, un panno per la pulizia dei metalli è stato lasciato in disordine, ancora umido, con un residuo scuro sui bordi. Questa stanza si chiude a chiave dall'interno fuori orario: solo lo staff del museo può esservi entrato stasera.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_laboratorio_again: {
            location: "LABORATORIO DI RESTAURO",
            text: `Il laboratorio è tornato silenzioso. Hai già notato ciò che conta.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_magazzino: {
            location: "MAGAZZINO DEI REPERTI",
            onArriveOnce: [ { type: "setFlag", flag: "magazzinoVisitato", value: true } ],
            text: `File di casse numerate riempiono il magazzino sotterraneo, ognuna con un'etichetta d'inventario ordinata. Una cassa, in fondo, ha il sigillo di ceralacca rotto e richiuso alla bell'e meglio.`,
            options: [
                { text: "> Apri e ispeziona la cassa manomessa", skillCheck: { stat: "percezione", difficulty: 13, modifier: 0, success: "act2_magazzino_trovato", failure: "act2_magazzino_niente" } },
                { text: "> Torna nell'atrio", target: "act2_atrio" }
            ]
        },
        act2_magazzino_again: {
            location: "MAGAZZINO DEI REPERTI",
            text: `Le casse sono ancora lì, silenziose. Non c'è altro da scoprire qui, ormai.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_magazzino_trovato: {
            location: "MAGAZZINO DEI REPERTI",
            onArriveOnce: [
                { type: "setFlag", flag: "forgeriaTrovata", value: true },
                { type: "addItem", id: "statuetta_falsa", name: "Statuetta Falsa", desc: "Una statuetta di Sekhmet in gesso dipinto, spacciata per basalto originale.", examine: "Da vicino, la vernice che imita il basalto si sta già scrostando su un bordo. È un falso di buona fattura, ma pur sempre un falso — pronto a sostituire silenziosamente l'originale nell'inventario." },
                { type: "addLog", title: "La Prova della Frode", entry: "Nella cassa manomessa, una copia in gesso pronta a sostituire un reperto autentico. Qualcuno, dentro il museo, sta scambiando gli originali con dei falsi." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Sotto uno strato di paglia da imballaggio, trovi una statuetta di Sekhmet dipinta per sembrare basalto antico. È un falso — e non l'unico, a giudicare dall'ordine quasi professionale con cui è stato nascosto qui, in attesa di essere piazzato al posto giusto.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_magazzino_niente: {
            location: "MAGAZZINO DEI REPERTI",
            text: `Sposti paglia e imballaggi senza trovare nulla di utile. Forse hai controllato la cassa sbagliata, o troppo in fretta.`,
            options: [
                { text: "> Guarda ancora meglio", skillCheck: { stat: "percezione", difficulty: 13, modifier: 0, success: "act2_magazzino_trovato", failure: "act2_magazzino_niente" } },
                { text: "> Torna nell'atrio", target: "act2_atrio" }
            ]
        },

        act2_lowry: {
            location: "SALOTTO DEL PERSONALE — CON VIVIAN LOWRY",
            onArriveOnce: [
                { type: "setFlag", flag: "metLowry", value: true },
                { type: "addLog", title: "Vivian Lowry", entry: "Assistente di Adrian Voss da tre anni. In lacrime, ma composta. Dice di aver lasciato il museo prima del blackout — un dettaglio che nessun altro conferma." }
            ],
            text: `Vivian Lowry siede rigida su una poltrona del salotto del personale, gli occhi rossi ma asciutti ormai. "Lavoravo con lui ogni giorno," dice piano. "Non so chi possa avergli fatto una cosa simile." Alla tua domanda su dove fosse durante il blackout, risponde in fretta: "Ero già uscita, prima del discorso. Non ho visto niente."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_lowry_again: {
            location: "SALOTTO DEL PERSONALE — CON VIVIAN LOWRY",
            text: `Vivian si stringe le braccia al petto, gli occhi fissi sul pavimento. "Non ho altro da aggiungere," ripete, come una frase imparata a memoria.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_lowry_deep: {
            location: "SALOTTO DEL PERSONALE — CON VIVIAN LOWRY",
            onArriveOnce: [
                { type: "setFlag", flag: "askedLowryDeep", value: true },
                { type: "addLog", title: "La Contraddizione di Lowry", entry: "Il cartiglio ricomposto porta inciso lo stesso simbolo di un anello che Vivian Lowry indossa sempre. Messa alle strette, ammette di essere stata nella sala egizia durante il blackout — smentendo la propria versione precedente." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            text: `Le mostri il cartiglio ricomposto. Per un istante lunghissimo, Vivian non dice nulla — poi il suo sguardo scivola sull'anello che porta al mignolo, inciso con lo stesso identico simbolo. "Quello era... un regalo," balbetta. Ma le sue mani tremano, e la storia di essere uscita "prima del blackout" comincia a sgretolarsi sotto i tuoi occhi.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_ashworth2: {
            location: "ATRIO — CON ASHWORTH",
            onArriveOnce: [
                { type: "setFlag", flag: "askedAshworthDeep", value: true },
                { type: "addLog", title: "L'Alibi di Ashworth", entry: "Ashworth ammette la sua vecchia disgrazia con amarezza, ma dice di essere stato in biblioteca con la Contessa Marchetti durante il blackout — un alibi che, se confermato da lei, lo scagionerebbe." }
            ],
            text: `Quando gli parli del vecchio scandalo, Ashworth si irrigidisce. "Dieci anni a essere il pazzo della maledizione," dice, con una risata secca. "Ma durante il blackout ero in biblioteca, con la Contessa — le stavo mostrando dei documenti. Se non mi crede, chieda a lei." Poi, più piano: "Se cerca qualcuno che sapeva aprire quella teca senza far rumore... guardi chi ci lavorava ogni giorno, non chi la studiava da fuori."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_ashworth2_again: {
            location: "ATRIO — CON ASHWORTH",
            text: `Ashworth ti osserva indagare con un misto di curiosità e stanchezza. "Spero lo trovi," dice soltanto.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_marchetti2: {
            location: "ATRIO — CON LA CONTESSA",
            onArriveOnce: [
                { type: "setFlag", flag: "askedMarchettiDeep", value: true },
                { type: "addLog", title: "La Paura della Contessa", entry: "La Contessa Marchetti ammette di aver comprato diversi pezzi tramite Silas Kane, temendo ora che siano falsi. Conferma di essere stata in biblioteca con Ashworth durante il blackout." }
            ],
            text: `Alla menzione dei pezzi sostituiti, la Contessa impallidisce sotto la cipria. "Ho comprato diversi reperti tramite il signor Kane, questi ultimi anni," ammette, la voce bassa. "Se Voss avesse scoperto che sono falsi... la mia reputazione di collezionista sarebbe rovinata. Ma non l'ho ucciso io — ero in biblioteca con il professor Ashworth, quando sono saltate le luci. Può chiederglielo."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_marchetti2_again: {
            location: "ATRIO — CON LA CONTESSA",
            text: `La Contessa Marchetti si tiene in disparte ora, la maschera di eleganza incrinata dalla paura di essere coinvolta in uno scandalo.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        act2_kane2: {
            location: "ATRIO — CON SILAS KANE",
            onArriveOnce: [
                { type: "setFlag", flag: "askedKaneDeep", value: true },
                { type: "addLog", title: "La Confessione Parziale di Kane", entry: "Messo davanti alla statuetta falsa, Kane ammette di gestire un traffico di sostituzioni con un complice interno al museo, ma nega fermamente l'omicidio e si rifiuta di fare nomi." }
            ],
            text: `Quando gli mostri la statuetta falsa, il sorriso di Kane scompare per la prima volta stasera. "Va bene," sospira, guardandosi intorno. "Vendo copie, compro originali, qualcuno dentro il museo mi aiuta a fare lo scambio senza far rumore. Ma un omicidio? Non fa parte del mio mestiere, signorina Ashby. E non farò nomi — non prima di un avvocato."`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },
        act2_kane2_again: {
            location: "ATRIO — CON SILAS KANE",
            text: `Kane non dice più nulla, le braccia conserte, gli occhi che seguono ogni tuo movimento con cautela nuova.`,
            options: [ { text: "> Torna nell'atrio", target: "act2_atrio" } ]
        },

        /* ================= COMBINAZIONE OGGETTI (nessun nodo dedicato: avviene in inventario) ================= */

        /* ================= ATTO III — LA RESA DEI CONTI ================= */

        act3_intro: {
            location: "SALA CONFERENZE — RESA DEI CONTI",
            music: "tema_confronto",
            text: `Fai radunare nella sala conferenze tutti quelli che erano presenti stasera: Ashworth, la Contessa Marchetti, Silas Kane, Vivian Lowry, persino il povero Okafor, terrorizzato all'idea di essere sospettato. L'ispettore ti concede pochi minuti prima di prendere in mano lui le redini. È il momento di dire quello che sai — o quello che credi di sapere.`,
            options: [ { text: "> Presenta le tue conclusioni", target: "act3_accusa" } ]
        },

        act3_accusa: {
            location: "SALA CONFERENZE — RESA DEI CONTI",
            text: `Tutti gli occhi sono puntati su di te. Hai un frammento di prove, alcune certezze, e qualche sospetto che potrebbe rivelarsi infondato. Scegli con attenzione chi accusare — o se è meglio aspettare ancora.`,
            options: [
                { text: "> Accusa Vivian Lowry", target: "act3_finale_verita", condition: { all: [ { type: "flag", flag: "discoveredMotive", equals: true }, { type: "flag", flag: "cartoucheCombined", equals: true }, { type: "flag", flag: "laboratorioVisitato", equals: true } ] } },
                { text: "> Accusa Vivian Lowry, pur con prove ancora incomplete", target: "act3_lowry_debole", condition: { any: [ { type: "flag", flag: "discoveredMotive", equals: false }, { type: "flag", flag: "cartoucheCombined", equals: false }, { type: "flag", flag: "laboratorioVisitato", equals: false } ] } },
                { text: "> Accusa il professor Ashworth", target: "act3_finale_ashworth" },
                { text: "> Accusa la Contessa Marchetti", target: "act3_finale_marchetti" },
                { text: "> Accusa Silas Kane", target: "act3_finale_kane", condition: { type: "flag", flag: "forgeriaTrovata", equals: true } },
                { text: "> Non sei ancora sicura: torna sola nella sala egizia, di notte", target: "act3_notturna" }
            ]
        },

        act3_finale_verita: {
            location: "SALA CONFERENZE — LA VERITÀ",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Il Caso Risolto", entry: "Vivian Lowry crolla e confessa: aiutava Kane a sostituire i pezzi autentici per pagare i debiti del fratello. Quando Voss la scoprì quella sera, in preda al panico, afferrò il pugnale dalla teca che lei stessa aveva la chiave per aprire." }
            ],
            text: `Posi sul tavolo il cartiglio ricomposto, il diario di Voss, la statuetta falsa. "Il movente, i mezzi, l'occasione," dici, la voce ferma nonostante il cuore che batte forte. "Solo una persona in questa stanza aveva tutti e tre." Vivian Lowry non aspetta che tu pronunci il suo nome: scoppia in lacrime e confessa. Sostituiva reperti autentici con falsi per Kane, per pagare i debiti di gioco del fratello. Quando Voss la scoprì, quella sera, il panico ebbe la meglio su di lei. Kane viene arrestato per traffico di reperti; Ashworth ti stringe la mano, in silenzio, come a dire che forse, dopo dieci anni, qualcuno gli ha finalmente creduto.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_lowry_debole: {
            location: "SALA CONFERENZE — UN'ACCUSA DEBOLE",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Un'Accusa Senza Prove Sufficienti", entry: "Senza prove complete, Lowry nega tutto con freddezza sufficiente a convincere l'ispettore. Il caso resta ufficialmente irrisolto." }
            ],
            text: `Accusi Vivian Lowry, ma le tue prove sono frammentarie, e lei lo sa. Nega con una calma che ti gela il sangue, e l'ispettore, non convinto, ti chiede garbatamente di lasciare il resto delle indagini alla polizia. Nei giorni seguenti, il caso scivola lentamente verso l'archivio dei fascicoli irrisolti. Hai visto la verità, ma non sei riuscita a dimostrarla in tempo.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_finale_ashworth: {
            location: "SALA CONFERENZE — UN'ACCUSA SBAGLIATA",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "L'Accusa Sbagliata", entry: "Ashworth, innocente, viene comunque macchiato dallo scandalo per la seconda volta in vita sua. La vera colpevole, intanto, ha tutto il tempo per far sparire le prove residue." }
            ],
            text: `Punti il dito contro Ashworth, richiamando la sua vecchia disgrazia come prova di un movente. È un errore, e lo capisci dal suo sguardo ferito prima ancora che l'ispettore verifichi il suo alibi in biblioteca. Il vero colpevole, nel frattempo, ha tutto il tempo per far sparire ciò che resta delle prove. Il tuo articolo, quella settimana, dovrà essere una correzione, non una rivelazione.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_finale_marchetti: {
            location: "SALA CONFERENZE — UN'ACCUSA SBAGLIATA",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "L'Accusa Sbagliata", entry: "La Contessa Marchetti, vittima innocente del traffico di Kane, viene comunque travolta dallo scandalo. La vera assassina resta libera." }
            ],
            text: `Accusi la Contessa Marchetti, convinta che il suo timore per la reputazione l'abbia spinta a uccidere. Ma il suo alibi con Ashworth regge, e la sola conseguenza della tua accusa è di trascinare nello scandalo una donna che, in fondo, era essa stessa vittima del traffico di Kane. La vera colpevole resta libera, e tu lo saprai solo troppo tardi.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_finale_kane: {
            location: "SALA CONFERENZE — VERITÀ PARZIALE",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Verità Parziale", entry: "Kane viene arrestato per il traffico di reperti falsi, ma nega fino all'ultimo l'omicidio — e su questo, per una volta, dice la verità. L'assassina di Voss non viene mai identificata." }
            ],
            text: `Accusi Silas Kane, e su un punto hai perfettamente ragione: viene arrestato sul posto per il traffico di reperti falsificati, la prova della statuetta in mano all'ispettore. Ma sull'omicidio nega fino all'ultimo, con una fermezza che — stavolta — suona sincera. Il tuo articolo racconterà lo scandalo dei falsi, ma non potrà mai scrivere la parola "fine" sull'assassinio di Adrian Voss.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_notturna: {
            location: "SALA EGIZIA — DA SOLA, DI NOTTE",
            music: "tema_notturna",
            onArriveOnce: [
                { type: "addLog", title: "Il Confronto Notturno", entry: "Contro ogni buon senso, torni sola nella sala egizia dopo che il museo si è svuotato, sperando di sorprendere il colpevole sul fatto." }
            ],
            text: `Contro ogni consiglio, torni sola nella sala egizia dopo che il museo si è svuotato. Il chiaro di luna filtra dal lucernario sul sarcofago di Nefret-Ka. Un rumore di passi, alle tue spalle: qualcuno è tornato anche stasera, per lo stesso motivo.`,
            options: [
                { text: "> Ti nascondi in silenzio per vedere chi è", skillCheck: { stat: "percezione", difficulty: 13, modifier: 0, success: "act3_notturna_successo", failure: "act3_notturna_fallimento" } }
            ]
        },

        act3_notturna_successo: {
            location: "SALA EGIZIA — COLTA SUL FATTO",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Sorpresa in Flagrante", entry: "Vivian Lowry viene sorpresa mentre tenta di recuperare il pugnale nascosto dietro il sarcofago, per farlo sparire per sempre. Con l'ispettore già in ascolto fuori dalla porta, non ha più scampo." }
            ],
            text: `Trattieni il respiro dietro il sarcofago di Nefret-Ka. È Vivian Lowry: fruga con mani tremanti dietro la base del sarcofago e ne estrae il pugnale rituale, nascosto lì fin dalla notte del delitto. Prima che possa richiuderlo nella borsa, la porta si spalanca: l'ispettore, avvertito da te in anticipo, era già in ascolto nel corridoio. Lowry non ha più scampo, e questa volta la confessione arriva senza bisogno delle tue parole.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_notturna_fallimento: {
            location: "SALA EGIZIA — SCOPERTA",
            text: `Un asse del pavimento scricchiola sotto il tuo peso nel momento peggiore possibile. La figura si volta di scatto verso di te: è Vivian Lowry, il pugnale ancora in mano, gli occhi larghi di panico puro.`,
            options: [
                { text: "> Cerca di calmarla e guadagnare tempo", skillCheck: { stat: "fascino", difficulty: 14, modifier: 0, success: "act3_notturna_salva", failure: "act3_finale_gameover" } }
            ]
        },

        act3_notturna_salva: {
            location: "SALA EGIZIA — SALVA PER UN SOFFIO",
            music: "tema_finale_vittoria",
            onArriveOnce: [
                { type: "addLog", title: "Salva per un Soffio", entry: "Riesci a tenerla impegnata a parlare abbastanza a lungo perché l'ispettore, insospettito dal tuo ritardo, arrivi in tempo. Vivian Lowry viene arrestata, ma il rischio che hai corso resta un monito." }
            ],
            text: `"Non deve finire così," le dici, con una calma che non provi affatto. "Ci sono altri modi." Parli, parli ancora, guadagnando ogni secondo possibile, finché non senti i passi pesanti dell'ispettore nel corridoio — insospettito dal tuo ritardo. Vivian Lowry si arrende senza opporre resistenza, il pugnale che le scivola dalle dita con un tintinnio metallico sul marmo. Sei salva, ma la prossima volta scriverai un articolo, non un'imboscata.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        },

        act3_finale_gameover: {
            location: "SALA EGIZIA — TROPPO TARDI",
            music: "tema_finale_amaro",
            onArriveOnce: [
                { type: "addLog", title: "Il Prezzo dell'Imprudenza", entry: "Nel panico, Lowry ha la meglio. Quando l'ispettore arriva, trova solo la sala vuota, la teca aperta, e nessuna traccia né dell'assassina né della cronista troppo curiosa." }
            ],
            text: `Le parole ti muoiono in gola: nel panico, Vivian Lowry non ti lascia il tempo di finire la frase. Quando l'ispettore, insospettito, raggiunge finalmente la sala egizia, la trova vuota e silenziosa, la teca ancora aperta. Del pugnale, della sua proprietaria e della cronista troppo curiosa del Chicago Ledger, per il momento, nessuna traccia. Forse avresti dovuto aspettare la mattina.`,
            options: [ { text: "> Torna al Menu Principale", target: "__mainMenu__" } ]
        }
    },

    combinations: [
        {
            items: ["frammento_cartiglio_a", "frammento_cartiglio_b"],
            consumes: true,
            result: { id: "cartiglio_intero", name: "Cartiglio Ricomposto", desc: "I due frammenti, uniti, formano un piccolo sigillo inciso con un simbolo che riconosci: lo stesso di un gioiello visto stasera.", examine: "Il sigillo ricomposto raffigura una Sekhmet stilizzata attorno a un'iniziale. Non è un motivo da scavo archeologico: è un monogramma personale." },
            effects: [
                { type: "setFlag", flag: "cartoucheCombined", value: true },
                { type: "addLog", title: "Il Cartiglio Ricomposto", entry: "I due frammenti combaciano perfettamente: non un reperto antico, ma un monogramma personale, moderno, inciso su un gioiello." },
                { type: "playSfx", sfx: "rivelazione" }
            ],
            message: "I due frammenti combaciano alla perfezione: non è un reperto antico, ma un monogramma moderno, inciso su un gioiello."
        }
    ]
};
