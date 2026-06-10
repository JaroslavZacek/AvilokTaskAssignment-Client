import { Navigate } from "react-router-dom";

import { useAuth } from "../../components/auth/AuthContext";

export default function ProtectedRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Načítání...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
}