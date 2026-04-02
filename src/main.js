import { IndexedDBService } from './services/IndexedDBService.js';

async function loadGameData() {
    // Fetching our 'Spreadsheet' definitions
    const statResponse = await fetch('/data/stat_definitions.json');
    const stats = await statResponse.json();

    const statPanel = document.getElementById('stat-panel');
    statPanel.innerHTML = '<h3>Basic Stats</h3>';

    // Loop through the JSON data and create HTML elements for each stat
    Object.keys(stats.basic_stats).forEach(statName => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `<span>${statName}</span> <span>10</span>`; // Default value is 10
        statPanel.appendChild(div);
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    await IndexedDBService.init();
    await loadGameData();
    document.getElementById('quest-log').innerText = "Morpheus: Awaiting new habits...";
});