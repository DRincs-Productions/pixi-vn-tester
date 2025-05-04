import { useEffect } from "react";

/**
 * A custom hook that debounces a callback function.
 * @param callback The callback function to debounce.
 * @param options The options object.
 * @param dependencies The dependencies array that determines when to re-run the effect.
 */
export default function useDebouncedEffect(
    callback: () => void,
    options: {
        /**
         * The delay in milliseconds before the callback is executed.
         * @default 1000
         */
        delay?: number;
    } = {},
    dependencies: any[] = []
) {
    const { delay = 1000 } = options;

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, dependencies);
}
