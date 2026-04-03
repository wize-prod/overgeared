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
});import { IndexedDBService } from './services/IndexedDBService.js';
import { xMenuController } from '../scripts/ui/xMenu_controller.js';
import { QuestSystem } from '../scripts/morpheus/quest_generator.js';

async function initGame() {
    console.log("Morpheus: Starting synchronization...");
    
    try {
        // 1. Initialize the Database
        await IndexedDBService.init();

        // 2. Load Stats (The Spreadsheet Data)
        const stats = await IndexedDBService.load('current_stats') || {
            Strength: 10, Stamina: 10, Agility: 10, Intelligence: 10, Dignity: 1, Insight: 1
        };

        const statPanel = document.getElementById('stat-panel');
        statPanel.innerHTML = '<h3>Attributes</h3>';
        for (const [name, val] of Object.entries(stats)) {
            const row = document.createElement('div');
            row.className = 'stat-row';
            row.innerHTML = `<span>${name}</span><span style="color:var(--gold-accent)">${val}</span>`;
            statPanel.appendChild(row);
        }

        // 3. Generate and Render Quest (The RPG Layer)
        const currentQuest = QuestSystem.generateQuest();
        xMenuController.renderQuest(currentQuest);

        console.log("Synchronization Complete. Welcome, Parris.");
    } catch (error) {
        console.error("CRITICAL: Synchronization Failed.", error);
    }
}

window.addEventListener('DOMContentLoaded', initGame);