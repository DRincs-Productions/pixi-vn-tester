import { canvas, narration, newLabel, Text, TextStyle } from "@drincs/pixi-vn";
import { Color, FillGradient } from "@drincs/pixi-vn/pixi.js";

const startLabel = newLabel("start", [
    async () => {
        const basicText = new Text({ text: "Basic text in pixi" });

        basicText.x = 50;
        basicText.y = 100;

        canvas.add("basicText", basicText);

        // Create gradient fill
        const fill = new FillGradient(0, 0, 0, 10);

        const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

        colors.forEach((number, index) => {
            const ratio = index / colors.length;

            fill.addColorStop(ratio, number);
        });

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: "bold",
            fill: { fill },
            stroke: { color: "#4a1850", width: 5, join: "round" },
            dropShadow: {
                color: "#000000",
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const richText = new Text({
            text: "Rich text with a lot of options and across multiple lines",
            style,
        });

        richText.x = 50;
        richText.y = 220;

        canvas.add("txt2", richText);

        const skewStyle = new TextStyle({
            fontFamily: "Arial",
            dropShadow: {
                alpha: 0.8,
                angle: 2.1,
                blur: 4,
                color: "0x111111",
                distance: 10,
            },
            fill: "#ffffff",
            stroke: { color: "#004620", width: 12, join: "round" },
            fontSize: 60,
            fontWeight: "lighter",
        });

        const skewText = new Text({
            text: "SKEW IS COOL",
            style: skewStyle,
        });

        skewText.skew.set(0.65, -0.3);
        skewText.anchor.set(0.5, 0.5);
        skewText.x = 300;
        skewText.y = 480;

        canvas.add("skewText", skewText);
    },
    () => {
        narration.dialogue = "part 2";
    },
]);
export default startLabel;
