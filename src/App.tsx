import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './interceptors/EventInterceptor';
import InterfaceEvantInterceptor from "./interceptors/InterfaceEvantInterceptor";
import { DialogueFormModel } from "./models/DialogueFormModel";
import { InterfaceInfoFormModel } from "./models/InterfaceInfoFormModel";
import Settings from './screens/Settings';

function App() {
    const dialogueForm = useForm<DialogueFormModel>({
        defaultValues: {
            character: undefined,
            text: undefined,
            menu: undefined,
            showDialogueCard: true,
            showNextButton: true,
        },
    });
    const interfaceInfoForm = useForm<InterfaceInfoFormModel>({
        defaultValues: {
            canGoBack: false,
            nextStepLoading: false,
        },
    });
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppImports>
                <AppRoutes
                    dialogueForm={dialogueForm}
                    interfaceInfoForm={interfaceInfoForm}
                />
                <Settings />
                <EventInterceptor />
                <InterfaceEvantInterceptor
                    dialogueForm={dialogueForm}
                    interfaceInfoForm={interfaceInfoForm}
                />
            </AppImports>
        </ErrorBoundary >
    )
}

export default App
