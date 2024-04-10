import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, FormHelperText, FormLabel, IconButton, ModalClose, Sheet, Stack, ToggleButtonGroup, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { HuePicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEditColorProvider } from '../providers/ThemeProvider';

interface SettingsProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export default function Settings({ open, setOpen }: SettingsProps) {
    const { mode, setMode } = useColorScheme();
    const { primaryColor, setPrimaryColor, setSolidColor, solidColor } = useEditColorProvider()
    const navigate = useNavigate();
    const location = useLocation();

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
                    <Typography level="title-md" fontWeight="bold">
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

                    <Box>
                        <FormLabel sx={{ typography: 'title-sm' }}>
                            Primary color
                        </FormLabel>
                        <FormHelperText sx={{ typography: 'body-sm' }}>
                            Choose the primary color for the theme.
                        </FormHelperText>
                    </Box>
                    <HuePicker
                        width='95%'
                        color={primaryColor}
                        onChange={(color) => setPrimaryColor(color.hex)}
                        styles={{
                            default: {
                                picker: {
                                    minHeight: '15px',
                                },
                            },
                        }}
                    />

                    <Box>
                        <FormLabel sx={{ typography: 'title-sm' }}>
                            Solid Color
                        </FormLabel>
                        <FormHelperText sx={{ typography: 'body-sm' }}>
                            Choose the solid color for the theme. It can be black or white and will be contrasting with the primary color.
                            So if the primary color is dark, the solid color will be white, and vice versa.
                        </FormHelperText>
                    </Box>
                    <ToggleButtonGroup
                        value={solidColor}
                        onChange={(_, newValue) => {
                            if (newValue)
                                setSolidColor(newValue)
                        }}
                    >
                        <Tooltip title="White">
                            <IconButton value="white">
                                <WbIncandescentIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Black">
                            <IconButton value="black">
                                <ModeNightIcon />
                            </IconButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        color="primary"
                        variant="solid"
                    >
                        <Button>Example</Button>
                    </ToggleButtonGroup>
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
                            onClick={() => {
                                navigate('/')
                                setOpen(false)
                            }}
                        >
                            Return to main menu
                        </Button>
                    </Stack>
                </>}
            </Sheet>
        </Drawer>
    );
}
