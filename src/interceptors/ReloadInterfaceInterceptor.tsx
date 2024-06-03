import { CharacterBaseModel, GameStepManager, getCharacterById, getChoiceMenuOptions, getDialogue } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { DialogueFormModel } from '../models/DialogueFormModel';

export default function ReloadInterfaceInterceptor({ dialogueForm }: {
    dialogueForm: UseFormReturn<DialogueFormModel, any, undefined>
}) {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        let dial = getDialogue()
        if (dial) {
            dialogueForm.setValue("text", dial.text)
            let c: CharacterBaseModel | undefined = dial.characterId ? getCharacterById(dial.characterId) : undefined
            if (!c && dial.characterId) {
                c = new CharacterBaseModel(dial.characterId, { name: t(dial.characterId) })
            }
            dialogueForm.setValue("character", c)
        }
        else {
            dialogueForm.setValue("text", undefined)
            dialogueForm.setValue("character", undefined)
        }
        let m = getChoiceMenuOptions()
        dialogueForm.setValue("menu", m)
        dialogueForm.setValue("canGoBack", GameStepManager.canGoBack)
    }, [reloadInterfaceDataEvent])

    return null
}
