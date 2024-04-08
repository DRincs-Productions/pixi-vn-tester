import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppImports from './AppImports';
import DialogueInterface from './screens/DialogueInterface';
import HistoryInterface from './screens/HistoryInterface';
import MainMenu from './screens/MainMenu';

function App() {
    const [update, setUpdate] = useState(0)

    return (
        <AppImports>
            <Routes>
                <Route key={"main_menu"} path={"/"} element={<MainMenu
                    updateInterface={() => setUpdate((p) => p + 1)}
                />} />
                <Route key={"game"} path={"/game"}
                    element={<DialogueInterface upadateInterface={update} />}
                />
                <Route key={"history"} path={"/history"}
                    element={<HistoryInterface />}
                />
            </Routes>
        </AppImports>
    )
}

export default App
