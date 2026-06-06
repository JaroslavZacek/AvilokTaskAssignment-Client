import { BrowserRouter, Routes, Route } from "react-router-dom";

import TasksPage  from "../pages/TasksPage";
import LoginPage from "../pages/LoginPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import CreateTaskPage from "../pages/CreateTaskPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/tasks/create" element={<CreateTaskPage />} />

                <Route path="/task/:taskId" element={<TaskDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}