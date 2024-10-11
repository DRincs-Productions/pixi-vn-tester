import { atom, selector } from "recoil";
import GameSaveData from "../models/GameSaveData";
import { getLastSaveFromIndexDB } from "../utilities/save-utility";

const lastSaveAtomState = atom<GameSaveData & { id: number } | null>({
    key: 'lastSaveAtomState',
    default: null,
});

export const lastSaveState = selector<GameSaveData & { id: number } | null>({
    key: 'lastSaveState',
    get: async ({ get }) => {
        let atomData = get(lastSaveAtomState)
        if (atomData !== null) {
            return atomData
        }
        return await getLastSaveFromIndexDB()
    },
    set: ({ set }, value) => {
        set(lastSaveAtomState, value)
    },
});
