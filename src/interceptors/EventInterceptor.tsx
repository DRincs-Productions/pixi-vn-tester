import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { reloadInterfaceDataEventAtom } from '../atoms/reloadInterfaceDataEventAtom';
import { initializeIndexedDB } from '../utility/indexedDB-utility';
import { useMyNavigate } from '../utility/navigate-utility';
import { addRefreshSave, loadRefreshSave } from '../utility/save-utility';

export default function EventInterceptor() {
    const notifyLoadEvent = useSetRecoilState(reloadInterfaceDataEventAtom);
    const [hideInterface, setHideInterface] = useRecoilState(hideInterfaceState);
    const navigate = useMyNavigate();

    useEffect(() => {
        Promise.all([loadRefreshSave(navigate), initializeIndexedDB()])
            .then(() => notifyLoadEvent((prev) => prev + 1))
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
