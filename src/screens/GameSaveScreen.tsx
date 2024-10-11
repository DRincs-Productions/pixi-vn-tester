import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { AspectRatio, Grid, IconButton, Skeleton, Stack, Theme, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { saveLoadAlertState } from '../atoms/saveLoadAlertState';
import ModalDialogCustom from '../components/ModalDialog';
import TypographyShadow from "../components/TypographyShadow";
import GameSaveData from '../models/GameSaveData';
import { useMyNavigate } from '../utilities/navigate-utility';
import { deleteSaveFromIndexDB, downloadGameSave, getSaveFromIndexDB, loadSave, putSaveIntoIndexDB } from '../utilities/save-utility';

export default function GameSaveScreen() {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation(["interface"]);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
    const setOpenLoadAlert = useSetRecoilState(saveLoadAlertState);

    return (
        <ModalDialogCustom
            open={open}
            setOpen={setOpen}
            layout={(smScreen ? "fullscreen" : "center")}
            head={<Typography level="h2">
                {t("history")}
            </Typography>}
            minWidth="80%"
            sx={{
                minHeight: "50%",
                paddingBottom: 6,
            }}
        >
            <Grid
                container
            >
                {/* for 6 element */}
                {Array.from({ length: 6 }).map((_, index) => {
                    return <Grid xs={12} sm={6} md={4} key={"ModalDialogCustom" + index}>
                        <GameSaveSlot
                            saveId={index}
                            onOverwriteSave={(data) => {
                                setOpenLoadAlert({ open: true, data: data, type: "overwrite_save" });
                            }}
                            onLoad={(data) => {
                                setOpenLoadAlert({ open: true, data: { ...data, id: index }, type: "load" });
                            }}
                            onDelete={() => {
                                setOpenLoadAlert({ open: true, data: index, type: "delete" });
                            }}
                        />
                    </Grid>
                })}
            </Grid>
        </ModalDialogCustom>
    );
}

function GameSaveSlot({ saveId }: {
    saveId: number,
    onDelete: () => Promise<void> | void,
    onOverwriteSave: (saveData: GameSaveData) => Promise<void> | void,
    onLoad: (saveData: GameSaveData) => Promise<void> | void,
}) {
    const { t } = useTranslation(["interface"]);
    const [loading, setLoading] = useState(true);
    const navigate = useMyNavigate();
    const [loadingSave, setLoadingSave] = useState(false);
    const [saveData, setSaveData] = useState<GameSaveData | null>();

    useEffect(() => {
        setLoading(true);
        getSaveFromIndexDB(saveId).then((data) => {
            setSaveData(data);
            setLoading(false);
        })
    }, [saveId]);

    if (loading) {
        return (
            <AspectRatio
                sx={{
                    borderRadius: 10,
                    margin: { xs: 1, sm: 2, md: 1, lg: 2 },
                }}
            >
                <Skeleton />
            </AspectRatio>
        );
    }

    if (!saveData) {
        return (
            <AspectRatio
                sx={{
                    borderRadius: 10,
                    margin: { xs: 1, sm: 2, md: 1, lg: 2 },
                }}
            >
                <IconButton
                    variant="soft"
                    sx={{
                        height: "100%",
                        width: "100%",
                    }}
                    onClick={() => {
                        setLoading(true)
                        putSaveIntoIndexDB({ id: saveId }).then((data) => {
                            setSaveData(data);
                            setLoading(false);
                        })
                    }}
                >
                    <SaveAsIcon sx={{ fontSize: '3rem', opacity: 0.2 }} />
                </IconButton>
            </AspectRatio>
        );
    }

    return (
        <AspectRatio
            sx={{
                borderRadius: 10,
                margin: { xs: 1, sm: 2, md: 1, lg: 2 },
            }}
        >
            <img
                src={saveData.image}
                style={{
                    backgroundColor: "#303030",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            />
            <Stack
                position={"absolute"}
                top={10}
                left={10}
                sx={{
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                <TypographyShadow
                    level="h2"
                >
                    {saveData.name}
                </TypographyShadow>
                <TypographyShadow>
                    {saveData.date.toLocaleDateString()}
                </TypographyShadow>
                <TypographyShadow>
                    {saveData.date.toLocaleTimeString()}
                </TypographyShadow>
                <TypographyShadow>
                    {`${t("save_slot")} ${saveId + 1}`}
                </TypographyShadow>
            </Stack>
            <Stack
                direction={"row"}
                position={"absolute"}
                bottom={10}
                right={10}
            >
                <IconButton
                    onClick={() => {
                        downloadGameSave(saveData)
                    }}
                >
                    <DownloadIcon
                        fontSize={"large"}
                        sx={{
                            color: useTheme().palette.neutral[300],
                        }}
                    />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setLoading(true)
                        putSaveIntoIndexDB({ id: saveId }).then((data) => {
                            setSaveData(data);
                            setLoading(false);
                        })
                    }}
                >
                    <SaveAsIcon
                        fontSize={"large"}
                        sx={{
                            color: useTheme().palette.neutral[300],
                        }}
                    />
                </IconButton>
                <IconButton
                    loading={loadingSave}
                    onClick={() => {
                        setLoadingSave(true)
                        loadSave(saveData, navigate).then(() => {
                            setLoadingSave(false);
                        })
                    }}
                >
                    <UnarchiveIcon
                        fontSize={"large"}
                        sx={{
                            color: useTheme().palette.neutral[300],
                        }}
                    />
                </IconButton>
            </Stack>
            <Stack
                direction={"row"}
                position={"absolute"}
                top={10}
                right={10}
            >
                <IconButton
                    color="danger"
                    size="md"
                    onClick={() => {
                        setLoading(true)
                        deleteSaveFromIndexDB(saveId).then(() => {
                            setSaveData(undefined);
                            setLoading(false);
                        })
                    }}
                >
                    <DeleteIcon
                        fontSize={"large"}
                    />
                </IconButton>
            </Stack>
        </AspectRatio>
    );
}
