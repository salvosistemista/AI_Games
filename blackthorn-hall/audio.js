/* ============================================================
   AUDIO DI GIOCO
   ------------------------------------------------------------
   Due categorie indipendenti, ciascuna con attivazione e volume
   propri (default: entrambe attive, volume 80%):
   - musica di sottofondo (playTrack/stopTrack/pause/resume)
   - effetti sonori, incluso il feedback di interfaccia (uiBeep/playSfx)
   ============================================================ */

const GameAudio = (() => {
    let audioCtx = null;
    let musicEnabled = true;
    let sfxEnabled = true;
    let musicVolume = 0.8;   // 0-1
    let sfxVolume = 0.8;     // 0-1
    let activeTrackId = null; // traccia "logicamente" in corso (persiste col mute)
    let musicToken = 0;       // invalida i loop sintetizzati quando cambia traccia/mute
    let fileAudioEl = null;   // elemento <audio> riusato per le tracce da file

    function ensureCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return false; }
        }
        return true;
    }

    // ---------------- BEEP DI INTERFACCIA (categoria: effetti sonori) ----------------
    function uiBeep(freq = 440, type = 'square', duration = 0.05) {
        if (!sfxEnabled || !ensureCtx()) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = 0.05 * sfxVolume;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // ---------------- EFFETTI SONORI NOMINATI ----------------
    // story.sfx = { nome: [ {freq, dur, type, volume}, ... ] }  (sequenza, non loop)
    function playSfx(name) {
        if (!sfxEnabled || !ensureCtx()) return;
        const seq = (Engine.getStory().sfx || {})[name];
        if (!seq) { console.warn('SFX non definito nella storia:', name); return; }
        let t = audioCtx.currentTime + 0.02;
        seq.forEach(step => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = step.type || 'square';
            osc.frequency.value = step.freq;
            gain.gain.value = (step.volume ?? 0.06) * sfxVolume;
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
        if (!musicEnabled || token !== musicToken || !ensureCtx()) return;
        const vol = (track.volume ?? 0.025) * musicVolume;
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
    function stopFileTrack() {
        if (fileAudioEl) fileAudioEl.pause();
    }

    function playFileTrack(track) {
        if (!fileAudioEl) fileAudioEl = new Audio();
        fileAudioEl.src = track.src;
        fileAudioEl.loop = track.loop !== false;
        fileAudioEl.volume = (track.volume ?? 0.5) * musicVolume;
        if (musicEnabled) {
            fileAudioEl.currentTime = 0;
            fileAudioEl.play().catch(() => { /* verra' ritentato al prossimo toggle musica */ });
        }
    }

    // trackId: chiave in story.music. null/undefined ferma la musica.
    // Se e' gia' la traccia attiva non riparte da capo (evita scatti tra nodi vicini).
    function playTrack(trackId) {
        if (trackId === activeTrackId) return;
        activeTrackId = trackId;
        musicToken++;
        stopFileTrack();
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
        musicToken++;
        if (fileAudioEl) fileAudioEl.pause();
    }

    function resume() {
        if (!activeTrackId || !musicEnabled) return;
        const track = (Engine.getStory().music || {})[activeTrackId];
        if (!track) return;
        if (track.src) {
            fileAudioEl && fileAudioEl.play().catch(() => {});
        } else {
            musicToken++;
            scheduleLoop(track, musicToken);
        }
    }

    function resumeActiveTrackPlayback() {
        const track = activeTrackId ? (Engine.getStory().music || {})[activeTrackId] : null;
        if (!track) return;
        if (track.src) { fileAudioEl && fileAudioEl.play().catch(() => {}); }
        else { musicToken++; scheduleLoop(track, musicToken); }
    }

    // ---------------- ON/OFF E VOLUME, PER CATEGORIA ----------------
    function setMusicEnabled(enabled) {
        if (enabled === musicEnabled) return;
        musicEnabled = enabled;
        if (musicEnabled) resumeActiveTrackPlayback();
        else { musicToken++; stopFileTrack(); }
    }

    function setSfxEnabled(enabled) { sfxEnabled = enabled; }

    function setMusicVolume(v) {
        musicVolume = Math.max(0, Math.min(1, v));
        if (fileAudioEl && activeTrackId) {
            const track = (Engine.getStory().music || {})[activeTrackId];
            if (track && track.src) fileAudioEl.volume = (track.volume ?? 0.5) * musicVolume;
        }
        // per le tracce sintetizzate il nuovo volume si applica dal prossimo giro di loop
    }

    function setSfxVolume(v) { sfxVolume = Math.max(0, Math.min(1, v)); }

    function isMusicEnabled() { return musicEnabled; }
    function isSfxEnabled() { return sfxEnabled; }
    function getMusicVolume() { return musicVolume; }
    function getSfxVolume() { return sfxVolume; }

    return {
        uiBeep, playSfx, playTrack, stopTrack, pause, resume,
        setMusicEnabled, setSfxEnabled, setMusicVolume, setSfxVolume,
        isMusicEnabled, isSfxEnabled, getMusicVolume, getSfxVolume
    };
})();
