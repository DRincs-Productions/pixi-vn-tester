import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingUI from "./user-interfaces/LoadingUI";

export default function App() {
    const Home = lazy(async () => import('./Home'))
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense
                fallback={<LoadingUI />}
            >
                <Home />
            </Suspense>
        </ErrorBoundary >
    )
}
