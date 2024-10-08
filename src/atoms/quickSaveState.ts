import { atom, selector } from "recoil";
import SaveData from "../models/SaveData";
import { getQuickSave } from "../utility/saveUtility";

const quickSaveAtomState = atom<SaveData | null>({
    key: 'quickSaveAtomState',
    default: null,
});

export const quickSaveState = selector<SaveData | null>({
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
