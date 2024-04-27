import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './EventInterceptor';
import { useI18n } from './i18n';
import History from './screens/History';
import Settings from './screens/Settings';

function App() {
    useI18n()
    return (
        <AppImports>
            <AppRoutes />
            <Settings />
            <History />
            <EventInterceptor />
        </AppImports>
    )
}

export default App
