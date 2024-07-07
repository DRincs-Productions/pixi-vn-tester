import { addImage, ChoiceMenuOption, GameStepManager, loadImages, newLabel, removeCanvasElement, setChoiceMenuOptions, setDialogue, showWithDissolveTransition } from "@drincs/pixi-vn"
import { juliette } from "../values/characters"

const IMAGE_ANIMAIONS_TEST_LABEL = "___pixi_vn_images_animations_test___"
export const imagesAnimationsTest = newLabel(IMAGE_ANIMAIONS_TEST_LABEL, [
    async () => {
        setDialogue({ character: juliette, text: "These are my 4 puppets: Egg Head, Flower Top, Helmlok and Skully. They can appear, disappear and animate at my will." })
        let eggHead = addImage("eggHead", "https://pixijs.com/assets/eggHead.png")
        await eggHead.load()
        eggHead.x = 100
        eggHead.y = 100
        let flowerTop = addImage("flowerTop", "https://pixijs.com/assets/flowerTop.png")
        flowerTop.x = 300
        flowerTop.y = 100
        flowerTop.load()
        let helmlok = addImage("helmlok", 'https://pixijs.com/assets/helmlok.png')
        helmlok.x = 100
        helmlok.y = 300
        let skully = addImage("skully", 'https://pixijs.com/assets/skully.png')
        skully.x = 300
        skully.y = 300
        await loadImages([helmlok, skully])
    },
    async () => {
        setDialogue({ character: juliette, text: "Here's what they can do." })
        setChoiceMenuOptions([
            new ChoiceMenuOption("Dissolve effect", imagesDissolveTest),
        ])
    },
    (props) => GameStepManager.jumpLabel(IMAGE_ANIMAIONS_TEST_LABEL, props),
])

const imagesDissolveTest = newLabel("___pixi_vn_images_dissolve_test___", [
    () => {
        removeCanvasElement(["eggHead", "flowerTop"])
    },
    async () => {
        showWithDissolveTransition('eggHead', "https://pixijs.com/assets/eggHead.png", 0.5)
        // let flowerTop = addImage("flowerTop", "https://pixijs.com/assets/flowerTop.png")
        // flowerTop.x = 300
        // flowerTop.y = 100
        // showWithDissolveTransition('flowerTop', flowerTop, 1)
    }
])