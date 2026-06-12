import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { assignRole, getUser, removeRole } from "../api/userApi";
import { ROLES } from "../utils/Users/roles";


export default function UserDetailPage() {

    const { userId } = useParams();

    const [user, setUser] = useState(null);

    const [isEditingRoles, setIsEditingRoles] = useState(false);
    const [selectedRoleToAdd, setSelectedRoleToAdd] = useState("");
    const [selectedRoleToRemove, setSelectedRoleToRemove] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        
        const data = await getUser(userId);

        setUser(data);
    }

    async function handleAddRole() {
        
        try {
            await assignRole(user.id, selectedRoleToAdd);

            setUser({
                ...user,
                roles: [...user.roles, selectedRoleToAdd]

            });

            setSelectedRoleToAdd("");
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleRemoveRole() {
        
        try {
            await removeRole(user.id, selectedRoleToRemove);

            setUser({
                ...user,
                roles: user.roles.filter(
                    role => role !== selectedRoleToRemove
                )
            });

            setSelectedRoleToRemove("");
        }
        catch (error) {
            console.error(error);
        }
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
                        

                        <div className="row">
                            <div className="row-2">
                                <h5>Role</h5>
                            </div>

                            <div className="row-5 mb-2">
                                {
                                    user.roles.length > 0
                                        ? (
                                            user.roles.map(role => (
                                                <div
                                                    key={role}
                                                    className="badge bg-secondary me-2"
                                                >
                                                    {role}
                                                </div>
                                            ))
                                        )
                                        : (
                                            <div className="text-muted">
                                                Uživatel nemá žádnou roli.
                                            </div>
                                        )
                                }
                            </div>

                            <div className="row-5">
                                {
                                    !isEditingRoles
                                        ? (
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => setIsEditingRoles(true)}
                                            >
                                                Změnit
                                            </button>
                                        )
                                        : (
                                            <div className="row mt-3">

                                                <div className="col-md-6">

                                                    <h6>
                                                        Přidat roli
                                                    </h6>

                                                    <select
                                                        className="form-select mb-2"
                                                        value={selectedRoleToAdd}
                                                        onChange={(e) =>
                                                            setSelectedRoleToAdd(
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="">
                                                            Vyber roli
                                                        </option>

                                                        {
                                                            ROLES
                                                                .filter(role =>
                                                                    !user.roles.includes(role)
                                                                )
                                                                .map(role => (
                                                                    <option
                                                                        key={role}
                                                                        value={role}
                                                                    >
                                                                        {role}
                                                                    </option>
                                                                ))
                                                        }

                                                    </select>

                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        disabled={!selectedRoleToAdd}
                                                        onClick={handleAddRole}
                                                    >
                                                        Přidat
                                                    </button>

                                                </div>

                                                <div className="col-md-6">

                                                    <h6>
                                                        Odebrat roli
                                                    </h6>

                                                    <select
                                                        className="form-select mb-2"
                                                        value={selectedRoleToRemove}
                                                        onChange={(e) =>
                                                            setSelectedRoleToRemove(
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="">
                                                            Vyber roli
                                                        </option>

                                                        {
                                                            user.roles.map(role => (
                                                                <option
                                                                    key={role}
                                                                    value={role}
                                                                >
                                                                    {role}
                                                                </option>
                                                            ))
                                                        }

                                                    </select>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        disabled={!selectedRoleToRemove}
                                                        onClick={handleRemoveRole}
                                                    >
                                                        Odebrat
                                                    </button>

                                                </div>

                                                <div className="mt-3">
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setIsEditingRoles(false)}
                                                    >
                                                        Hotovo
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}