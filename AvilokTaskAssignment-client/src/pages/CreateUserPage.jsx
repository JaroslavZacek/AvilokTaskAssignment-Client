import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../api/userApi";

export default function CreateUserPage() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Hesla se neshodují.");

            return;
        }

        try {
            await createUser({
                fullName,
                email,
                password
            });

            navigate("/users");
        }
        catch (error) {
            setError(
                error.message || "Nepodařilo se vytvořit uživatele."
            );
        }
    }

    return(
        <div className="container mt-4">
            <div className="row justify-content-center">¨
                <div className="col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Nový uživatel</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">

                                    <label className="form-label">
                                        Jména a příjmení
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required 
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Heslo
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Potvrzení heslo
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        required
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

                                <div className="d-flex gap-2 justify-content-center">
                                    
                                    <button
                                        type="suvmit"
                                        className="btn btn-success"
                                    >
                                        Registrovat
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/users")}
                                    >
                                        Zrušit
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}