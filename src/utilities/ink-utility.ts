import { generateJsonInkTranslation, importInkText, onInkHashtagScript, onInkTranslate } from '@drincs/pixi-vn-ink';
import startLabel from '../ink_labels/start.ink?raw';
import strings_en from '../values/translations/strings_en.json';

export async function initializeInk({ navigate, t }: {
    navigate: (path: string) => void
    t: (text: string) => string
}) {
    let labels = await importInkText(startLabel)
    let json = generateJsonInkTranslation(labels, strings_en.narration)
    console.log(json)
    onInkHashtagScript((script, _convertListStringToObj) => {
        if (script.length === 2) {
            if (script[0] === "navigate") {
                navigate(script[1])
                return true
            }
        }
        return false
    })
    onInkTranslate((text) => {
        return t(text)
    })
}
