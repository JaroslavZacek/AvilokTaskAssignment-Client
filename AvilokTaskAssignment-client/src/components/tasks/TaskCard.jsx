import { useNavigate } from "react-router-dom";

import { TASK_STATUS, getStatusClass} from "../../utils/Tasks/taskStatus";

export default function TaskCard({ task }) {

    const navigate = useNavigate();

    return (
        <div
            className="card mb-2 shadow-sm"
            style={{cursor: "pointer"}}
            onClick={() => navigate(`/task/${task.id}`)}
        >
            <div className="card-body">
                <span className="fw-bold">
                    {task.shortDescription}
                </span>

                {" | "}

                <span>
                    {task.createdByName}
                    {" → "}
                    {task.assignedUserName ?? "Nepřiřazeno"}
                </span>

                {" | "}

                <span className={`badge ${getStatusClass(task.status)}`}>
                    {TASK_STATUS[task.status]}
                </span>

                {" | "}

                <span>
                    {new Date(task.deadline).toLocaleDateString("cs-CZ")}
                </span>
            </div>
        </div>
    );
}