import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { AspectRatio, Grid, IconButton, Skeleton, Stack, Theme, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalDialogCustom from '../components/ModalDialog';
import TypographyShadow from "../components/TypographyShadow";
import GameSaveData from '../models/GameSaveData';
import { deleteSaveFromIndexDB, getSaveFromIndexDB, putSaveIntoIndexDB } from '../utilities/save-utility';

export default function GameSaveScreen() {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation(["interface"]);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

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
                    return <Grid xs={12} sm={6} md={4} key={index}>
                        <GameSaveSlot saveId={index} />
                    </Grid>
                })}
            </Grid>
        </ModalDialogCustom>
    );
}

function GameSaveSlot({ saveId }: { saveId: number }) {
    const { t } = useTranslation(["interface"]);
    const [loading, setLoading] = useState(true);
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
                    {`${t("slot")} ${0 + 1}`}
                </TypographyShadow>
            </Stack>
            <Stack
                direction={"row"}
                position={"absolute"}
                bottom={10}
                right={10}
            >
                <IconButton>
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
                <IconButton>
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
