import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../use_query/useQueryInterface';
import { initializeIndexedDB } from '../utilities/indexedDB-utility';
import { initializeInk } from '../utilities/ink-utility';
import { useMyNavigate } from '../utilities/navigate-utility';
import { addRefreshSave, loadRefreshSave } from '../utilities/save-utility';

export default function EventInterceptor() {
    const [hideInterface, setHideInterface] = useRecoilState(hideInterfaceState);
    const navigate = useMyNavigate();
    const queryClient = useQueryClient()
    const { t: tNarration } = useTranslation(["narration"]);

    useEffect(() => {
        Promise.all([loadRefreshSave(navigate), initializeIndexedDB(), initializeInk({ navigate, t: tNarration })])
            .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
        window.addEventListener("beforeunload", async () => {
            await addRefreshSave()
        });
        window.addEventListener("popstate", onpopstate);
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener("beforeunload", async () => {
                await addRefreshSave()
            });
            window.removeEventListener("popstate", onpopstate);
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onpopstate() {
        window.history.forward();
    }

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Enter' || event.code == 'Space') {
            if (hideInterface) {
                setHideInterface(false)
            }
        }
        else if (event.code == 'KeyV' && event.shiftKey) {
            setHideInterface((prev) => !prev)
        }
    }

    return null
}
