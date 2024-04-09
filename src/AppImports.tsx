import { CssVarsProvider, extendTheme } from '@mui/joy';
import { BrowserRouter } from 'react-router-dom';

type Iprops = {
    children: React.ReactNode
}

export default function AppImports(props: Iprops) {
    const theme = extendTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        solidBg: '#0040f0',
                    },
                },
            },
            dark: {
                palette: {
                    primary: {
                        solidBg: '#0040f0',
                    },
                },
            },
        },
    })

    return (
        <BrowserRouter>
            <CssVarsProvider
                theme={theme}
            >
                {props.children}
            </CssVarsProvider>
        </BrowserRouter>
    );
}
