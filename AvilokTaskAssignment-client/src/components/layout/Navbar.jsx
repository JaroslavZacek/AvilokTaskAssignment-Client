import { useNavigate, NavLink } from "react-router-dom";

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* TODO: Nahradit text Avilok firemním logem*/}
                <NavLink
                    className="navbar-brand"
                    to="/" 
                >
                    Avilok
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Přepnout navigaci"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive? "nav-link active" : "nav-link"
                                }
                            >
                                Zakázky
                            </NavLink>            
                        </li>

                        {
                            isManagement &&
                            (
                                <li className="nav-item">
                                    <NavLink
                                        to="/users"
                                        className={({ isActive}) =>
                                            isActive? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Uživatelé
                                    </NavLink>  
                                </li>
                            )
                        }
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="navbar-text">
                                {user?.fullName}
                            </span>
                        </li>

                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Odhlásit
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
