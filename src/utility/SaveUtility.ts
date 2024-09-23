import { getSaveData, ISaveData, loadSaveData } from "@drincs/pixi-vn";

type SaveData = {
    saveData: ISaveData
    gameVersion: string
}

export function getSave(): string {
    let obj: SaveData = {
        saveData: getSaveData(),
        gameVersion: __APP_VERSION__
    }
    return JSON.stringify(obj)
}

export async function loadSave(saveData: string, navigate: (path: string) => void) {
    const pixiVNSave = (JSON.parse(saveData) as SaveData).saveData
    navigate("/loading")
    // load the save data from the JSON string
    await loadSaveData(pixiVNSave, navigate)
}

export function saveGame() {
    const jsonString = getSave()
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
                // load the save data from the JSON string
                loadSave(jsonString, navigate)
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

export async function loadQuickSave(data: string | null, navigate: (path: string) => void) {
    if (data) {
        navigate("/loading")
        return loadSave(data, navigate)
            .catch(() => {
                navigate("/game")
            })
    }
}

export function addRefreshSave() {
    const jsonString = getSave()
    if (jsonString) {
        localStorage.setItem("refreshSave", jsonString)
    }
}

export async function loadRefreshSave(navigate: (path: string) => void) {
    const jsonString = localStorage.getItem("refreshSave")
    if (jsonString) {
        navigate("/loading")
        return loadSave(jsonString, navigate)
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
