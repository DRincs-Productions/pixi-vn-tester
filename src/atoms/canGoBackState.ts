import { selector } from "recoil";
import { GameStepManager } from "../pixi-vn/src";
import { reloadInterfaceDataEventAtom } from "./reloadInterfaceDataEventAtom";

export const canGoBackState = selector<boolean>({
    key: 'canGoBackState',
    get: ({ get }) => {
        // dipendencies: when the dipendencies change, the selector will re-run
        get(reloadInterfaceDataEventAtom)

        return GameStepManager.canGoBack
    },
});
