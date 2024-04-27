import { atom } from "recoil";

export const reloadInterfaceDataEventState = atom<number>({
    key: 'reloadInterfaceDataEventState',
    default: 0,
});
