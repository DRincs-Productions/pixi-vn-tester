import { narration } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { nextStepLoadingState } from './atoms/nextStepLoadingState';
import { reloadInterfaceDataEventAtom } from './atoms/reloadInterfaceDataEventAtom';
import DialogueDataEventInterceptor from './interceptors/DialogueDataEventInterceptor';
import SkipAutoInterceptor from './interceptors/SkipAutoInterceptor';
import HistoryUI from './user-interfaces/HistoryUI';
import LoadingUI from './user-interfaces/LoadingUI';
import MainMenu from './user-interfaces/MainMenu';
import NarrationUI from './user-interfaces/NarrationUI';
import QuickActions from './user-interfaces/QuickActions';
import QuickLoadAlert from './user-interfaces/QuickLoadAlert';
import TextInput from './user-interfaces/TextInput';

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
            <Route key={"main_menu"} path={"/loading"} element={<LoadingUI />} />
            <Route key={"game"} path={"/game"}
                element={<>
                    <HistoryUI />
                    <QuickLoadAlert />
                    <QuickActions />
                    <DialogueDataEventInterceptor />
                    <NarrationUI
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
