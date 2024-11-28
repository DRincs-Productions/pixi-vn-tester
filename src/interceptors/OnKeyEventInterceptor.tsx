import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { saveLoadAlertState } from '../atoms/saveLoadAlertState';
import useQueryLastSave, { LAST_SAVE_USE_QUEY_KEY } from '../use_query/useQueryLastSave';
import { SAVES_USE_QUEY_KEY } from '../use_query/useQuerySaves';
import { putSaveIntoIndexDB } from '../utilities/save-utility';

export default function EventInterceptor() {
    const [hideInterface, setHideInterface] = useRecoilState(hideInterfaceState);
    const setAlertData = useSetRecoilState(saveLoadAlertState);
    const queryClient = useQueryClient()
    const { t } = useTranslation(["ui"]);
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { data: lastSave = null } = useQueryLastSave()

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, [location, hideInterface, lastSave]);

    function onkeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                if (hideInterface) {
                    setHideInterface(false)
                }
                break;
            case 'KeyV':
                if (event.shiftKey) {
                    setHideInterface((prev) => {
                        if (location.pathname === '/')
                            return false
                        return !prev
                    })
                }
                break;
            case 'KeyS':
                if (event.shiftKey && location.pathname !== '/') {
                    putSaveIntoIndexDB()
                        .then((save) => {
                            queryClient.setQueryData([SAVES_USE_QUEY_KEY, save.id], save);
                            queryClient.setQueryData([LAST_SAVE_USE_QUEY_KEY], save)
                            enqueueSnackbar(t("success_save"), { variant: 'success' })
                        })
                        .catch(() => {
                            enqueueSnackbar(t("fail_save"), { variant: 'error' })
                        })
                }
                break;
            case 'KeyL':
                if (event.shiftKey) {
                    setAlertData((prev) => {
                        if (prev.open || !lastSave) {
                            return { ...prev, open: false }
                        }
                        return { open: true, data: lastSave, type: 'load' }
                    })
                }
                break;
        }
    }

    return null
}
