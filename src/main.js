import { IndexedDBService } from './services/IndexedDBService.js';

const INITIAL_STATS = {
    Strength: 10,
    Stamina: 10,
    Agility: 10,
    Intelligence: 10,
    Dignity: 1,
    Insight: 1
};

async function syncDashboard() {
    // 1. Try to load stats from the database
    let playerStats = await IndexedDBService.load('current_stats');

    // 2. If no stats exist (First time playing), save the defaults
    if (!playerStats) {
        playerStats = INITIAL_STATS;
        await IndexedDBService.save('current_stats', playerStats);
    }

    // 3. Update the DOM (Visual UI)
    const statPanel = document.getElementById('stat-panel');
    statPanel.innerHTML = '<h3>Player Attributes</h3>';

    for (const [stat, value] of Object.entries(playerStats)) {
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `<span>${stat}</span><span style="color:var(--gold-accent)">${value}</span>`;
        statPanel.appendChild(row);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        await IndexedDBService.init();
        await syncDashboard();
        document.getElementById('quest-log').innerText = "Morpheus: System stable. Scanning for habits...";
    } catch (e) {
        console.error("Morpheus initialization failed:", e);
    }
});