import { narration } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { RELOAD_INTERFACE_DATA_EVENT_USE_QUEY_KEY } from "./useQueryInterface";

const SAVES_USE_QUEY_KEY = "saves_use_quey_key";
export const SAVES_USE_QUEY_KEYS = [RELOAD_INTERFACE_DATA_EVENT_USE_QUEY_KEY, SAVES_USE_QUEY_KEY];

export default function useQueryCanGoBack() {
	return useQuery({
		queryKey: SAVES_USE_QUEY_KEYS,
		queryFn: () => {
			return narration.canGoBack
		},
	});
}
