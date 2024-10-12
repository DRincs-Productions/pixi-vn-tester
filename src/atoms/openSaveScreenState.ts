import { atom } from "recoil";

export const openSaveScreenState = atom<boolean>({
    key: 'openSaveScreenState',
    default: false,
});
