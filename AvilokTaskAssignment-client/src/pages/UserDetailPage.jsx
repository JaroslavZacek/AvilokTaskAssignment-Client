import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUser } from "../api/userApi";

export default function UserDetailPage() {

    const { userId } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        
        const data = await getUser(userId);

        setUser(data);
    }

    if (!user) {
        return (
            <div className="container mt-4">
                Načítání...
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title mb-4">{user.fullName}</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <strong>Email:</strong>

                                <div>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <h5>Role</h5>

                        {
                            user.roles.length > 0
                                ? (
                                    user.roles.map(role => (
                                        <span
                                            key={role}
                                            className="badge bg-secondary me-2"
                                        >
                                            {role}
                                        </span>
                                    ))
                                )
                                : (
                                    <p className="text-muted">
                                        Uživatel nemá žádnou roli.
                                    </p>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}