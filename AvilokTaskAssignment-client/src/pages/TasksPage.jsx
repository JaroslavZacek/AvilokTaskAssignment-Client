import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskList from "../components/tasks/TaskList";
import { WORK_TYPES } from "../utils/Tasks/workTypes"

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        const data = await getTasks();
        setTasks(data);
    }

    return (
        <div className="container mt-4">
            {
                Object.entries(WORK_TYPES).map(
                    ([workType, title]) => {
                        const filteredTasks = tasks.filter(
                            t => t.workType === Number(workType)
                        );

                        return (
                            <section
                                key={workType}
                                className="mb-5"
                            >

                                <div className="d-flex align-items-center mb-3">
                                    <h4 className="mb-0">
                                        {title}
                                    </h4>

                                    <span className="badge bg-secondary ms-3">
                                        {filteredTasks.length}
                                    </span>
                                </div>

                                <TaskList tasks={filteredTasks} />

                            </section>
                        );
                    }
                )
            }
        </div>
    );
}