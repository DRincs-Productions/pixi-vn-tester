import { CharacterBaseModel, getCharacterById, getChoiceMenuOptions, getDialogue } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { choiceMenuState } from '../atoms/choiceMenuState';
import { dialogDataState } from '../atoms/dialogDataState';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { nextStepButtonVisibleState } from '../atoms/nextStepButtonVisibleState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';

export default function DialogueDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);
    const hideInterface = useRecoilValue(hideInterfaceState)
    const setNextStepButtonVisible = useSetRecoilState(nextStepButtonVisibleState)
    const [{ text, character }, setDialogData] = useRecoilState(dialogDataState)
    const [menu, setMenu] = useRecoilState(choiceMenuState)

    useEffect(() => {
        let dial = getDialogue()
        let newText: string | undefined = dial?.text
        let newCharacter: CharacterBaseModel | undefined = undefined
        if (dial) {
            newCharacter = dial.characterId ? getCharacterById(dial.characterId) : undefined
            if (!newCharacter && dial.characterId) {
                newCharacter = new CharacterBaseModel(dial.characterId, { name: t(dial.characterId) })
            }
        }
        try {
            if (dial !== text || newCharacter !== character) {
                setDialogData((prev) => {
                    return {
                        ...prev,
                        text: newText,
                        character: newCharacter,
                    }
                })
            }
        } catch (e) { }
        let m = getChoiceMenuOptions()
        setMenu(m)
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        setNextStepButtonVisible(!hideInterface && !menu)
    }, [menu, hideInterface])

    useEffect(() => {
        setDialogData((prev) => {
            return {
                ...prev,
                visible: !hideInterface && text ? true : false,
            }
        })
    }, [text, hideInterface])

    return null
}
