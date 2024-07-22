import { ChoiceMenuOptionsType, getChoiceMenuOptions } from "@drincs/pixi-vn";
import { selector } from "recoil";
import { hideInterfaceState } from "./hideInterfaceState";
import { reloadInterfaceDataEventState } from "./reloadInterfaceDataEventState";

type ChoiceMenu = {
    menu: ChoiceMenuOptionsType,
    hidden: boolean,
}

export const choiceMenuState = selector<ChoiceMenu>({
    key: 'choiceMenuState',
    get: ({ get }) => {
        let choiceMenu = getChoiceMenuOptions() || []
        get(reloadInterfaceDataEventState)
        let hideInterface = get(hideInterfaceState)
        return {
            menu: choiceMenu,
            hidden: hideInterface || !choiceMenu || choiceMenu.length == 0
        }
    },
});
