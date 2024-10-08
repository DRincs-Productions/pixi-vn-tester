import Routes from './AppRoutes';
import ApImports from './Imports';
import EventInterceptor from './interceptors/EventInterceptor';
import Settings from './screens/Settings';

export default function Home() {
    return (
        <ApImports>
            <Routes />
            <Settings />
            <EventInterceptor />
        </ApImports>
    )
}
