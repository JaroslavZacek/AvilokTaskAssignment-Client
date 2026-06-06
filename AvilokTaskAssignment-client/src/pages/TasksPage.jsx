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
        <>
            {
                Object.entries(WORK_TYPES).map(
                    ([workType, title]) => (
                        <div key={workType}>
                            <h2>{title}</h2>

                            <TaskList
                                tasks={tasks.filter(t => t.workType === Number(workType))}
                            />

                            <hr />
                        </div>
                    )
                )
            }
        </>
    );
}