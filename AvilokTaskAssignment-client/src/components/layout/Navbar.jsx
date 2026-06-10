import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../api/authApi";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        logoutUser
    } = useAuth();

    const isManagement =
        user?.roles?.includes("Admin") ||
        user?.roles?.includes("Leader Developer") ||
        user?.roles?.includes("Leader Graphic") ||
        user?.roles?.includes("Leader Story");

    async function handleLogout() {
        try {
            await logout();

            logoutUser();

            navigate("/login");
            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <nav>
            <Link to="/">
                Zakázky
            </Link>

            {
                isManagement &&
                (
                    <>
                        <Link to="/users">
                            Uživatelé
                        </Link>
                    </>
                )
            }

            <span>
                {user?.email}
            </span>

            <button onClick={handleLogout}>
                Odhlásit
            </button>
        </nav>
    );
}
