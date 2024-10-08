const INDEXED_DB_VERSION = 2;
const INDEXED_DB_NAME = "game_db";

export function initializeIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        // check if the object store exists
        request.onupgradeneeded = function (_event) {
            let db = request.result;
            if (!db.objectStoreNames.contains("rescues")) {
                // create the object store
                let objectStore = db.createObjectStore("rescues", { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex("id", "id", { unique: true });
            }
            if (!db.objectStoreNames.contains("special_rescues")) {
                // create the object store
                let objectStore = db.createObjectStore("special_rescues", { keyPath: 'id', autoIncrement: false });
                objectStore.createIndex("id", "id", { unique: true });
            }
        }

        request.onsuccess = function (_event) {
            resolve()
        };
        request.onerror = function (event) {
            console.error("Error opening indexDB", event)
            reject()
        }
    })
}

export async function putRowIntoIndexDB<T extends {}>(tableName: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(INDEXED_DB_NAME);

        request.onsuccess = function (_event) {
            let db = request.result;
            // run onupgradeneeded before onsuccess
            if (!db.objectStoreNames.contains(tableName)) {
                console.error("Object store rescues does not exist")
                reject()
            }
            let transaction = db.transaction([tableName], "readwrite");
            let objectStore = transaction.objectStore(tableName);
            let setRequest = objectStore.put(data)
            setRequest.onsuccess = function (_event) {
                resolve()
            }
            setRequest.onerror = function (event) {
                console.error("Error adding save data to indexDB", event)
                reject()
            }
        };
        request.onerror = function (event) {
            console.error("Error adding save data to indexDB", event)
        }
    })
}

export async function getRowFromIndexDB<T extends {}>(tableName: string, id: any): Promise<T | null> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(INDEXED_DB_NAME);
        request.onsuccess = function (_event) {
            let db = request.result;
            // check if the object store exists
            if (!db.objectStoreNames.contains(tableName)) {
                resolve(null)
                return
            }
            let transaction = db.transaction([tableName], "readwrite");
            let objectStore = transaction.objectStore(tableName);
            let getRequest = objectStore.get(id);
            getRequest.onsuccess = function (_event) {
                resolve(getRequest.result)
            }
            getRequest.onerror = function (event) {
                console.error("Error getting save data from indexDB", event)
                reject()
            }
        };
        request.onerror = function (event) {
            console.error("Error opening indexDB", event)
            reject()
        }
    })
}

export async function deleteRowFromIndexDB(tableName: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(INDEXED_DB_NAME);
        request.onsuccess = function (_event) {
            let db = request.result;
            let transaction = db.transaction([tableName], "readwrite");
            let objectStore = transaction.objectStore(tableName);
            let deleteRequest = objectStore.delete(id);
            deleteRequest.onsuccess = function (_event) {
                resolve()
            }
            deleteRequest.onerror = function (event) {
                console.error("Error deleting save data from indexDB", event)
                reject()
            }
        };
        request.onerror = function (event) {
            console.error("Error deleting save data from indexDB", event)
        }
    })
}
