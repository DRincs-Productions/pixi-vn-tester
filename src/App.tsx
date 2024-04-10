import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppImports from './AppImports';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
import Settings from './screens/Settings';

function App() {
    const [update, setUpdate] = useState(0)
    const [openSettings, setOpenSettings] = useState(false)

    return (
        <AppImports>
            <Routes>
                <Route key={"main_menu"} path={"/"} element={<MainMenu
                    updateInterface={() => setUpdate((p) => p + 1)}
                    openSettings={() => setOpenSettings(true)}
                />} />
                <Route key={"game"} path={"/game"}
                    element={<Dialogue
                        upadateInterface={update}
                        openSettings={() => setOpenSettings(true)}
                    />}
                />
                <Route key={"history"} path={"/history"}
                    element={<History />}
                />
            </Routes>
            <Settings
                open={openSettings}
                setOpen={setOpenSettings}
            />
        </AppImports>
    )
}

export default App
