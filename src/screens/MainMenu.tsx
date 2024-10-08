import { addImage, canvas, clearAllGameDatas, narration, pixivnTestStartLabel } from '@drincs/pixi-vn';
import Stack from '@mui/joy/Stack';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { openSettingsState } from '../atoms/openSettingsState';
import { reloadInterfaceDataEventAtom } from '../atoms/reloadInterfaceDataEventAtom';
import MenuButton from '../components/MenuButton';
import { useMyNavigate } from '../utility/navigate-utility';
import { loadGameSaveFromFile } from '../utility/save-utility';

export default function MainMenu() {
    const navigate = useMyNavigate();
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventAtom);
    const setHideInterface = useSetRecoilState(hideInterfaceState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation(["interface"]);
    const { t: tNarration } = useTranslation(["narration"]);

    useEffect(() => {
        setHideInterface(false)
        clearAllGameDatas()
        let bg = addImage("background_main_menu", "https://andreannaking.com/wp-content/uploads/2021/12/Download-Beautiful-Nature-Landscape-Hd-Wallpaper-Full-HD-Wallpapers.jpg")
        bg.load()
    })

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 1, sm: 2, lg: 3 }}
            sx={{
                height: "100%",
                width: "100%",
                paddingLeft: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }
            }}
            component={motion.div}
            initial="closed"
            animate={"open"}
            exit="closed"
        >
            <MenuButton
                onClick={() => {
                    canvas.removeAll()
                    navigate("/game")
                    narration.callLabel(pixivnTestStartLabel, {
                        navigate: navigate,
                        t: tNarration,
                        notify: (message, variant) => enqueueSnackbar(message, { variant }),
                    }).then(() => {
                        notifyReloadInterfaceDataEvent((prev) => prev + 1)
                    })
                }}
                transitionDelay={0.1}
            >
                {t("start")}
            </MenuButton>
            <MenuButton
                onClick={() => {
                    loadGameSaveFromFile(navigate, () => notifyReloadInterfaceDataEvent((prev) => prev + 1))
                }}
                transitionDelay={0.2}
            >
                {t("load")}
            </MenuButton>
            <MenuButton
                onClick={() => { setOpenSettings(true) }}
                transitionDelay={0.3}
            >
                {t("settings")}
            </MenuButton>
        </Stack>
    );
}
