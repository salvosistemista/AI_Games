/* ============================================================
   MOTORE GENERICO PER AVVENTURE TESTUALI A NODI
   ------------------------------------------------------------
   Non contiene nessuna narrativa: legge una STORY (oggetto dati)
   e un THEME (config grafica) e gestisce stato, navigazione,
   condizioni, effetti, skill check e salvataggi.
   Delegano il rendering effettivo a UI (vedi ui.js).
   ============================================================ */

const Engine = (() => {
    let story = null;   // dati della storia corrente
    let theme = null;   // config tema/skin corrente
    let state = null;   // stato di gioco corrente
    let inGame = false;

    // ---------------- CONTINUITA' TRA ATTI (stessa "serie") ----------------
    // Se story.meta.series e' definito, un atto puo' esportare il proprio
    // stato finale (flag/stat/inventario/log) perche' l'atto successivo lo
    // riprenda come punto di partenza invece dei suoi default. Facoltativo:
    // se non c'e' nulla da recuperare (o meta.series manca), si procede con
    // gli initialState della storia, esattamente come prima.
    function carryOverKey() {
        return story.meta && story.meta.series ? `engine_carryover_${story.meta.series}` : null;
    }

    function loadCarryOver() {
        const key = carryOverKey();
        if (!key) return null;
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function saveCarryOver() {
        const key = carryOverKey();
        if (!key) return;
        try {
            localStorage.setItem(key, JSON.stringify({
                flags: state.flags, stats: state.stats, inventory: state.inventory, logs: state.logs
            }));
        } catch (e) {}
    }

    // ---------------- STATO ----------------
    function freshState() {
        const init = story.initialState || {};
        const carry = loadCarryOver();
        return {
            currentNode: story.startNode || 'start',
            // I default della storia restano la base (per poterla giocare anche da sola);
            // quanto recuperato dall'atto precedente li sovrascrive dove coincide.
            flags: Object.assign({}, JSON.parse(JSON.stringify(init.flags || {})), carry ? carry.flags : {}),
            stats: Object.assign({}, JSON.parse(JSON.stringify(init.stats || {})), carry ? carry.stats : {}),
            inventory: carry ? JSON.parse(JSON.stringify(carry.inventory)) : JSON.parse(JSON.stringify(init.inventory || [])),
            logs: carry ? JSON.parse(JSON.stringify(carry.logs)) : [],
            visited: [],
            examinedItems: []
        };
    }

    // ---------------- CONDIZIONI ----------------
    // Formato: {all:[...]} | {any:[...]} | {type:'flag'|'stat'|'item', ...}
    function checkCondition(cond) {
        if (!cond) return true;
        if (cond.all) return cond.all.every(checkCondition);
        if (cond.any) return cond.any.some(checkCondition);

        switch (cond.type) {
            case 'flag':
                return state.flags[cond.flag] === (cond.equals !== undefined ? cond.equals : true);
            case 'stat': {
                const v = state.stats[cond.stat] ?? 0;
                switch (cond.op) {
                    case '>=': return v >= cond.value;
                    case '<=': return v <= cond.value;
                    case '>':  return v > cond.value;
                    case '<':  return v < cond.value;
                    case '==': return v === cond.value;
                    case '!=': return v !== cond.value;
                    default:   return false;
                }
            }
            case 'item': {
                const it = state.inventory.find(i => i.id === cond.item);
                return !!it && it.qty >= (cond.quantity || 1);
            }
            default:
                console.warn('Condizione sconosciuta:', cond.type);
                return true;
        }
    }

    // ---------------- EFFETTI ----------------
    // Effetti applicabili in onArrive (nodo) o effects (opzione)
    function applyEffect(eff) {
        switch (eff.type) {
            case 'setFlag':
                state.flags[eff.flag] = eff.value !== undefined ? eff.value : true;
                break;
            case 'modifyStat':
                state.stats[eff.stat] = (state.stats[eff.stat] || 0) + eff.delta;
                break;
            case 'setStat':
                state.stats[eff.stat] = eff.value;
                break;
            case 'addItem': {
                const existing = state.inventory.find(i => i.id === eff.id);
                if (existing) {
                    existing.qty += (eff.qty || 1);
                } else {
                    state.inventory.push({
                        id: eff.id, name: eff.name, desc: eff.desc || '', qty: eff.qty || 1,
                        examine: eff.examine || null,            // testo esteso mostrato al click, opzionale
                        examineEffects: eff.examineEffects || null // effetti eseguiti solo alla prima osservazione
                    });
                }
                UI.notify(`OGGETTO ACQUISITO: ${eff.name || eff.id}`);
                break;
            }
            case 'removeItem': {
                const existing = state.inventory.find(i => i.id === eff.id);
                if (existing) {
                    existing.qty -= (eff.qty || 1);
                    if (existing.qty <= 0) state.inventory = state.inventory.filter(i => i.id !== eff.id);
                }
                break;
            }
            case 'addLog':
                if (!state.logs.some(l => l.title === eff.title)) {
                    state.logs.push({ title: eff.title, entry: eff.entry });
                    UI.notify(`NUOVA NOTA LOG: ${eff.title}`);
                }
                break;
            case 'playSfx':
                GameAudio.playSfx(eff.sfx);
                break;
            case 'carryOverState':
                saveCarryOver();
                break;
            default:
                console.warn('Effetto sconosciuto:', eff.type);
        }
    }

    function applyEffects(list) {
        (list || []).forEach(applyEffect);
    }

    // ---------------- SKILL CHECK ----------------
    // d20 + valore statistica + modificatore, confrontato con una difficoltà
    function rollSkillCheck(sc) {
        const statValue = state.stats[sc.stat] || 0;
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + statValue + (sc.modifier || 0);
        const success = total >= sc.difficulty;
        return { roll, total, success, target: success ? sc.success : sc.failure };
    }

    // ---------------- NAVIGAZIONE ----------------
    function goTo(nodeId) {
        if (nodeId === '__mainMenu__') {
            inGame = false;
            GameAudio.stopTrack(); // finale vero: niente da riprendere, si ferma per sempre
            UI.showMainMenu();
            return;
        }
        const node = story.nodes[nodeId];
        if (!node) {
            console.error('Nodo inesistente:', nodeId);
            return;
        }
        state.currentNode = nodeId;
        const firstVisit = !state.visited.includes(nodeId);
        if (firstVisit) state.visited.push(nodeId);
        applyEffects(node.onArrive);           // eseguiti ad ogni visita (sicuri da ripetere: flag, addLog, sfx)
        if (firstVisit) applyEffects(node.onArriveOnce); // solo alla prima visita (stat, oggetti — evita l'accumulo rivisitando un nodo)
        UI.renderNode(node, nodeId);
    }

    function chooseOption(opt) {
        applyEffects(opt.effects);
        if (opt.skillCheck) {
            const result = rollSkillCheck(opt.skillCheck);
            UI.notify(result.success ? 'PROVA SUPERATA' : 'PROVA FALLITA');
            goTo(result.target);
        } else {
            goTo(opt.target);
        }
    }

    // ---------------- OGGETTI: OSSERVA E COMBINA ----------------
    // Testo esteso mostrato al click su un oggetto in inventario.
    // La prima osservazione può eseguire "examineEffects" (una volta sola).
    function examineItem(itemId) {
        const item = state.inventory.find(i => i.id === itemId);
        if (!item) return null;
        if (!state.examinedItems.includes(itemId)) {
            state.examinedItems.push(itemId);
            applyEffects(item.examineEffects);
        }
        return item.examine || item.desc || '';
    }

    // story.combinations = [ { items: ["a","b"], consumes:true, result:{id,name,desc,qty}, effects:[...], message:"..." } ]
    // Ordine libero: "a"+"b" combacia sia con (a,b) che con (b,a).
    function tryCombine(idA, idB) {
        const combos = story.combinations || [];
        const match = combos.find(c =>
            (c.items[0] === idA && c.items[1] === idB) ||
            (c.items[0] === idB && c.items[1] === idA)
        );
        if (!match) return { success: false };

        if (match.consumes !== false) {
            applyEffect({ type: 'removeItem', id: idA, qty: 1 });
            applyEffect({ type: 'removeItem', id: idB, qty: 1 });
        }
        if (match.result) applyEffect({ type: 'addItem', ...match.result });
        applyEffects(match.effects);

        return { success: true, message: match.message || '' };
    }

    // ---------------- SALVATAGGI ----------------
    // Namespaced sull'id della storia, cosi' piu' avventure non collidono
    function saveKey(slot) {
        return `engine_${story.meta.id}_slot_${slot}`;
    }

    function save(slot) {
        const payload = {
            state,
            location: story.nodes[state.currentNode].location,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5)
        };
        localStorage.setItem(saveKey(slot), JSON.stringify(payload));
    }

    function load(slot) {
        const raw = localStorage.getItem(saveKey(slot));
        if (!raw) return false;
        const payload = JSON.parse(raw);
        state = payload.state;
        inGame = true;
        goTo(state.currentNode);
        return true;
    }

    function slotInfo(slot) {
        const raw = localStorage.getItem(saveKey(slot));
        return raw ? JSON.parse(raw) : null;
    }

    // ---------------- CICLO DI VITA ----------------
    function newGame() {
        state = freshState();
        inGame = true;
        goTo(state.currentNode);
    }

    function init(storyData, themeData) {
        story = storyData;
        theme = themeData;
        UI.applyTheme(theme);
        UI.init();
    }

    return {
        init, newGame, save, load, slotInfo, goTo, chooseOption, checkCondition,
        examineItem, tryCombine,
        getState: () => state,
        getStory: () => story,
        isInGame: () => inGame,
        setInGame: (v) => { inGame = v; }
    };
})();
