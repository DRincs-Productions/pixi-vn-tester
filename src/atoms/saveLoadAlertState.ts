import { atom } from "recoil";
import GameSaveData from "../models/GameSaveData";

export const saveLoadAlertState = atom<{
    open: false;
} | {
    open: true;
    data: GameSaveData & { id: number };
    type: 'load';
} | {
    open: true;
    data: number;
    type: 'overwrite_save' | 'save';
} | {
    open: true;
    data: number;
    type: 'delete';
}
>({
    key: 'saveLoadAlertState',
    default: { open: false },
});
