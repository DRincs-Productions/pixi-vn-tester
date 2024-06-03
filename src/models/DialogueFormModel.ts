import { CharacterBaseModel, ChoiceMenuOptionsType } from "@drincs/pixi-vn";

export interface DialogueFormModel {
    character: CharacterBaseModel | undefined,
    text: string | undefined,
    menu: ChoiceMenuOptionsType | undefined,
    canGoBack: boolean
}
