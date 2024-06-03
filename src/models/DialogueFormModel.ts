import { CharacterBaseModel, ChoiceMenuOptionsType } from "@drincs/pixi-vn";

export interface DialogueFormModel {
    character: CharacterBaseModel | null,
    text?: string,
    menu?: ChoiceMenuOptionsType,
    showDialogueCard: boolean,
    showNextButton: boolean,
}
