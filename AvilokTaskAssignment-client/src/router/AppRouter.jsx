import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TasksPage } from "../pages/TasksPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
}