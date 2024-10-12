import { narration } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { nextStepLoadingState } from './atoms/nextStepLoadingState';
import { reloadInterfaceDataEventAtom } from './atoms/reloadInterfaceDataEventAtom';
import DialogueDataEventInterceptor from './interceptors/DialogueDataEventInterceptor';
import SkipAutoInterceptor from './interceptors/SkipAutoInterceptor';
import GameSaveScreen from './screens/GameSaveScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoadingScreen from './screens/LoadingScreen';
import MainMenu from './screens/MainMenu';
import SaveLoadAlert from './screens/modals/SaveLoadAlert';
import TextInput from './screens/modals/TextInput';
import NarrationScreen from './screens/NarrationScreen';
import QuickTools from './screens/QuickTools';

export default function AppRoutes() {
    const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventAtom);
    const setNextStepLoading = useSetRecoilState(nextStepLoadingState);
    async function nextOnClick(props: StepLabelProps): Promise<void> {
        setNextStepLoading(true);
        try {
            if (!narration.canGoNext) {
                setNextStepLoading(false);
                return;
            }
            narration.goNext(props)
                .then(() => {
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
                    <DialogueDataEventInterceptor />
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
