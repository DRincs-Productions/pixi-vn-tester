import { atom, selector } from "recoil";
import GameSaveData from "../models/GameSaveData";
import { getQuickSave } from "../utilities/save-utility";

const quickSaveAtomState = atom<GameSaveData | null>({
    key: 'quickSaveAtomState',
    default: null,
});

export const quickSaveState = selector<GameSaveData | null>({
    key: 'quickSaveState',
    get: async ({ get }) => {
        let atomData = get(quickSaveAtomState)
        if (atomData !== null) {
            return atomData
        }
        return await getQuickSave()
    },
    set: ({ set }, value) => {
        set(quickSaveAtomState, value)
    },
});
