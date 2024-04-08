import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppImports from './AppImports';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
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
                    element={<Dialogue upadateInterface={update} />}
                />
                <Route key={"history"} path={"/history"}
                    element={<History />}
                />
                <Route key={"settings"} path={"/settings"}
                    element={<Settings />}
                />
            </Routes>
        </AppImports>
    )
}

export default App
