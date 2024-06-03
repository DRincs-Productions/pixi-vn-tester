import { UseFormReturn } from 'react-hook-form';
import { Route, Routes } from 'react-router-dom';
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
                    />
                </>}
            />
        </Routes>
    )
}
