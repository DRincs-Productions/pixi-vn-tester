import { saveCharacter } from "@drincs/pixi-vn";
import Character from "../models/Character";

export const mc = new Character('mc', {
    name: 'Me',
    color: "#000000"
});

export const james = new Character('james', {
    name: 'James',
    color: "#0098ac"
});

export const steph = new Character('steph', {
    name: 'Steph',
    color: "#ac6700"
});

export const sly = new Character('sly', {
    name: 'Sly',
    color: "#4b00ac"
});

saveCharacter([mc, james, steph, sly]);
