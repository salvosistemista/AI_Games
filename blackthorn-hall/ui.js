/* ============================================================
   UI GENERICA
   ------------------------------------------------------------
   Nessuna riga qui conosce la trama. Parla solo con Engine.
   Per cambiare skin: modifica theme.*.js, non questo file.
   ============================================================ */

const UI = (() => {
    let isLoadOnly = false;
    let baseTheme = null; // il tema d'autore, invariato — le variazioni per nodo si applicano sopra questo

    // Scorciatoia locale: i beep di interfaccia passano dal modulo GameAudio
    function playBeep(freq, type, duration) { GameAudio.uiBeep(freq, type, duration); }

    // ---------------- TEMA ----------------
    function setColorVars(theme) {
        const root = document.documentElement.style;
        root.setProperty('--color-main', theme.colorMain || '#00ff66');
        root.setProperty('--color-dim', theme.colorDim || '#00aa44');
        root.setProperty('--color-bg', theme.colorBg || '#050505');
        root.setProperty('--font', theme.font || "'Courier New', Courier, monospace");
    }

    function applyTheme(theme) {
        baseTheme = theme;
        setColorVars(theme);
        document.title = theme.title || 'Avventura';
        document.getElementById('game-title').innerHTML = theme.titleHtml || theme.title || '';
        document.getElementById('version-tag').innerText = theme.versionTag || '';
    }

    // Variazione di tema per scena/nodo: si applica SOLO sui colori/font,
    // sopra il tema base — mai su titolo/versione. override === null
    // ripristina il tema base. Persiste finché un nodo non la cambia di
    // nuovo (stesso principio di music/art) — vedi node.theme nel README.
    function applyThemeOverride(override) {
        setColorVars(override ? Object.assign({}, baseTheme, override) : baseTheme);
    }

    // ---------------- SCHERMATE ----------------
    function showScreen(id) {
        playBeep(600, 'square', 0.03);
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
        document.getElementById(id).classList.add('active-screen');
        document.getElementById('btn-continue').disabled = !Engine.isInGame();
    }

    function showMainMenu() { showScreen('screen-main'); }

    // ---------------- RENDER NODO ----------------
    function renderNode(node, nodeId) {
        document.getElementById('ui-location').innerText = node.location;
        document.getElementById('text-output').innerText = node.text;
        document.getElementById('text-output').scrollTop = 0;

        const artBox = document.getElementById('node-art');
        if (node.art) {
            artBox.innerHTML = node.art;
            artBox.style.display = 'flex';
        } else {
            artBox.innerHTML = '';
            artBox.style.display = 'none';
        }

        // Musica: si aggiorna solo se il nodo dichiara esplicitamente il campo
        // (anche 'music: null' per fermarla) — se il campo manca, continua quella attuale.
        if ('music' in node) GameAudio.playTrack(node.music);

        // Variazione di tema per scena: stesso principio di 'music' — si
        // applica solo se il nodo dichiara esplicitamente il campo.
        if ('theme' in node) applyThemeOverride(node.theme);

        const container = document.getElementById('game-choices');
        container.innerHTML = '';
        (node.options || []).forEach(opt => {
            if (Engine.checkCondition(opt.condition)) {
                const btn = document.createElement('button');
                btn.innerText = opt.text;
                btn.onclick = () => {
                    playBeep(520, 'square', 0.04);
                    Engine.chooseOption(opt);
                };
                container.appendChild(btn);
            }
        });
        renderStatsBar();
        showScreen('screen-game');
    }

    function renderStatsBar() {
        const bar = document.getElementById('stats-bar');
        const stats = Engine.getState().stats;
        const keys = Object.keys(stats);
        bar.innerText = keys.length ? keys.map(k => `${k.toUpperCase()}: ${stats[k]}`).join('  |  ') : '';
    }

    // ---------------- NOTIFICHE ----------------
    function notify(msg) {
        playBeep(800, 'square', 0.1);
        const notif = document.getElementById('notification');
        notif.innerText = msg;
        notif.style.display = 'block';
        setTimeout(() => { notif.style.display = 'none'; }, 1500);
    }

    // ---------------- MODALI: INVENTARIO / LOG ----------------
    let selectedItemId = null; // oggetto selezionato in attesa di una combinazione

    function openInventory() {
        playBeep(650, 'square', 0.04);
        selectedItemId = null;
        document.getElementById('inventory-detail').innerText = 'Tocca un oggetto per osservarlo. Toccane un secondo per provare a combinarli.';
        renderInventoryList();
        document.getElementById('modal-inventory').style.display = 'flex';
    }

    function renderInventoryList() {
        const list = document.getElementById('inventory-list');
        const inv = Engine.getState().inventory;
        list.innerHTML = '';
        if (inv.length === 0) {
            list.innerText = 'Nessun oggetto in possesso.';
            return;
        }
        inv.forEach(item => {
            const row = document.createElement('button');
            row.className = 'item-row' + (item.id === selectedItemId ? ' selected' : '');
            row.innerText = item.qty > 1 ? `${item.name} x${item.qty}` : item.name;
            row.onclick = () => onItemClick(item.id);
            list.appendChild(row);
        });
    }

    function onItemClick(itemId) {
        const detail = document.getElementById('inventory-detail');

        if (selectedItemId && selectedItemId !== itemId) {
            playBeep(600, 'square', 0.04);
            const result = Engine.tryCombine(selectedItemId, itemId);
            selectedItemId = null;
            renderInventoryList();
            if (result.success) {
                playBeep(750, 'square', 0.08);
                detail.innerText = result.message || 'I due oggetti si combinano.';
            } else {
                detail.innerText = 'Non succede nulla di particolare.';
            }
            return;
        }

        if (selectedItemId === itemId) {
            playBeep(500, 'square', 0.03);
            selectedItemId = null;
            renderInventoryList();
            detail.innerText = Engine.examineItem(itemId) || '';
            return;
        }

        playBeep(600, 'square', 0.03);
        selectedItemId = itemId;
        renderInventoryList();
        detail.innerText = Engine.examineItem(itemId) || '';
    }

    function openLog() {
        playBeep(650, 'square', 0.04);
        const list = document.getElementById('log-list');
        const logs = Engine.getState().logs;
        list.innerText = logs.length === 0
            ? 'Nessuna voce registrata.'
            : logs.map(l => `=== ${l.title} ===\n${l.entry}\n`).join('\n');
        document.getElementById('modal-log').style.display = 'flex';
    }

    function closeModals() {
        playBeep(450, 'square', 0.03);
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }

    // ---------------- SALVATAGGI ----------------
    function renderSlots() {
        const container = document.getElementById('slot-container');
        container.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            const info = Engine.slotInfo(i);
            const btn = document.createElement('button');
            btn.className = 'slot-btn';
            btn.innerHTML = info
                ? `<span>SLOT ${i}: ${info.location}</span><span style="font-size:11px;color:var(--color-dim)">${info.date}</span>`
                : `<span>SLOT ${i}: [VUOTO]</span>`;
            btn.onclick = () => handleSlotClick(i, !!info);
            container.appendChild(btn);
        }
    }

    function handleSlotClick(slot, hasData) {
        if (isLoadOnly) {
            if (hasData) {
                showModal(`Caricare la partita dallo SLOT ${slot}?`, false, () => {
                    Engine.load(slot);
                    notify('CARICAMENTO...');
                });
            }
        } else if (hasData) {
            showModal(`Lo SLOT ${slot} contiene dati. Scegli un'azione:`, true,
                () => { Engine.save(slot); notify('PARTITA SALVATA!'); renderSlots(); },
                () => { Engine.load(slot); notify('CARICAMENTO...'); }
            );
        } else {
            Engine.save(slot);
            notify('PARTITA SALVATA!');
            renderSlots();
        }
    }

    function showModal(text, showLoadBtn, onConfirm, onLoad) {
        const modal = document.getElementById('custom-modal');
        document.getElementById('modal-text').innerText = text;
        const btnLoad = document.getElementById('modal-btn-load');
        btnLoad.style.display = showLoadBtn ? 'block' : 'none';
        modal.style.display = 'flex';
        playBeep(700, 'square', 0.05);
        document.getElementById('modal-btn-confirm').onclick = () => { modal.style.display = 'none'; onConfirm && onConfirm(); };
        btnLoad.onclick = () => { modal.style.display = 'none'; onLoad && onLoad(); };
        document.getElementById('modal-btn-cancel').onclick = () => { modal.style.display = 'none'; };
    }

    function openSaveMenu(loadOnly) {
        isLoadOnly = loadOnly;
        document.getElementById('save-title').innerText = loadOnly ? 'CARICA PARTITA' : 'SALVA / CARICA';
        renderSlots();
        showScreen('screen-save');
    }

    // ---------------- OPZIONI SISTEMA ----------------
    function toggleAudio() {
        const enabled = GameAudio.toggle();
        document.getElementById('btn-audio').innerText = `SONORO: ${enabled ? 'ATTIVATO' : 'DISATTIVATO'}`;
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            document.getElementById('btn-fullscreen').innerText = 'FULLSCREEN: ON';
        } else {
            document.exitFullscreen && document.exitFullscreen();
            document.getElementById('btn-fullscreen').innerText = 'FULLSCREEN: OFF';
        }
    }

    // ---------------- ASPETTO (preferenze del giocatore, non del tema) ----------------
    // Filtro CSS sopra l'intera UI: non tocca i colori del tema, li regola soltanto.
    // Persistente in localStorage, indipendente dalla singola storia/avventura.
    const DISPLAY_PREFS_KEY = 'engine_display_prefs';

    function applyDisplayPrefs(brightness, hue) {
        document.documentElement.style.setProperty('--display-brightness', brightness / 100);
        document.documentElement.style.setProperty('--display-hue', hue + 'deg');
    }

    function saveDisplayPrefs() {
        const brightness = parseInt(document.getElementById('range-brightness').value, 10);
        const hue = parseInt(document.getElementById('range-hue').value, 10);
        applyDisplayPrefs(brightness, hue);
        try { localStorage.setItem(DISPLAY_PREFS_KEY, JSON.stringify({ brightness, hue })); } catch (e) {}
    }

    function loadDisplayPrefs() {
        let prefs = { brightness: 100, hue: 0 };
        try {
            const raw = localStorage.getItem(DISPLAY_PREFS_KEY);
            if (raw) prefs = Object.assign(prefs, JSON.parse(raw));
        } catch (e) {}
        document.getElementById('range-brightness').value = prefs.brightness;
        document.getElementById('range-hue').value = prefs.hue;
        applyDisplayPrefs(prefs.brightness, prefs.hue);
    }

    function resetDisplayPrefs() {
        document.getElementById('range-brightness').value = 100;
        document.getElementById('range-hue').value = 0;
        saveDisplayPrefs();
        playBeep(500, 'square', 0.05);
    }

    // ---------------- INIT ----------------
    function init() {
        document.getElementById('btn-continue').disabled = true;
        document.getElementById('btn-new').onclick = () => Engine.newGame();
        document.getElementById('btn-continue').onclick = () => showScreen('screen-game');
        document.getElementById('btn-load').onclick = () => openSaveMenu(true);
        document.getElementById('btn-options').onclick = () => showScreen('screen-options');
        document.getElementById('btn-inventory').onclick = openInventory;
        document.getElementById('btn-log').onclick = openLog;
        document.getElementById('btn-save-menu').onclick = () => openSaveMenu(false);
        // Nota: NON si tocca Engine.setInGame qui — si torna al menu senza
        // abbandonare la partita, cosi' "Continua Partita" resta disponibile.
        // inGame diventa false solo quando la storia arriva davvero a un
        // finale (goTo('__mainMenu__') dentro engine.js).
        document.getElementById('btn-main-menu').onclick = () => showScreen('screen-main');
        document.getElementById('btn-audio').onclick = toggleAudio;
        document.getElementById('btn-fullscreen').onclick = toggleFullscreen;
        document.getElementById('btn-options-back').onclick = () => showScreen(Engine.isInGame() ? 'screen-game' : 'screen-main');
        document.getElementById('btn-save-cancel').onclick = () => showScreen(Engine.isInGame() ? 'screen-game' : 'screen-main');
        document.getElementById('range-brightness').oninput = saveDisplayPrefs;
        document.getElementById('range-hue').oninput = saveDisplayPrefs;
        document.getElementById('btn-reset-display').onclick = resetDisplayPrefs;
        loadDisplayPrefs();
        document.querySelectorAll('.modal-close').forEach(b => b.onclick = closeModals);
    }

    return { applyTheme, applyThemeOverride, showScreen, showMainMenu, renderNode, notify, init };
})();
