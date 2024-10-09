import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { AspectRatio, Grid, IconButton, Skeleton, Stack, Theme, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalDialogCustom from '../components/ModalDialog';
import TypographyShadow from "../components/TypographyShadow";
import GameSaveData from '../models/GameSaveData';

export default function GameSaveScreen() {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation(["interface"]);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<GameSaveData[]>([]);

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
            }}
        >
            <Grid
                container
            >
                {/* for 6 element */}
                {Array.from({ length: 6 }).map((_, index) => {
                    let data = list.length > index ? list[index] : undefined;
                    return <Grid xs={12} sm={6} md={4} key={index}>
                        <GameSaveSlot saveData={data} />
                        {loading && <Skeleton />}
                    </Grid>
                })}
            </Grid>
        </ModalDialogCustom>
    );
}

function GameSaveSlot({ saveData }: { saveData?: GameSaveData }) {
    const { t } = useTranslation(["interface"]);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <Skeleton />
        );
    }

    if (!saveData) {
        return (
            <GameSaveEmptySlot />
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
                <IconButton>
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
                >
                    <DeleteIcon
                        fontSize={"large"}
                    />
                </IconButton>
            </Stack>
        </AspectRatio>
    );
}


function GameSaveEmptySlot() {
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
            >
                <SaveAsIcon sx={{ fontSize: '3rem', opacity: 0.2 }} />
            </IconButton>
        </AspectRatio>
    );
}
