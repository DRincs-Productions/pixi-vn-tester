import { atom } from "recoil";

export const typewriterDelayState = atom<number>({
    key: 'typewriterDelayState',
    default: localStorage.getItem('typewriter_delay_millisecond') ? parseInt(localStorage.getItem('typewriter_delay_millisecond')!) : 0,
});
