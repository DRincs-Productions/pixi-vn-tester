import { atom } from "recoil";

export const textInputOptionsState = atom<{ open: boolean }>({
    key: 'textInputOptionsState',
    default: { open: true },
});
