import { GameStepManager } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { UseFormReturn } from 'react-hook-form';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { reloadInterfaceDataEventState } from './atoms/reloadInterfaceDataEventState';
import SkipAutoInterceptor from './interceptors/SkipAutoInterceptor';
import { DialogueFormModel } from './models/DialogueFormModel';
import { InterfaceInfoFormModel } from './models/InterfaceInfoFormModel';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
import QuickActions from './screens/QuickActions';

export default function AppRoutes({ dialogueForm, interfaceInfoForm }: {
    dialogueForm: UseFormReturn<DialogueFormModel, any, undefined>,
    interfaceInfoForm: UseFormReturn<InterfaceInfoFormModel, any, undefined>,
}) {
    const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventState);
    async function nextOnClick(props: StepLabelProps): Promise<void> {
        let loading = interfaceInfoForm.getValues('nextStepLoading')
        if (loading) {
            return Promise.resolve()
        }
        interfaceInfoForm.setValue('nextStepLoading', true)
        try {
            await GameStepManager.runNextStep(props);
            notifyReloadInterfaceDataEvent((p) => p + 1);
            interfaceInfoForm.setValue('nextStepLoading', false);
            return;
        } catch (e) {
            interfaceInfoForm.setValue('nextStepLoading', false);
            console.error(e);
            return;
        }
    }

    return (
        <Routes>
            <Route key={"main_menu"} path={"/"} element={<MainMenu />} />
            <Route key={"game"} path={"/game"}
                element={<>
                    <History />
                    <QuickActions interfaceInfoForm={interfaceInfoForm} />
                    <Dialogue
                        dialogueForm={dialogueForm}
                        interfaceInfoForm={interfaceInfoForm}
                        nextOnClick={nextOnClick}
                    />
                    <SkipAutoInterceptor
                        interfaceInfoForm={interfaceInfoForm}
                        nextOnClick={nextOnClick}
                    />
                </>}
            />
        </Routes>
    )
}
