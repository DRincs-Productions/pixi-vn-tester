import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, FormControl, ModalClose, RadioGroup, Sheet, Stack, Typography } from "@mui/joy";
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { openSettingsState } from '../atoms/openSettingsState';
import ModalDialogCustom from '../components/ModalDialog';
import SettingButton from '../components/SettingButton';
import { gameEnd } from '../utilities/actions-utility';
import { useMyNavigate } from '../utilities/navigate-utility';
import AutoSettingToggle from './settings/AutoSettingToggle';
import DialoguesSettings from './settings/DialoguesSettings';
import FullScreenSettings from './settings/FullScreenSettings';
import OpenHistorySettingButton from './settings/OpenHistorySettingButton';
import SaveLoadSettingButtons from './settings/SaveLoadSettingButtons';
import SkipSettingToggle from './settings/SkipSettingToggle';
import ThemeSettings from './settings/ThemeSettings';

export default function Settings() {
    const [open, setOpen] = useRecoilState(openSettingsState);
    const navigate = useMyNavigate();
    const location = useLocation();
    const [openYouSure, setOpenYouSure] = useState(false)
    const { t } = useTranslation(["ui"]);
    const [hideInterface, setHideInterface] = useRecoilState(hideInterfaceState);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Escape') {
            setOpen((prev) => !prev)
        }
    }

    return (
        <>
            <Drawer
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-content': {
                        width: smScreen ? '100%' : 600,
                        maxWidth: '100%',
                    },
                }}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>{t("settings")}</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <FormControl>
                            <RadioGroup>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                        gap: 1.5,
                                    }}
                                >
                                    <SkipSettingToggle />
                                    <AutoSettingToggle />
                                    <OpenHistorySettingButton />
                                    <SaveLoadSettingButtons />
                                    <SettingButton
                                        checked={hideInterface}
                                        onClick={() => setHideInterface((prev) => !prev)}
                                    >
                                        <VisibilityOffIcon />
                                        <Typography level="title-md">{t("hide_ui")}</Typography>
                                        <Typography
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                            }}
                                            level="body-md"
                                        >
                                            Shift+V
                                        </Typography>
                                    </SettingButton>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                        <Typography level="title-md" fontWeight="bold">
                            {t("dialogues")}
                        </Typography>
                        <DialoguesSettings />

                        <Typography level="title-md" fontWeight="bold">
                            {t("display")}
                        </Typography>
                        <FullScreenSettings />
                        <ThemeSettings />
                    </DialogContent>
                    {location.pathname !== '/' && <>
                        <Divider sx={{ mt: 'auto' }} />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            useFlexGap
                            spacing={1}
                        >
                            <Button
                                variant="outlined"
                                color="danger"
                                startDecorator={<ExitToAppIcon />}
                                onClick={() => setOpenYouSure(true)}
                            >
                                {t("return_main_menu")}
                            </Button>
                        </Stack>
                    </>}
                </Sheet>
            </Drawer>

            <ModalDialogCustom
                open={openYouSure}
                setOpen={setOpenYouSure}
                color='danger'
                head={<Typography level="h4"
                    startDecorator={<ExitToAppIcon />}
                >
                    {t("attention")}
                </Typography>}
                actions={<>
                    <Button
                        key={'exit'}
                        color='danger'
                        variant="outlined"
                        onClick={() => {
                            gameEnd(navigate)
                            setOpen(false)
                            setOpenYouSure(false)
                        }}
                        startDecorator={<ExitToAppIcon />}
                    >
                        {t("exit")}
                    </Button>
                    <Button
                        key={'cancel'}
                        color="neutral"
                        variant="plain"
                        onClick={() => setOpenYouSure(false)}
                    >
                        {t("cancel")}
                    </Button>
                </>}
            >
                <Typography>
                    {t("you_sure_to_return_main_menu")}
                </Typography>
            </ModalDialogCustom>
        </>
    );
}
