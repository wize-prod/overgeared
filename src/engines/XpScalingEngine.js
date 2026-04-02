export const XpScalingEngine = {
    baseXp: 1000,
    growthFactor: 1.5,

    // Calculates how much total XP is needed for a specific level
    getXpRequired(level) {
        return Math.floor(this.baseXp * Math.pow(level, this.growthFactor));
    },

    // Determines if a player levels up after gaining XP
    checkLevelUp(currentXp, currentLevel) {
        const required = this.getXpRequired(currentLevel);
        return currentXp >= required;
    }
};