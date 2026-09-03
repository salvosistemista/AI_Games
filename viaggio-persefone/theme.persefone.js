/* ============================================================
   THEME — "L'Ultimo Viaggio del Persefone"
   ------------------------------------------------------------
   Identità visiva dell'avventura: colori, font, titolo. Fissa,
   uguale per tutti i giocatori (le variazioni per scena restano
   nei singoli nodi di story.persefone.js tramite il campo
   `theme`, che sovrascrive solo colori/font sopra questo base).
   ============================================================ */

const THEME = {
    // Ciano ghiacciato invece del verde terminale: l'idea è una lampada
    // da nave vista attraverso il fiato condensato sul vetro.
    colorMain: '#6fd3e6',
    colorDim: '#2f6d7a',
    colorBg: '#03080a',
    font: "'Courier New', Courier, monospace",

    title: "L'Ultimo Viaggio del Persefone",
    titleHtml: "L'ULTIMO VIAGGIO<br>DEL PERSEFONE",

    versionTag: 'v0.1 — Atti I-V'
};
