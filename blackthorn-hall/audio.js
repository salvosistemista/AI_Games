/* ============================================================
   AUDIO DI GIOCO
   ------------------------------------------------------------
   Tre livelli:
   - uiBeep(...)      suoni brevi di interfaccia (click, notifiche) - sempre sintetizzati
   - playSfx(nome)     effetti sonori nominati, definiti in story.sfx - sintetizzati
   - playTrack(id)     musica di sottofondo, definita in story.music
                        - sintetizzata (campo 'notes') oppure
                        - file esterno .ogg/.mp3/... (campo 'src')
   ============================================================ */

const GameAudio = (() => {
    let audioCtx = null;
    let soundEnabled = true;      // sonoro attivo di default
    let activeTrackId = null;     // traccia "logicamente" in corso (persiste col mute)
    let musicToken = 0;           // invalida i loop sintetizzati quando cambia traccia/mute
    let fileAudioEl = null;       // elemento <audio> riusato per le tracce da file

    function ensureCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return false; }
        }
        return true;
    }

    // ---------------- BEEP DI INTERFACCIA ----------------
    function uiBeep(freq = 440, type = 'square', duration = 0.05) {
        if (!soundEnabled || !ensureCtx()) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = 0.05;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // ---------------- EFFETTI SONORI NOMINATI ----------------
    // story.sfx = { nome: [ {freq, dur, type, volume}, ... ] }  (sequenza, non loop)
    function playSfx(name) {
        if (!soundEnabled || !ensureCtx()) return;
        const seq = (Engine.getStory().sfx || {})[name];
        if (!seq) { console.warn('SFX non definito nella storia:', name); return; }
        let t = audioCtx.currentTime + 0.02;
        seq.forEach(step => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = step.type || 'square';
            osc.frequency.value = step.freq;
            gain.gain.value = step.volume ?? 0.06;
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + (step.dur || 0.08));
            t += (step.dur || 0.08);
        });
    }

    // ---------------- MUSICA DI SOTTOFONDO (SINTETIZZATA) ----------------
    // story.music = { id: { wave, volume, loop, notes:[{freq,dur}, ...] } }
    function scheduleLoop(track, token) {
        if (!soundEnabled || token !== musicToken || !ensureCtx()) return;
        const vol = track.volume ?? 0.025;
        let t = audioCtx.currentTime + 0.05;
        let totalDur = 0;
        track.notes.forEach(n => {
            if (n.freq) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = track.wave || 'triangle';
                osc.frequency.value = n.freq;
                gain.gain.value = vol;
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(t);
                osc.stop(t + n.dur);
            }
            t += n.dur;
            totalDur += n.dur;
        });
        if (track.loop !== false) {
            setTimeout(() => {
                if (token === musicToken) scheduleLoop(track, token);
            }, totalDur * 1000);
        }
    }

    // ---------------- MUSICA DI SOTTOFONDO (FILE ESTERNO) ----------------
    // story.music = { id: { src: "musiche/tema.ogg", volume, loop } }
    // 'src' accetta sia un percorso relativo (file da distribuire insieme
    // all'HTML) sia una data URI ("data:audio/ogg;base64,...") per restare
    // completamente self-contained in un unico file.
    function stopFileTrack() {
        if (fileAudioEl) fileAudioEl.pause();
    }

    function playFileTrack(track) {
        if (!fileAudioEl) fileAudioEl = new Audio();
        fileAudioEl.src = track.src;
        fileAudioEl.loop = track.loop !== false;
        fileAudioEl.volume = track.volume ?? 0.5;
        if (soundEnabled) {
            fileAudioEl.currentTime = 0;
            fileAudioEl.play().catch(() => { /* verra' ritentato al prossimo toggle sonoro */ });
        }
    }

    // trackId: chiave in story.music. null/undefined ferma la musica.
    // Se e' gia' la traccia attiva non riparte da capo (evita scatti tra nodi vicini).
    function playTrack(trackId) {
        if (trackId === activeTrackId) return;
        activeTrackId = trackId;
        musicToken++;       // ferma qualunque loop sintetizzato in corso
        stopFileTrack();    // ferma qualunque file in riproduzione
        if (!trackId) return;
        const track = (Engine.getStory().music || {})[trackId];
        if (!track) { console.warn('Traccia musicale non definita:', trackId); return; }
        if (track.src) playFileTrack(track);
        else scheduleLoop(track, musicToken);
    }

    function stopTrack() { playTrack(null); }

    // Pausa/ripresa: a differenza di stopTrack(), NON dimenticano quale
    // traccia era attiva — servono per "torna al menu senza abbandonare
    // la partita" (vedi ui.js, pulsante Menu Principale / Continua Partita).
    function pause() {
        musicToken++;            // ferma il loop sintetizzato schedulato
        if (fileAudioEl) fileAudioEl.pause();
    }

    function resume() {
        if (!activeTrackId || !soundEnabled) return;
        const track = (Engine.getStory().music || {})[activeTrackId];
        if (!track) return;
        if (track.src) {
            fileAudioEl && fileAudioEl.play().catch(() => {});
        } else {
            musicToken++;
            scheduleLoop(track, musicToken);
        }
    }

    // ---------------- ON/OFF GENERALE ----------------
    function toggle() {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            uiBeep(880, 'square', 0.1);
            const track = activeTrackId ? (Engine.getStory().music || {})[activeTrackId] : null;
            if (track) {
                if (track.src) {
                    fileAudioEl && fileAudioEl.play().catch(() => {});
                } else {
                    musicToken++;
                    scheduleLoop(track, musicToken);
                }
            }
        } else {
            musicToken++;    // ferma qualunque loop sintetizzato schedulato
            stopFileTrack();
        }
        return soundEnabled;
    }

    function isEnabled() { return soundEnabled; }

    return { uiBeep, playSfx, playTrack, stopTrack, pause, resume, toggle, isEnabled };
})();
