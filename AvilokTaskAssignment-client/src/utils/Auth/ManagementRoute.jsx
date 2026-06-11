import { Navigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";

export default function ManagementRoute({ children }) {
    const { user } = useAuth();

    const isManagement =
        user?.roles?.includes("Admin") ||
        user?.roles?.includes("Leader Developer") ||
        user?.roles?.includes("Leader Graphic") ||
        user?.roles?.includes("Leader Story");

    return isManagement
        ? children
        : <Navigate to="/" replace />
}