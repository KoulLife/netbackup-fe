import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Board from "../pages/board/Board";
import Dashboard from "../pages/dashboard/Dashboard"
import MainLayout from "./MainLayout";

export default function Router({ isSidebar, setIsSidebar }) {
    return (
        <Routes>
            {/* 로그인은 레이아웃 없이 */}
            <Route path="/login" element={<Login />} />

            {/* 메인 레이아웃은 여기로 묶기 */}
            <Route element={<MainLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}>
                <Route path="/board" element={<Board />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* 다른 내부 페이지들은 여기로 추가 */}
            </Route>
        </Routes>
    );
}