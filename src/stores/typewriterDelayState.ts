import { create } from 'zustand';

type TypewriterStoreType = {
    /**
     * The delay in milliseconds between each character
     */
    delay: number,
    /**
     * Set the delay in milliseconds between each character
     */
    setDelay: (value: number) => void,
}

const useTypewriterStore = create<TypewriterStoreType>((set) => ({
    delay: localStorage.getItem('typewriter_delay_millisecond') ? parseInt(localStorage.getItem('typewriter_delay_millisecond')!) : 10,
    setDelay: (value: number) => {
        if (value) {
            localStorage.setItem("typewriter_delay_millisecond", value.toString())
            set({ delay: value })
        }
    },
}))
export default useTypewriterStore;
