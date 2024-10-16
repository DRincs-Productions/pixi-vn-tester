import { clearAllGameDatas, narration } from "../pixi-vn/src";

export async function goBack(navigate: (path: string) => void) {
    await narration.goBack(navigate)
}

export function gameEnd(navigate: (path: string) => void) {
    clearAllGameDatas()
    navigate('/')
}
