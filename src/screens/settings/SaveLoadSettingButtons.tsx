import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from "@mui/joy";
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { openGameSaveScreenState } from '../../atoms/openGameSaveScreenState';
import { openSettingsState } from '../../atoms/openSettingsState';
import { saveLoadAlertState } from '../../atoms/saveLoadAlertState';
import SettingButton from '../../components/SettingButton';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../../use_query/useQueryInterface';
import useQueryLastSave, { LAST_SAVE_USE_QUEY_KEY } from '../../use_query/useQueryLastSave';
import { SAVES_USE_QUEY_KEY } from '../../use_query/useQuerySaves';
import { useMyNavigate } from '../../utilities/navigate-utility';
import { downloadGameSave, loadGameSaveFromFile, putSaveIntoIndexDB } from '../../utilities/save-utility';

export default function SaveLoadSettingButtons() {
    const navigate = useMyNavigate();
    const { t } = useTranslation(["ui"]);
    const setOpenLoadAlert = useSetRecoilState(saveLoadAlertState);
    const openSaveScreen = useSetRecoilState(openGameSaveScreenState);
    const openSettings = useSetRecoilState(openSettingsState);
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const { data: lastSave = null } = useQueryLastSave()
    const location = useLocation();

    return ([
        location.pathname === '/' ? null : <SettingButton
            key={"quick_save_button"}
            onClick={() => {
                putSaveIntoIndexDB()
                    .then((save) => {
                        queryClient.setQueryData([SAVES_USE_QUEY_KEY, save.id], save);
                        queryClient.setQueryData([LAST_SAVE_USE_QUEY_KEY], save);
                        enqueueSnackbar(t("success_save"), { variant: 'success' })
                    })
                    .catch(() => {
                        enqueueSnackbar(t("fail_save"), { variant: 'error' })
                    })
            }}
            disabled={location.pathname === '/'}
        >
            <SaveAsIcon />
            <Typography level="title-md">{t("quick_save")}</Typography>
            <Typography
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                }}
                level="body-md"
            >
                Shift+S
            </Typography>
        </SettingButton>,
        <SettingButton
            key={"load_last_save_button"}
            onClick={() => {
                lastSave && setOpenLoadAlert({ open: true, data: lastSave, type: 'load' })
                openSettings(false)
            }}
            disabled={!lastSave}
        >
            <FileUploadIcon />
            <Typography level="title-md">{t("load_last_save")}</Typography>
            <Typography
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                }}
                level="body-md"
            >
                Shift+L
            </Typography>
        </SettingButton>,
        <SettingButton
            key={"save_load_button"}
            onClick={() => {
                openSaveScreen(true)
                openSettings(false)
            }}
        >
            <SaveIcon />
            <Typography level="title-md">{t(`${t("save")}/${t("load")}`)}</Typography>
        </SettingButton>,
        location.pathname === '/' ? null : <SettingButton
            key={"download_button"}
            onClick={() => downloadGameSave()}
            disabled={location.pathname === '/'}
        >
            <DownloadIcon />
            <Typography level="title-md">{t("save_to_file")}</Typography>
        </SettingButton>,
        <SettingButton
            key={"load_button"}
            onClick={() => loadGameSaveFromFile(navigate, () => {
                queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                enqueueSnackbar(t("success_load"), { variant: 'success' })
                openSettings(false)
            })}
        >
            <FolderOpenIcon />
            <Typography level="title-md">{t("load_from_file")}</Typography>
        </SettingButton>
    ]);
}
