import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './interceptors/EventInterceptor';
import { DialogueFormModel } from "./models/DialogueFormModel";
import Settings from './screens/Settings';

function App() {
    const dialogueForm = useForm<DialogueFormModel>({
        defaultValues: {
            character: undefined,
            text: undefined,
            menu: undefined,
            canGoBack: false,
        },
    });
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppImports>
                <AppRoutes dialogueForm={dialogueForm} />
                <Settings />
                <EventInterceptor />
            </AppImports>
        </ErrorBoundary >
    )
}

export default App
