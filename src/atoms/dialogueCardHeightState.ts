import { atom, selector } from "recoil";

const dialogueCardHeightAtomState = atom<number>({
    key: 'dialogueCardHeightAtomState',
    default: 30,
});

export const dialogueCardHeightState = selector<number>({
    key: 'dialogueCardHeightState',
    get: ({ get }) => {
        let value = localStorage.getItem("dialogue_card_height")
        try {
            if (value) {
                return parseInt(value)
            }
        } catch (_) { }
        return get(dialogueCardHeightAtomState)
    },
    set: ({ set }, value) => {
        if (typeof value === "string") {
            localStorage.setItem("dialogue_card_height", value)
        }
        else {
            localStorage.removeItem("dialogue_card_height")
        }
        set(dialogueCardHeightAtomState, value)
    },
});
