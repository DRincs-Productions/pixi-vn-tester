import { getSaveData, loadSaveData } from "@drincs/pixi-vn";
import SaveData from "../models/SaveData";

export function getSave(): SaveData {
    return {
        saveData: getSaveData(),
        gameVersion: __APP_VERSION__
    }
}

export async function loadSave(saveData: SaveData, navigate: (path: string) => void) {
    navigate("/loading")
    // load the save data from the JSON string
    await loadSaveData(saveData.saveData, navigate)
}

async function addSaveIntoIndexDBInternal(
    id: string,
    data: SaveData,
    db: IDBDatabase,
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
): Promise<void> {
    let transaction = db.transaction(["rescues"], "readwrite");
    let objectStore = transaction.objectStore("rescues");
    let setRequest = objectStore.add(data, id)
    setRequest.onsuccess = function (_event) {
        resolve()
    }
    setRequest.onerror = function (event) {
        console.error("Error adding save data to indexDB", event)
        reject()
    }
}

async function addSaveIntoIndexDB(id: string, data: SaveData): Promise<void> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("game");
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
            // run onupgradeneeded before onsuccess
            if (!db.objectStoreNames.contains("rescues")) {
                // create the object store
                let objectStore = db.createObjectStore("rescues");
                objectStore.createIndex("id", "id", { unique: true });
            }
            addSaveIntoIndexDBInternal(id, data, db, resolve, reject)
        };
        request.onerror = function (event) {
            console.error("Error adding save data to indexDB", event)
        }
    })
}

async function getSaveFromIndexDB(id: string): Promise<SaveData | null> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("game");
        request.onsuccess = function (_event) {
            let db = request.result;
            // check if the object store exists
            if (!db.objectStoreNames.contains("rescues")) {
                resolve(null)
                return
            }
            let transaction = db.transaction(["rescues"], "readwrite");
            let objectStore = transaction.objectStore("rescues");
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

async function deleteSaveFromIndexDB(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("game");
        request.onsuccess = function (_event) {
            let db = request.result;
            let transaction = db.transaction(["rescues"], "readwrite");
            let objectStore = transaction.objectStore("rescues");
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

export function saveGame() {
    let data = getSave()
    const jsonString = JSON.stringify(data);
    // download the save data as a JSON file
    const blob = new Blob([jsonString], { type: "application/json" });
    // download the file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "save.json";
    a.click();
}

export function loadGameSave(navigate: (path: string) => void, afterLoad?: () => void) {
    // load the save data from a JSON file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonString = e.target?.result as string;
                navigate("/loading")
                let data: SaveData = JSON.parse(jsonString)
                // load the save data from the JSON string
                loadSave(data, navigate)
                    .then(() => {
                        afterLoad && afterLoad();
                    }).catch(() => {
                        navigate("/game")
                    })
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

export async function setQuickSave(data: SaveData | null) {
    if (!data) {
        await deleteSaveFromIndexDB("quick_save")
        return
    }
    await addSaveIntoIndexDB("quick_save", data)
}

export async function getQuickSave() {
    return await getSaveFromIndexDB("quick_save")
}

export async function addRefreshSave() {
    const data = getSave()
    let jsonString = JSON.stringify(data);
    if (jsonString) {
        localStorage.setItem("refresh_save", jsonString)
    }
}

export async function loadRefreshSave(navigate: (path: string) => void) {
    const jsonString = localStorage.getItem("refresh_save")
    if (jsonString) {
        navigate("/loading")
        let data: SaveData = JSON.parse(jsonString)
        return loadSave(data, navigate)
            .then(() => {
                localStorage.removeItem("refreshSave")
            })
            .catch(() => {
                navigate("/")
            })
    }
    else {
        navigate("/")
    }
}
