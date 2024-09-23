import { narration } from "@drincs/pixi-vn";
import { selector } from "recoil";
import { reloadInterfaceDataEventAtom } from "./reloadInterfaceDataEventAtom";
import { typewriterIsAnimatedState } from "./typewriterIsAnimatedState";

type InputOptionsType = {
    open: boolean
    type?: string
    currentValue: any
}

export const inputOptionsState = selector<InputOptionsType>({
    key: 'inputOptionsState',
    get: ({ get }) => {
        // dipendencies: when the dipendencies change, the selector will re-run
        get(reloadInterfaceDataEventAtom)
        let typewriterIsAnimated = get(typewriterIsAnimatedState)

        return {
            open: !typewriterIsAnimated && narration.isRequiredInput,
            type: narration.inputType,
            currentValue: narration.inputValue,
        }
    },
    set: ({ set }, newValue) => {
        if ('currentValue' in newValue) {
            narration.inputValue = newValue.currentValue
        }
        set(reloadInterfaceDataEventAtom, (prev) => prev + 1)
    }
});
