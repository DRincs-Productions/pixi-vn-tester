import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Typography } from '@mui/joy';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { lastSaveState } from '../../atoms/lastSaveState';
import { reloadInterfaceDataEventAtom } from '../../atoms/reloadInterfaceDataEventAtom';
import { saveLoadAlertState } from '../../atoms/saveLoadAlertState';
import ModalConfirmation from '../../components/ModalConfirmation';
import { SAVES_USE_QUEY_KEY } from '../../use_query/useQuerySave';
import { useMyNavigate } from '../../utilities/navigate-utility';
import { deleteSaveFromIndexDB, loadSave, putSaveIntoIndexDB } from '../../utilities/save-utility';

export default function SaveLoadAlert() {
    const navigate = useMyNavigate();
    const notifyLoadEvent = useSetRecoilState(reloadInterfaceDataEventAtom);
    const [alertData, setAlertData] = useRecoilState(saveLoadAlertState);
    const { t } = useTranslation(["interface"]);
    const [lastSave, setLastSave] = useRecoilState(lastSaveState)
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'KeyS' && event.shiftKey) {
            putSaveIntoIndexDB()
                .then((save) => {
                    setLastSave(save)
                    enqueueSnackbar(t("success_save"), { variant: 'success' })
                })
                .catch(() => {
                    enqueueSnackbar(t("fail_save"), { variant: 'error' })
                })
        }
        else if (event.code == 'KeyL' && event.shiftKey) {
            setAlertData((prev) => {
                if (!prev.open || !lastSave) {
                    return { open: false }
                }
                return { open: true, data: lastSave, type: 'load' }
            })
        }
    }

    return (
        <ModalConfirmation
            open={alertData.open}
            setOpen={() => setAlertData({ open: false })}
            color="primary"
            head={<Typography level="h4"
                startDecorator={<CloudDownloadIcon />}
            >
                {t("load")}
            </Typography>}
            onConfirm={() => {
                if (!alertData.open) {
                    return false
                }
                switch (alertData.type) {
                    case "load":
                        return loadSave(alertData.data, navigate)
                            .then(() => {
                                notifyLoadEvent((prev) => prev + 1)
                                enqueueSnackbar(t("success_load"), { variant: 'success' })
                                return true
                            })
                            .catch(() => {
                                enqueueSnackbar(t("fail_load"), { variant: 'error' })
                                return false
                            })
                    case "delete":
                        return deleteSaveFromIndexDB(alertData.data)
                            .then(() => {
                                queryClient.setQueryData([SAVES_USE_QUEY_KEY, alertData.data], null);
                                enqueueSnackbar(t("success_delete"), { variant: 'success' })
                                return true
                            })
                            .catch(() => {
                                enqueueSnackbar(t("fail_delete"), { variant: 'error' })
                                return false
                            })
                    case "save":
                    case "overwrite_save":
                        return putSaveIntoIndexDB({ id: alertData.data })
                            .then((save) => {
                                queryClient.setQueryData([SAVES_USE_QUEY_KEY, save.id], save);
                                enqueueSnackbar(t("success_save"), { variant: 'success' })
                                setLastSave(save)
                                return true
                            })
                            .catch(() => {
                                enqueueSnackbar(t("fail_save"), { variant: 'error' })
                                return false
                            })
                }
            }}
        >
            {alertData.open && <Typography>
                {alertData.type == "load" && t("you_sure_to_load", { name: alertData.data.name || `${t("save_slot")} ${alertData.data.id}` })}
                {alertData.type == "delete" && t("you_sure_to_delete", { name: `${t("save_slot")} ${alertData.data}` })}
            </Typography>}
        </ModalConfirmation>
    );
}
