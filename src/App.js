import './App.css';
import Router from "./components/Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* Router에 Sidebar 상태와 set 함수를 전달합니다. */}
                <Router isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
