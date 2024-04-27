import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { hideInterfaceState } from './atoms/hideInterfaceState';
import { nextStepState } from './atoms/nextStepState';
import { openHistoryState } from './atoms/openHistoryState';
import { openSettingsState } from './atoms/openSettingsState';
import { reloadInterfaceDataEventState } from './atoms/reloadInterfaceDataEventState';
import { addRefreshSave, loadRefreshSave } from './utility/ActionsUtility';
import { useMyNavigate } from './utility/useMyNavigate';

export default function EventInterceptor() {
    const notifyLoadEvent = useSetRecoilState(reloadInterfaceDataEventState);
    const nextStep = useSetRecoilState(nextStepState);
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const setOpenHistory = useSetRecoilState(openHistoryState);
    const setHideInterface = useSetRecoilState(hideInterfaceState);
    const navigate = useMyNavigate();

    useEffect(() => {
        loadRefreshSave(navigate, () => notifyLoadEvent((prev) => prev + 1))
        window.addEventListener("beforeunload", addRefreshSave);
        window.addEventListener("popstate", onpopstate);
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener("beforeunload", addRefreshSave);
            window.removeEventListener("popstate", onpopstate);
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onpopstate() {
        window.history.forward();
    }

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Enter' || event.code == 'Space') {
            nextStep((prev) => prev + 1)
        }
        else if (event.code == 'Escape') {
            setOpenSettings((prev) => !prev)
        }
        else if (event.code == 'KeyH') {
            setOpenHistory((prev) => !prev)
        }
        else if (event.code == 'KeyV') {
            setHideInterface((prev) => !prev)
        }
    }

    return null
}
