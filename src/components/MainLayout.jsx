import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";

export default function MainLayout({ isSidebar, setIsSidebar }) {
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
}