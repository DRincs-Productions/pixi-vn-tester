import { create } from 'zustand';

type GameSaveScreenStoreType = {
    /**
     * Whether the save screen is open
     */
    open: boolean,
    /**
     * Open the save screen
     */
    editOpen: () => void,
    /**
     * Set the open state of the save screen
     */
    setOpen: (value: boolean) => void,
    /**
     * The current page of the save screen
     */
    page: number,
    /**
     * Set the page of the save screen
     */
    setPage: (value: number) => void,
}

const useGameSaveScreenStore = create<GameSaveScreenStoreType>((set) => ({
    page: localStorage.getItem("save_screen_page") ? parseInt(localStorage.getItem("save_screen_page") as string) : 0,
    setPage: (value: number) => {
        localStorage.setItem("save_screen_page", value.toString())
        set({ page: value })
    },
    open: false,
    editOpen: () => set((state) => ({ open: !state.open })),
    setOpen: (value: boolean) => set({ open: value }),
}))
export default useGameSaveScreenStore;
