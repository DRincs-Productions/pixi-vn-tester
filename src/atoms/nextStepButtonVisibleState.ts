import { atom } from "recoil";

export const nextStepButtonVisibleState = atom<boolean>({
    key: 'nextStepButtonVisibleState',
    default: false,
});
