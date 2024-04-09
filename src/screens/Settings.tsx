import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, FormHelperText, FormLabel, IconButton, ModalClose, Sheet, Stack, ToggleButtonGroup, Tooltip, Typography, useColorScheme } from "@mui/joy";

export interface ISettingsProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export default function Settings({ open, setOpen }: ISettingsProps) {
    const { mode, setMode, } = useColorScheme();

    return (
        <Drawer
            size="md"
            variant="plain"
            open={open}
            onClose={() => setOpen(false)}
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
                <DialogTitle>Settings</DialogTitle>
                <ModalClose />
                <Divider sx={{ mt: 'auto' }} />
                <DialogContent sx={{ gap: 2 }}>
                    <Typography level="title-md" fontWeight="bold" sx={{ mt: 2 }}>
                        Theme
                    </Typography>
                    <Box>
                        <FormLabel sx={{ typography: 'title-sm' }}>
                            Theme mode
                        </FormLabel>
                        <FormHelperText sx={{ typography: 'body-sm' }}>
                            Choose between light, dark, or system theme mode.
                        </FormHelperText>
                    </Box>
                    <ToggleButtonGroup
                        value={mode}
                        onChange={(_, newValue) => {
                            if (newValue)
                                setMode(newValue)
                        }}
                    >
                        <Tooltip title="Light Mode">
                            <IconButton value="light">
                                <LightModeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="System Mode">
                            <IconButton value="system">
                                <AutoModeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dark Mode">
                            <IconButton value="dark">
                                <DarkModeIcon />
                            </IconButton>
                        </Tooltip>
                    </ToggleButtonGroup>

                    {/* <Box>
                        <FormLabel sx={{ typography: 'title-sm' }}>
                            Primary color
                        </FormLabel>
                        <FormHelperText sx={{ typography: 'body-sm' }}>
                            Choose the primary color for the theme.
                        </FormHelperText>
                    </Box> */}
                    {/* react-color */}
                    {/* <HuePicker
                        width='100%'
                    /> */}
                </DialogContent>

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
                    >
                        Go In Main Menu
                    </Button>
                </Stack>
            </Sheet>
        </Drawer>
    );
}
