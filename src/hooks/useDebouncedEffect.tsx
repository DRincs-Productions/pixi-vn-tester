import { useEffect } from "react";

/**
 * A custom hook that debounces a callback function.
 * @param callback The callback function to debounce.
 * @param delay The delay in milliseconds to wait before calling the callback.
 * @param dependencies The dependencies array that determines when to re-run the effect.
 */
export default function useDebouncedEffect(callback: () => void, delay: number, dependencies: any[]) {
    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, dependencies);
}
