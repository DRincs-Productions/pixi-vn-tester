import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingPage from "./user-interfaces/LoadingPage";

export default function App() {
    const Home = lazy(async () => import('./Home'))
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense
                fallback={<LoadingPage />}
            >
                <Home />
            </Suspense>
        </ErrorBoundary >
    )
}
