import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "../api/userApi";

import UserList from "../components/users/UserList";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getUsers();

        setUsers(data);
    }

    return (
        <div className="container mt-4">
            <div className="d-flax justify-content-between align-items-center mb-4">

                <Link
                    to="/users/create"
                    className="btn btn-success mb-2"
                >
                    <i className="bi bi-plus-lg"></i>
                    {" "}
                    Nový uživatel
                </Link>

                <hr />

                <h2>Uživatelé</h2>

                <span className="badge bg-secondary">
                    {users.length}
                </span>
            </div>

            <UserList users={users} />

        </div>
    );
}