import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './EventInterceptor';
import { useI18n } from './i18n';
import Settings from './screens/Settings';

function App() {
    useI18n()
    return (
        <AppImports>
            <AppRoutes />
            <Settings />
            <EventInterceptor />
        </AppImports>
    )
}

export default App
