import { BrowserRouter } from 'react-router-dom';
import MyThemeProvider from './providers/ThemeProvider';

type Iprops = {
    children: React.ReactNode
}

export default function AppImports(props: Iprops) {
    return (
        <BrowserRouter>
            <MyThemeProvider>
                {props.children}
            </MyThemeProvider>
        </BrowserRouter>
    );
}
