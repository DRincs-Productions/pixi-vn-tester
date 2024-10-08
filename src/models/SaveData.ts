import { ISaveData as PiviVNSaveData } from "@drincs/pixi-vn"

export default interface SaveData {
    saveData: PiviVNSaveData
    gameVersion: string
    date: Date
    name: string
    image?: string
}
