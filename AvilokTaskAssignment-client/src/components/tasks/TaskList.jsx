import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
    return (
        <>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </>
    );
}