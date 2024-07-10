import { atom } from "recoil";
import { ChoiceMenuOptionsType } from "../pixi-vn/src";

export const choiceMenuState = atom<{
    menu: ChoiceMenuOptionsType,
    hidden: boolean,
}>({
    key: 'choiceMenuState',
    default: {
        menu: [],
        hidden: true,
    },
});
