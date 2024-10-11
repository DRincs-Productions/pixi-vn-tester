import { useQuery } from "@tanstack/react-query";
import { getSaveFromIndexDB } from "../utilities/save-utility";

export const SAVES_USE_QUEY_KEY = "saves_use_quey_key";

export default function useQuerySave({ id }: { id: number }) {
	return useQuery({
		queryKey: [SAVES_USE_QUEY_KEY, id],
		queryFn: async () => {
			return getSaveFromIndexDB(id)
				.then((res) => {
					return res || null
				}).catch((err) => {
					throw err
				})
		},
	});
}
