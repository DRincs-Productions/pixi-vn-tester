import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { AspectRatio, Grid, IconButton, Skeleton, Stack, Theme, Typography, useTheme } from "@mui/joy";
import { Pagination, useMediaQuery } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { saveLoadAlertState } from '../atoms/saveLoadAlertState';
import { saveScreenPageState } from '../atoms/saveScreenPageState';
import ModalDialogCustom from '../components/ModalDialog';
import TypographyShadow from "../components/TypographyShadow";
import GameSaveData from '../models/GameSaveData';
import useQuerySave, { SAVES_USE_QUEY_KEY } from '../use_query/useQuerySave';
import { useMyNavigate } from '../utilities/navigate-utility';
import { deleteSaveFromIndexDB, downloadGameSave, loadSave, putSaveIntoIndexDB } from '../utilities/save-utility';

export default function GameSaveScreen() {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation(["interface"]);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
    const setOpenLoadAlert = useSetRecoilState(saveLoadAlertState);
    const [page, setPage] = useRecoilState(saveScreenPageState);

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
                    let id = page * 6 + index;
                    return <Grid xs={12} sm={6} md={4} key={"ModalDialogCustom" + index}>
                        <GameSaveSlot
                            saveId={id}
                            onOverwriteSave={(data) => {
                                setOpenLoadAlert({ open: true, data: data, type: "overwrite_save" });
                            }}
                            onLoad={(data) => {
                                setOpenLoadAlert({ open: true, data: { ...data, id: id }, type: "load" });
                            }}
                            onDelete={() => {
                                setOpenLoadAlert({ open: true, data: id, type: "delete" });
                            }}
                        />
                    </Grid>
                })}
            </Grid>
            <Pagination
                count={99}
                siblingCount={smScreen ? 2 : 7}
                page={page + 1}
                onChange={(_event, value) => setPage(value - 1)}
                sx={{
                    position: "absolute",
                    bottom: 7,
                    right: 0,
                    left: 0,
                    justifySelf: "center",
                    "& .MuiPaginationItem-root": {
                        color: "var(--joy-palette-text-primary)",
                    }
                }}
            />
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
    const navigate = useMyNavigate();
    const [loadingSave, setLoadingSave] = useState(false);
    const queryClient = useQueryClient()

    const {
        isLoading,
        data: saveData,
        isError,
    } = useQuerySave({ id: saveId })

    if (isLoading) {
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

    if (!saveData || isError) {
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
                        putSaveIntoIndexDB({ id: saveId }).then((data) => {
                            queryClient.setQueryData([SAVES_USE_QUEY_KEY, saveId], data);
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
                        putSaveIntoIndexDB({ id: saveId }).then((data) => {
                            queryClient.setQueryData([SAVES_USE_QUEY_KEY, saveId], data);
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
                        deleteSaveFromIndexDB(saveId).then(() => {
                            queryClient.setQueryData([SAVES_USE_QUEY_KEY, saveId], null);
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
