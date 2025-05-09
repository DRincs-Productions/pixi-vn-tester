import { narration } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import useStepStore from "../stores/useStepStore";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../use_query/useQueryInterface";
import useGameProps from "./useGameProps";

export default function useGoNext() {
    const setNextStepLoading = useStepStore(useShallow((state) => state.setLoading));
    const queryClient = useQueryClient();
    const gameProps = useGameProps();

    const goNext = useCallback(async () => {
        setNextStepLoading(true);
        try {
            if (!narration.canGoNext) {
                setNextStepLoading(false);
                return;
            }
            narration
                .goNext(gameProps)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] });
                    setNextStepLoading(false);
                })
                .catch((e) => {
                    setNextStepLoading(false);
                    console.error(e);
                });
            return;
        } catch (e) {
            setNextStepLoading(false);
            console.error(e);
            return;
        }
    }, [gameProps, queryClient]);

    return {
        goNext,
    };
}
