import { IndexedDBService } from '../../src/services/IndexedDBService.js';
import { XpScalingEngine } from '../../src/engines/XpScalingEngine.js';

export const StatManager = {
    async addXp(statName, amount) {
        let stats = await IndexedDBService.load('current_stats');
        let playerXp = await IndexedDBService.load('player_xp') || 0;
        let level = await IndexedDBService.load('player_level') || 1;

        // Apply XP and check for level-up using LaTeX math scaling
        playerXp += amount;
        stats[statName] += Math.floor(amount / 10);

        const xpRequired = XpScalingEngine.getXpRequired(level);
        if (playerXp >= xpRequired) {
            level++;
            console.log(`Level Up! You are now Level ${level}`);
        }

        // Save updated data
        await IndexedDBService.save('current_stats', stats);
        await IndexedDBService.save('player_xp', playerXp);
        await IndexedDBService.save('player_level', level);
        
        return { stats, level };
    }
};