import Character from "../models/Character";
import { saveCharacter } from "../pixi-vn/src";

export const mc = new Character("mc", {
    name: "Me",
});

export const james = new Character("james", {
    name: "James",
    color: "#0084ac",
});

export const steph = new Character("steph", {
    name: "Steph",
    color: "#ac5900",
});

export const sly = new Character("sly", {
    name: "Sly",
    color: "#6d00ac",
});

saveCharacter([mc, james, steph, sly]);
