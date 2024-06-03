import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './interceptors/EventInterceptor';
import { InterfaceInfoFormModel } from "./models/InterfaceInfoFormModel";
import Settings from './screens/Settings';

function App() {
    const interfaceInfoForm = useForm<InterfaceInfoFormModel>({
        defaultValues: {
            canGoBack: false,
            nextStepLoading: false,
            autoEnabled: false,
            skipEnabled: false,
        },
    });
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppImports>
                <AppRoutes
                    interfaceInfoForm={interfaceInfoForm}
                />
                <Settings />
                <EventInterceptor />
            </AppImports>
        </ErrorBoundary >
    )
}

export default App
