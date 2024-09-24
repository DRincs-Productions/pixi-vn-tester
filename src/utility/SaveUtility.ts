import { getSaveData, loadSaveData } from "@drincs/pixi-vn";
import SaveData from "../models/SaveData";
import { deleteRowFromIndexDB, getRowFromIndexDB, putRowIntoIndexDB } from "./IndexDBUtility";

export function getSave(): SaveData {
    return {
        saveData: getSaveData(),
        gameVersion: __APP_VERSION__,
        date: new Date(),
        name: "",
    }
}

export async function loadSave(saveData: SaveData, navigate: (path: string) => void) {
    navigate("/loading")
    // load the save data from the JSON string
    await loadSaveData(saveData.saveData, navigate)
}

async function putSpecialSaveIntoIndexDB(data: SaveData & { id: string }): Promise<void> {
    return await putRowIntoIndexDB("special_rescues", data)
}

async function getSpecialSaveFromIndexDB(id: string): Promise<SaveData & { id: string } | null> {
    return await getRowFromIndexDB("special_rescues", id)
}

async function deleteSpecialSaveFromIndexDB(id: string): Promise<void> {
    return await deleteRowFromIndexDB("special_rescues", id)
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
        await deleteSpecialSaveFromIndexDB("quick_save")
        return
    }
    await putSpecialSaveIntoIndexDB({
        ...data,
        id: "quick_save"
    })
}

export async function getQuickSave() {
    return await getSpecialSaveFromIndexDB("quick_save")
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
