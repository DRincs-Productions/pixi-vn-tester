import { ChoiceMenuOption, GameWindowManager, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { liam } from "../values/characters";
import { baseCanvasElementTestLabel } from "./BaseCanvasElementTestLabel";
import { eventsTestLabel } from "./EventsTestLabel";
import { showImageTest } from "./ShowImageTest";
import { tickerTestLabel } from "./TickerTestLabel";
import { tintingTestLabel } from "./TintingTestLabel";

const START_LABEL_ID = "StartLabel"

export const startLabel = newLabel(START_LABEL_ID,
    [
        (props) => {
            GameWindowManager.clear()
            setDialogue({ character: liam, text: "Which test do you want to perform?" })
            setChoiceMenuOptions([
                new ChoiceMenuOption("Events Test", eventsTestLabel),
                new ChoiceMenuOption("Show Image Test", showImageTest),
                new ChoiceMenuOption("Ticker Test", tickerTestLabel),
                new ChoiceMenuOption("Tinting Test", tintingTestLabel),
                new ChoiceMenuOption("Base Canvas Element Test Label", baseCanvasElementTestLabel),
            ])
            if (props) {
                props.navigate("/game")
            }
        },
        // (props) => GameStepManager.jumpLabel(START_LABEL_ID, props),
    ]
)
