import { Box } from '@mui/joy';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from './AppRoutes';
import ApImports from './Imports';
import EventInterceptor from './interceptors/EventInterceptor';
import GameSaveScreen from './screens/GameSaveScreen';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import Settings from './screens/Settings';

export default function Home() {
    return (
        <ApImports>
            <Routes />
            <Settings />
            <GameSaveScreen />
            <SaveLoadAlert />
            <EventInterceptor />
            <Box
                sx={{
                    pointerEvents: "auto",
                }}
            >
                <ReactQueryDevtools initialIsOpen={false} />
            </Box>
        </ApImports>
    )
}
