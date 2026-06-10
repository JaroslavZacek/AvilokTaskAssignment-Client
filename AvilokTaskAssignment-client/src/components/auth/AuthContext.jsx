import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            const data = await getCurrentUser();

            setUser(data);
        }
        catch (error) {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    function logoutUser() {
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: user !== null,
                reloadUser: loadUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}