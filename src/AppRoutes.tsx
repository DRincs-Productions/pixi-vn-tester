import { narration } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { useQueryClient } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { nextStepLoadingState } from './atoms/nextStepLoadingState';
import { reloadInterfaceDataEventAtom } from './atoms/reloadInterfaceDataEventAtom';
import SkipAutoInterceptor from './interceptors/SkipAutoInterceptor';
import GameSaveScreen from './screens/GameSaveScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoadingScreen from './screens/LoadingScreen';
import MainMenu from './screens/MainMenu';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import TextInput from './screens/modals/TextInput';
import NarrationScreen from './screens/NarrationScreen';
import QuickTools from './screens/QuickTools';
import { INTERFACE_DATA_USE_QUEY_KEY } from './use_query/useQueryInterface';

export default function AppRoutes() {
    const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventAtom);
    const setNextStepLoading = useSetRecoilState(nextStepLoadingState);
    const queryClient = useQueryClient()

    async function nextOnClick(props: StepLabelProps): Promise<void> {
        setNextStepLoading(true);
        try {
            if (!narration.canGoNext) {
                setNextStepLoading(false);
                return;
            }
            narration.goNext(props)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                    notifyReloadInterfaceDataEvent((p) => p + 1);
                    setNextStepLoading(false);
                })
                .catch((e) => {
                    setNextStepLoading(false);
                    console.error(e);
                })
            return;
        } catch (e) {
            setNextStepLoading(false);
            console.error(e);
            return;
        }
    }

    return (
        <Routes>
            <Route key={"main_menu"} path={"/"} element={<MainMenu />} />
            <Route key={"main_menu"} path={"/loading"} element={<LoadingScreen />} />
            <Route key={"narration"} path={"/narration"}
                element={<>
                    <HistoryScreen />
                    <GameSaveScreen />
                    <SaveLoadAlert />
                    <QuickTools />
                    <NarrationScreen
                        nextOnClick={nextOnClick}
                    />
                    <SkipAutoInterceptor
                        nextOnClick={nextOnClick}
                    />
                    <TextInput />
                </>}
            />
            <Route path="*" element={<MainMenu />} />
        </Routes>
    )
}
