export const QuestSystem = {
    dailyTemplates: [
        { id: 1, title: "Deep Work: Coding", stat: "Intelligence", baseXp: 250, rarity: "Normal" },
        { id: 2, title: "Mountain Ruck March", stat: "Stamina", baseXp: 500, rarity: "Rare" },
        { id: 3, title: "Advanced Tactics Study", stat: "Insight", baseXp: 300, rarity: "Epic" }
    ],

    generateQuest() {
        return this.dailyTemplates[Math.floor(Math.random() * this.dailyTemplates.length)];
    }
};