import { useEffect } from "react";
import useNetworkStore from "../stores/useNetworkStore";

export default function useNetworkDetector() {
    const update = useNetworkStore((state) => (state.updateOnlineStatus))

    useEffect(() => {
        window.addEventListener("load", update);
        window.addEventListener("online", update);
        window.addEventListener("offline", update);

        return () => {
            window.removeEventListener("load", update);
            window.removeEventListener("online", update);
            window.removeEventListener("offline", update);
        };
    }, [navigator.onLine]);

    return null;
};
