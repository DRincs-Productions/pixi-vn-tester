import { create } from 'zustand';

type DialogueCardStoreType = {
    /**
     * Height of the dialogue card
     */
    height: number,
    /**
     * Set the height of the dialogue card
     */
    setHeight: (value: number) => void,
}

const useDialogueCardStore = create<DialogueCardStoreType>((set) => ({
    height: localStorage.getItem("dialogue_card_height") ? parseInt(localStorage.getItem("dialogue_card_height")!) : 30,
    setHeight: (value: number) => {
        localStorage.setItem("dialogue_card_height", value.toString())
        set({ height: value })
    },
}))
export default useDialogueCardStore;
