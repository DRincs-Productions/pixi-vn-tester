import { Box } from '@mui/joy';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from './AppRoutes';
import useClosePageDetector from './hooks/useClosePageDetector';
import useKeyboardDetector from './hooks/useKeyboardDetector';
import useEventListener from './hooks/useKeyDetector';
import Imports from './Imports';
import GameSaveScreen from './screens/GameSaveScreen';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import Settings from './screens/Settings';

export default function Home() {
    useKeyboardDetector()
    useClosePageDetector()
    // Prevent the user from going back to the previous page
    useEventListener({
        type: 'popstate',
        listener: () => {
            window.history.forward();
        }
    })

    return (
        <Imports>
            <Routes />
            <Settings />
            <GameSaveScreen />
            <SaveLoadAlert />
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
