import { GameStepManager } from "@drincs/pixi-vn";
import { atom, selector } from "recoil";
import { reloadInterfaceDataEventState } from "./reloadInterfaceDataEventState";

const canGoBackAtomState = atom<boolean>({
    key: 'canGoBackAtomState',
    default: false,
});

export const canGoBackState = selector<boolean>({
    key: 'canGoBackState',
    get: ({ get }) => {
        get(reloadInterfaceDataEventState)
        get(canGoBackAtomState)
        return GameStepManager.canGoBack
    },
    set: ({ set }) => {
        set(canGoBackAtomState, GameStepManager.canGoBack)
    },
});
