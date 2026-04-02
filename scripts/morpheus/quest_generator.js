export const QuestSystem = {
    // Defines common quest types based on your goals
    dailyTemplates: [
        { id: 'coding_session', title: 'Blacksmithing Practice', stat: 'Dexterity', baseXp: 100, rarity: 'Normal' },
        { id: 'fitness_trail', title: 'Mountain Patrol', stat: 'Stamina', baseXp: 150, rarity: 'Rare' },
        { id: 'study_block', title: 'Library Research', stat: 'Intelligence', baseXp: 120, rarity: 'Normal' }
    ],

    generateDaily() {
        // This picks a random template to present as your 'Daily Quest'
        const index = Math.floor(Math.random() * this.dailyTemplates.length);
        return this.dailyTemplates[index];
    }
};