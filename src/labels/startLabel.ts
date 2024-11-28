import { narration, newLabel, pixivnTestStartLabel } from "../pixi-vn/src";

const startLabel = newLabel("start", [
    async (props) => {
        await narration.jumpLabel(pixivnTestStartLabel, props);
    }
]);
export default startLabel;
