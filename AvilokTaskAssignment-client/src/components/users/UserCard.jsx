import { Link } from "react-router-dom";

export default function UserCard({ user}) {

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">
                    {user.fullName}
                </h5>

                <div className="text-muted mb-2">
                    {user.email}
                </div>

                <div>
                    {
                        user.roles.map(role => (
                            <span
                                key={role}
                                className="badge bg-secondary me-1"
                            >
                                {role}
                            </span>
                        ))
                    }
                </div>
            </div>

            <div className="card-footer bg-transparent border-0">
                <Link
                    to={`/user/${user.id}`}
                    className="btn btn-outline-primary btn-sm"
                >
                    Detail
                </Link>
            </div>
        </div>
    );
}