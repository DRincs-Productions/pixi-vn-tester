import { CharacterBaseModel, GameStepManager, getCharacterById, getChoiceMenuOptions, getDialogue } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { DialogueFormModel } from '../models/DialogueFormModel';
import { InterfaceInfoFormModel } from '../models/InterfaceInfoFormModel';

export default function DialogueDataEventInterceptor({ dialogueForm, interfaceInfoForm }: {
    dialogueForm: UseFormReturn<DialogueFormModel, any, undefined>,
    interfaceInfoForm: UseFormReturn<InterfaceInfoFormModel, any, undefined>,
}) {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);
    const menu = dialogueForm.watch("menu")
    const text = dialogueForm.watch("text")
    const hideInterface = useRecoilValue(hideInterfaceState)

    useEffect(() => {
        let dial = getDialogue()
        if (dial) {
            dialogueForm.setValue("text", dial.text)
            let c: CharacterBaseModel | undefined = dial.characterId ? getCharacterById(dial.characterId) : undefined
            if (!c && dial.characterId) {
                c = new CharacterBaseModel(dial.characterId, { name: t(dial.characterId) })
            }
            dialogueForm.setValue("character", c ?? null)
        }
        else {
            dialogueForm.setValue("text", undefined)
            dialogueForm.setValue("character", null)
        }
        let m = getChoiceMenuOptions()
        dialogueForm.setValue("menu", m)
        interfaceInfoForm.setValue("canGoBack", GameStepManager.canGoBack)
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        dialogueForm.setValue("showNextButton", !hideInterface && !menu)
    }, [menu, hideInterface])

    useEffect(() => {
        dialogueForm.setValue("showDialogueCard", !hideInterface && text ? true : false)
    }, [text, hideInterface])

    return null
}
