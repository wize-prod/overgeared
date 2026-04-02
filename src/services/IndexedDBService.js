const DB_NAME = 'Overgeared_DB';
const STORE_NAME = 'GameState';

export const IndexedDBService = {
    async save(key, data) {
        const db = await this.open();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, key);
        return tx.complete;
    },
    async open() {
        return new Promise((resolve) => {
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
            req.onsuccess = () => resolve(req.result);
        });
    }
};