import UserCard from "./UserCard";3

export default function UserList({ users }) {

    return (
        <div className="row">
            {
                users.map(user => (
                    <div
                        key={user.id}
                        className="col-md-6 col-xl-4 mb-3"
                    > 
                        <UserCard user={user} />
                    </div>

                ))
            }
        </div>
    );
}