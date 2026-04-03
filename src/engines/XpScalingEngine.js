export const XpScalingEngine = {
    baseXp: 1000,
    growthFactor: 1.5,

    // Returns the threshold needed to reach the next level
    // Formula: $$XP_{req} = 1000 \cdot Level^{1.5}$$
    getXpRequired(level) {
        return Math.floor(this.baseXp * Math.pow(level, this.growthFactor));
    }
};