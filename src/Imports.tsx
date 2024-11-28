import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useI18n } from './i18n';
import MyThemeProvider from './providers/ThemeProvider';

export default function Imports({ children }: {
    children: React.ReactNode
}) {
    useI18n()
    const queryClient = new QueryClient()

    return (
        <BrowserRouter>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <MyThemeProvider>
                        <SnackbarProvider
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {children}
                        </SnackbarProvider>
                    </MyThemeProvider>
                </QueryClientProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}
