const INDEXED_DB_VERSION = 1;

export function initializeIndexedDB() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("game", INDEXED_DB_VERSION);
        // check if the object store exists
        request.onupgradeneeded = function (_event) {
            let db = request.result;
            if (!db.objectStoreNames.contains("rescues")) {
                // create the object store
                let objectStore = db.createObjectStore("rescues", { keyPath: 'id' });
                objectStore.createIndex("id", "id", { unique: true });
            }
        }

        request.onsuccess = function (_event) {
            let db = request.result;
            resolve(db)
        };
        request.onerror = function (event) {
            console.error("Error opening indexDB", event)
            reject()
        }
    })
}
