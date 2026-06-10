import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await login(email, password);

        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Heslo"
            />
            <button type="submit">
                Přihlásit
            </button>
        </form>
    )
}