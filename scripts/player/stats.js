import { IndexedDBService } from '../../src/services/IndexedDBService.js';
import { XpScalingEngine } from '../../src/engines/XpScalingEngine.js';

// Default values for a new player
const INITIAL_STATS = {
    Strength: 10,
    Stamina: 10,
    Agility: 10,
    Intelligence: 10,
    Dignity: 1,
    Insight: 1
};

export const StatManager = {
    /**
     * Adds XP to the player and handles leveling.
     * @param {string} statName - The name of the stat to increase (e.g., 'Strength')
     * @param {number} amount - The amount of XP gained
     */
    async addXp(statName, amount) {
        // 1. Fetch current data from Persistence (saved data)
        let stats = await IndexedDBService.load('current_stats') || { ...INITIAL_STATS };
        let playerXp = await IndexedDBService.load('player_xp') || 0;
        let level = await IndexedDBService.load('player_level') || 1;

        // 2. Apply gains
        // We use a 10:1 ratio for Stat growth: 100 XP gained = +10 to the specific Stat.
        playerXp += amount;
        stats[statName] += Math.floor(amount / 10);

        // 3. Check for Level Up using the Scaling Engine formula:
        // $$XP_{required} = 1000 \cdot Level^{1.5}$$
        const xpRequired = XpScalingEngine.getXpRequired(level);
        
        if (playerXp >= xpRequired) {
            level++;
            console.log(`%c [LEVEL UP] You have reached Level ${level}!`, 'color: #ffff00; font-weight: bold;');
            // Optional: Reset XP or keep it for the next level
        }

        // 4. Save the "Persistent" state back to the device
        await IndexedDBService.save('current_stats', stats);
        await IndexedDBService.save('player_xp', playerXp);
        await IndexedDBService.save('player_level', level);
        
        return { stats, level };
    }
};