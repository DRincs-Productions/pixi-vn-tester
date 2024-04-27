import { atom } from "recoil";

export const nextStepState = atom<number>({
    key: 'nextStepState',
    default: 0,
});
