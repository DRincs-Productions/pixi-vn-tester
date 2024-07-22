import { CharacterBaseModel, GameStepManager, getCharacterById, getDialogue } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { hideNextButtonState } from '../atoms/hideNextButtonState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';

export default function DialogueDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);
    const hideInterface = useRecoilValue(hideInterfaceState)
    const hideNextButton = useSetRecoilState(hideNextButtonState)
    const [{ text, character }, setDialogData] = useRecoilState(dialogDataState)

    useEffect(() => {
        let dial = getDialogue()
        let newText: string | undefined = dial?.text
        let newCharacter: CharacterBaseModel | undefined = undefined
        if (dial) {
            newCharacter = dial.character ? getCharacterById(dial.character) : undefined
            if (!newCharacter && dial.character) {
                newCharacter = new CharacterBaseModel(dial.character, { name: t(dial.character) })
            }
        }
        try {
            if (dial?.text !== text || newCharacter !== character) {
                setDialogData({
                    text: newText,
                    character: newCharacter,
                    hidden: hideInterface || newText ? false : true,
                })
            }
        } catch (e) { }
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        hideNextButton(hideInterface || !(GameStepManager.canGoNext))
    }, [hideInterface])

    useEffect(() => {
        setDialogData((prev) => {
            return {
                ...prev,
                hidden: hideInterface || (prev.text ? false : true),
            }
        })
    }, [hideInterface])

    return null
}
