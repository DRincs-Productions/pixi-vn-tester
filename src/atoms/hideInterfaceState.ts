import { atom } from "recoil";

export const hideInterfaceState = atom<boolean>({
    key: 'hideInterfaceState',
    default: false,
});
