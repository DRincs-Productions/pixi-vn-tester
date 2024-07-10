import { atom } from "recoil";
import { CharacterBaseModel } from "../pixi-vn/src";

export const dialogDataState = atom<{
    character?: CharacterBaseModel,
    text?: string,
    hidden: boolean,
}>({
    key: 'dialogDataState',
    default: {
        character: undefined,
        text: undefined,
        hidden: true,
    },
})
