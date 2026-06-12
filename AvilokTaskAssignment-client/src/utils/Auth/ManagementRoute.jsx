import { Navigate } from "react-router-dom";

import { useAuth } from "../../components/auth/AuthContext";
import { isManagement } from "./isManagement";

export default function ManagementRoute({ children }) {
    const { user } = useAuth();

    return isManagement(user)
        ? children
        : <Navigate to="/" replace />
}