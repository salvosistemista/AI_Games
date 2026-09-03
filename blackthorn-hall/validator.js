/* ============================================================
   VALIDATORE STATICO DELLA STORIA
   ------------------------------------------------------------
   Analizza l'oggetto STORY (nessuna esecuzione del gioco) e
   segnala problemi strutturali prima ancora di giocarla.
   Usato da validator.html — non serve includerlo in index.html.
   ============================================================ */

function validateStory(story) {
    const errors = [];
    const warnings = [];

    if (!story || !story.nodes) {
        return { errors: ['La storia non ha un oggetto "nodes".'], warnings: [], nodeCount: 0 };
    }

    const nodeIds = Object.keys(story.nodes);
    const declaredFlags = new Set(Object.keys((story.initialState || {}).flags || {}));
    const declaredStats = new Set(Object.keys((story.initialState || {}).stats || {}));
    const musicIds = new Set(Object.keys(story.music || {}));
    const sfxIds = new Set(Object.keys(story.sfx || {}));
    const referencedTargets = new Set();

    // Flag/stat considerati "noti": dichiarati in initialState OPPURE impostati
    // da un effetto in un punto qualunque della storia (controllo statico,
    // non tiene conto dell'ordine narrativo reale).
    const knownFlags = new Set(declaredFlags);
    const knownStats = new Set(declaredStats);

    // ---------------- Controllo di startNode ----------------
    if (!story.startNode) {
        errors.push('story.startNode non definito.');
    } else if (!story.nodes[story.startNode]) {
        errors.push(`story.startNode "${story.startNode}" non corrisponde a nessun nodo.`);
    }

    // ---------------- Prima passata: raccolta flag/stat impostati ----------------
    function collectFromEffects(effects) {
        (effects || []).forEach(eff => {
            if (eff.type === 'setFlag') knownFlags.add(eff.flag);
            if (eff.type === 'setStat' || eff.type === 'modifyStat') knownStats.add(eff.stat);
        });
    }
    nodeIds.forEach(id => {
        const node = story.nodes[id];
        collectFromEffects(node.onArrive);
        collectFromEffects(node.onArriveOnce);
        (node.options || []).forEach(opt => collectFromEffects(opt.effects));
    });

    // ---------------- Helper di controllo ----------------
    function checkTarget(target, ctx) {
        if (!target) return;
        if (target === '__mainMenu__') return;
        if (!story.nodes[target]) errors.push(`${ctx}: target "${target}" non esiste tra i nodi.`);
        else referencedTargets.add(target);
    }

    function checkCondition(cond, ctx) {
        if (!cond) return;
        if (cond.all) return cond.all.forEach(c => checkCondition(c, ctx));
        if (cond.any) return cond.any.forEach(c => checkCondition(c, ctx));
        if (cond.type === 'flag' && !knownFlags.has(cond.flag)) {
            warnings.push(`${ctx}: condizione sul flag "${cond.flag}", mai dichiarato in initialState né impostato altrove.`);
        }
        if (cond.type === 'stat' && !knownStats.has(cond.stat)) {
            warnings.push(`${ctx}: condizione sulla stat "${cond.stat}", non presente in initialState.stats.`);
        }
    }

    function checkEffectRefs(effects, ctx) {
        (effects || []).forEach(eff => {
            if (eff.type === 'playSfx' && !sfxIds.has(eff.sfx)) {
                errors.push(`${ctx}: playSfx("${eff.sfx}") — sfx non definito in story.sfx.`);
            }
        });
    }

    // ---------------- Seconda passata: controlli veri e propri ----------------
    nodeIds.forEach(id => {
        const node = story.nodes[id];
        const nodeCtx = `nodo "${id}"`;

        if (node.music !== undefined && node.music !== null && !musicIds.has(node.music)) {
            errors.push(`${nodeCtx}: music "${node.music}" non definita in story.music.`);
        }
        checkEffectRefs(node.onArrive, `${nodeCtx} (onArrive)`);
        checkEffectRefs(node.onArriveOnce, `${nodeCtx} (onArriveOnce)`);

        if (!node.options || node.options.length === 0) {
            warnings.push(`${nodeCtx}: nessuna opzione — vicolo cieco. Verifica che sia un finale voluto.`);
        }

        (node.options || []).forEach((opt, i) => {
            const ctx = `${nodeCtx} > opzione ${i + 1} ("${opt.text || '???'}")`;

            if (!opt.target && !opt.skillCheck) {
                errors.push(`${ctx}: manca sia "target" che "skillCheck".`);
            }
            if (opt.target) checkTarget(opt.target, ctx);
            if (opt.skillCheck) {
                checkTarget(opt.skillCheck.success, `${ctx} (skillCheck.success)`);
                checkTarget(opt.skillCheck.failure, `${ctx} (skillCheck.failure)`);
                if (!knownStats.has(opt.skillCheck.stat)) {
                    warnings.push(`${ctx}: skillCheck usa la stat "${opt.skillCheck.stat}", non presente in initialState.stats.`);
                }
            }
            checkCondition(opt.condition, ctx);
            checkEffectRefs(opt.effects, ctx);
        });
    });

    // ---------------- Nodi orfani ----------------
    nodeIds.forEach(id => {
        if (id !== story.startNode && !referencedTargets.has(id)) {
            warnings.push(`nodo "${id}": non raggiunto da nessuna opzione della storia (nodo orfano).`);
        }
    });

    return { errors, warnings, nodeCount: nodeIds.length };
}
