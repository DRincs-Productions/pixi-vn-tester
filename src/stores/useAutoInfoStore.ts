import { create } from 'zustand';

type AutoInfo = {
    /**
     * Whether auto forward is enabled
     */
    enabled: boolean,
    /**
     * Time in seconds to wait before auto forwarding
     */
    time: number,
    /**
     * Enable or disable auto forward
     */
    editToggle: () => void,
    /**
     * Set the time to wait before auto forwarding
     */
    setTime: (value: number) => void,
}

const useAutoInfoStore = create<AutoInfo>((set) => ({
    enabled: false,
    time: localStorage.getItem("auto_forward_second") ? parseInt(localStorage.getItem("auto_forward_second")!) : 1,
    editToggle: () => set((state) => ({ enabled: !state.enabled })),
    setTime: (value: number) => {
        if (value) {
            localStorage.setItem("auto_forward_second", value.toString())
            set({ time: value })
        }
    },
}))
export default useAutoInfoStore;
