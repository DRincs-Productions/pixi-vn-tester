import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { saveLoadAlertState } from '../atoms/saveLoadAlertState';
import useInterfaceStore from '../stores/useInterfaceStore';
import useQueryLastSave, { LAST_SAVE_USE_QUEY_KEY } from '../use_query/useQueryLastSave';
import { SAVES_USE_QUEY_KEY } from '../use_query/useQuerySaves';
import { putSaveIntoIndexDB } from '../utils/save-utility';

export default function EventInterceptor() {
    const hideInterface = useInterfaceStore((state) => state.hidden);
    const setHideInterface = useInterfaceStore((state) => state.setHidden);
    const setAlertData = useSetRecoilState(saveLoadAlertState);
    const queryClient = useQueryClient()
    const { t } = useTranslation(["ui"]);
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { data: lastSave = null } = useQueryLastSave()

    const onkeydown = useCallback((event: KeyboardEvent) => {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                if (hideInterface) {
                    setHideInterface(false)
                }
                break;
            case 'KeyV':
                if (event.altKey) {
                    setHideInterface(!hideInterface)
                }
                break;
            case 'KeyS':
                if (event.altKey) {
                    if (location.pathname === '/') {
                        console.log("Can't save on home page")
                        break
                    }
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
                if (event.altKey) {
                    setAlertData((prev) => {
                        if (prev.open) {
                            return { ...prev, open: false }
                        }
                        if (!lastSave) {
                            console.log("No save to load")
                            return { ...prev, open: false }
                        }
                        return { open: true, data: lastSave, type: 'load' }
                    })
                }
                break;
        }
    }, [location, hideInterface, lastSave, queryClient, t])

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, [onkeydown]);

    return null
}
