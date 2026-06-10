import { BrowserRouter, Routes, Route } from "react-router-dom";

import TasksPage  from "../pages/TasksPage";
import LoginPage from "../pages/LoginPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import CreateTaskPage from "../pages/CreateTaskPage";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../utils/Auth/ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/login" element={<LoginPage />} />
                
                <Route 
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TasksPage />
                            </Layout>
                        </ProtectedRoute>        
                    }
                />

                <Route 
                    path="/tasks/create" 
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <CreateTaskPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="/task/:taskId" 
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TaskDetailPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}