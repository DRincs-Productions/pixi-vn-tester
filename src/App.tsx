import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppImports from './AppImports';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
import QuickActions from './screens/QuickActions';
import Settings from './screens/Settings';

function App() {
    const [update, setUpdate] = useState(0)

    return (
        <AppImports>
            <Routes>
                <Route key={"main_menu"} path={"/"} element={<MainMenu
                    updateInterface={() => setUpdate((p) => p + 1)}
                />} />
                <Route key={"game"} path={"/game"}
                    element={<>
                        <Dialogue
                            upadateInterface={update}
                        />
                        <QuickActions
                            afterLoad={() => setUpdate((p) => p + 1)}
                        />
                    </>}
                />
            </Routes>
            <Settings />
            <History />
        </AppImports>
    )
}

export default App
