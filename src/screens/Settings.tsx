import CloseIcon from '@mui/icons-material/Close';
import { Box, CssVarsProvider, IconButton, Sheet, Stack, Typography } from "@mui/joy";

export default function HistoryInterface() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <Sheet
                component="main"
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "auto 1fr auto",
                    pointerEvents: "auto",
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        m: 2,
                    }}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Stack
                    sx={{
                        px: 2,
                        py: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack sx={{ mb: 2 }}>
                        <Typography level="h2">Settings</Typography>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        minHeight: 0,
                        px: 2,
                        py: 3,
                        overflowY: 'scroll',
                        flexDirection: 'column-reverse',
                    }}
                >
                </Box>
            </Sheet>
        </CssVarsProvider >
    );
}
