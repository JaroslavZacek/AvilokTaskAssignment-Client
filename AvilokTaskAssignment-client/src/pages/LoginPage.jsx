import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";
import { useAuth } from "../components/auth/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();

    const { reloadUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);

            await reloadUser();

            navigate("/");
        }
        catch{
            setError("Špatné přihlašovací údaje.")
        }
        finally{
            setLoading(false);
        }

        
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Přihlášení</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Heslo</label>
                                    
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>

                                {
                                    error &&
                                    (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )
                                }

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {
                                        loading ? "Přihlašuji..." : "Přihlásit"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}