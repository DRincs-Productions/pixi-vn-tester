import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import { Typography } from "@mui/joy";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SettingButton from '../../components/SettingButton';
import useAutoInfoStore from '../../stores/useAutoInfoStore';

export default function AutoSettingToggle() {
    const { t } = useTranslation(["ui"]);
    const { enabled: autoEnabled, editToggle: editAutoEnabled } = useAutoInfoStore((state) => state)

    const location = useLocation();
    if (location.pathname === '/') {
        return null
    }

    return (
        <SettingButton
            checked={autoEnabled}
            onClick={editAutoEnabled}
        >
            <HdrAutoIcon />
            <Typography level="title-md">{t("auto_forward_time_restricted")}</Typography>
        </SettingButton>
    );
}
