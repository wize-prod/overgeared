import { StatManager } from '../player/stats.js';

export const xMenuController = {
    // Renders the quest UI on the screen
    renderQuest(quest) {
        const container = document.getElementById('quest-log');
        container.innerHTML = `
            <div class="quest-card rarity-${quest.rarity.toLowerCase()}">
                <h4>${quest.title}</h4>
                <p>Reward: ${quest.baseXp} XP in ${quest.stat}</p>
                <button id="complete-task-btn">Complete Task</button>
            </div>
        `;
        
        document.getElementById('complete-task-btn').onclick = () => this.handleCompletion(quest);
    },

    // Handles logic when the user clicks 'Complete'
    async handleCompletion(quest) {
        const { stats, level } = await StatManager.addXp(quest.stat, quest.baseXp);
        
        document.getElementById('level-display').innerText = `Lv. ${level}`;
        alert(`Success! ${quest.title} completed. +${quest.baseXp} XP`);
        
        location.reload(); 
    }
};