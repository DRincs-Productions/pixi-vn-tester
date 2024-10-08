import Routes from './AppRoutes';
import ApImports from './Imports';
import EventInterceptor from './interceptors/EventInterceptor';
import SettingsUI from './user-interfaces/SettingsUI';

export default function Home() {
    return (
        <ApImports>
            <Routes />
            <SettingsUI />
            <EventInterceptor />
        </ApImports>
    )
}
