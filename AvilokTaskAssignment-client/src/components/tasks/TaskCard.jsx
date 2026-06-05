export default function TaskCard({ task }) {
    return (
        <div>
            <h3>{task.shortDescription}</h3>

            <p>
                {task.createdByName}
                {" | "}
                {task.assignedUserName ?? "Nepřiřazeno"}
                {" | "}
                {task.status}
                {" | "}
                {task.deadline}
            </p>
        </div>
    );
}