import { Box } from '@mui/joy';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from './AppRoutes';
import useClosePageDetector from './detectors/useClosePageDetector';
import useGoBackDetector from './detectors/useGoBackDetector';
import useKeyboardDetector from './detectors/useKeyboardDetector';
import Imports from './Imports';
import GameSaveScreen from './screens/GameSaveScreen';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import Settings from './screens/Settings';

export default function Home() {
    useGoBackDetector()
    useKeyboardDetector()
    useClosePageDetector()

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
