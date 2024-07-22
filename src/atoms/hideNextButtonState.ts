import { GameStepManager } from "@drincs/pixi-vn";
import { atom, selector } from "recoil";
import { hideInterfaceState } from "./hideInterfaceState";
import { reloadInterfaceDataEventState } from "./reloadInterfaceDataEventState";

const hideNextButtonAtomState = atom<boolean>({
    key: 'hideNextButtonAtomState',
    default: false,
});

export const hideNextButtonState = selector<boolean>({
    key: 'hideNextButtonState',
    get: ({ get }) => {
        // dipendencies: when the dipendencies change, the selector will re-run
        let hideInterface = get(hideInterfaceState)
        get(reloadInterfaceDataEventState)

        return hideInterface || !(GameStepManager.canGoNext)
    },
    set: ({ set }, value) => {
        set(hideNextButtonAtomState, value)
    },
});
