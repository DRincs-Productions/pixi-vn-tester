import { selector } from "recoil";
import { ChoiceMenuOptionsType, getChoiceMenuOptions } from "../pixi-vn/src";
import { hideInterfaceState } from "./hideInterfaceState";
import { reloadInterfaceDataEventState } from "./reloadInterfaceDataEventState";

type ChoiceMenu = {
    menu: ChoiceMenuOptionsType,
    hidden: boolean,
}

export const choiceMenuState = selector<ChoiceMenu>({
    key: 'choiceMenuState',
    get: ({ get }) => {
        // dipendencies: when the dipendencies change, the selector will re-run
        get(reloadInterfaceDataEventState)
        let hideInterface = get(hideInterfaceState)

        let choiceMenu = getChoiceMenuOptions() || []
        return {
            menu: choiceMenu,
            hidden: hideInterface || !choiceMenu || choiceMenu.length == 0
        }
    },
});
