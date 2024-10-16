import { ISaveData as PiviVNSaveData } from "../pixi-vn/src"

export default interface GameSaveData {
    saveData: PiviVNSaveData
    gameVersion: string
    date: Date
    name: string
    image?: string
}
