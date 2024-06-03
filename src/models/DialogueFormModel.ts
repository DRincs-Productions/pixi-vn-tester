import { CharacterBaseModel, ChoiceMenuOptionsType } from "@drincs/pixi-vn";

export interface DialogueFormModel {
    character: CharacterBaseModel | null,
    text?: string,
    menu?: ChoiceMenuOptionsType,
    canGoBack: boolean,
    showDialogueCard: boolean,
    showNextButton: boolean,
}
