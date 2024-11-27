import { Box } from '@mui/joy';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Routes from './AppRoutes';
import Imports from './Imports';
import GoBackEventInterceptor from './interceptors/GoBackEventInterceptor';
import OnKeyEventInterceptor from './interceptors/OnKeyEventInterceptor';
import RefreshSaveEventInterceptor from './interceptors/RefreshEventInterceptor';
import GameSaveScreen from './screens/GameSaveScreen';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import Settings from './screens/Settings';
import { initializeInk } from './utilities/ink-utility';
import { useMyNavigate } from './utilities/navigate-utility';

export default function Home() {
    const navigate = useMyNavigate();
    const { t: tNarration } = useTranslation(["narration"]);

    useEffect(() => {
        initializeInk({ navigate, t: tNarration })
    }, [])

    return (
        <Imports>
            <Routes />
            <Settings />
            <GameSaveScreen />
            <SaveLoadAlert />
            <OnKeyEventInterceptor />
            <GoBackEventInterceptor />
            <RefreshSaveEventInterceptor />
            <Box
                sx={{
                    pointerEvents: "auto",
                }}
            >
                <ReactQueryDevtools initialIsOpen={false} />
            </Box>
        </Imports>
    )
}
