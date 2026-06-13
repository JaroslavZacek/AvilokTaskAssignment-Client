import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTaskDetail , updateTaskStatus, assignTask} from "../api/taskApi";

import { getUsers } from "../api/userApi";

import TaskComments from "../components/comments/CommentCard";

import { useAuth } from "../components/auth/AuthContext";

import { WORK_TYPES} from "../utils/Tasks/workTypes";
import { TASK_STATUS, getStatusClass} from "../utils/Tasks/taskStatus";
import { ROLE_NAMES } from "../utils/Tasks/roleNames";

import { isManagement } from "../utils/Auth/isManagement";
import { isTaskLeader } from "../utils/Auth/taskPermissions";

export default function TaskDetailPage() {
    const { taskId } = useParams();
    const { user } = useAuth();

    const [task, setTask] = useState(null);
    const [users, setUsers] = useState([]);

    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(task?.status);

    const [isEditingAssignedUser, setIsEditingAssignedUser] = useState(false);
    const [selectedAssignedUser, setSelectedAssignedUser] = useState("");

    const availableUsers = users.filter(user => {
        const roleName = ROLE_NAMES[task?.workType];

        return (
            user.roles.includes(roleName) ||
            user.roles.includes(`Leader ${roleName}`)
        );
    })

    const isLeader = isTaskLeader(user, task?.workType);

    useEffect(() => {
        loadTask();
        loadUsers();
    }, []);

    async function loadTask() {
        
        const data = await getTaskDetail(taskId);

        setTask(data);

        setSelectedStatus(data.status);

        setSelectedAssignedUser(data.assignedUserId ?? "");
    }

    
    async function loadUsers() {
        const data = await getUsers();

        setUsers(data);
    }

    async function handleSaveStatus() {
        try {
            await updateTaskStatus(
                task.id,
                selectedStatus
            );

            setTask({
                ...task,
                status: selectedStatus
            });

            setIsEditingStatus(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleSaveAssignedUser() {
        
        console.log("selectedAssignedUser:", selectedAssignedUser);

        try {
            await assignTask(
                task.id,
                selectedAssignedUser || null
            );

            const selectedUser = users.find(
                u => u.id === selectedAssignedUser
            );

            setTask({
                ...task,
                assignedUserId: selectedAssignedUser || null,
                assignedUserName: selectedUser?.fullName ?? null
            });

            setIsEditingAssignedUser(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    if (!task) {
        return (
            <div className="container mt-4">
                Načítání...
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h3 className="mb-0">{task.shortDescription}</h3>
                </div>

                <div className="card-body">
                    <div className="mb-3">
                        <strong>Popis:</strong>

                        <p className="mt-2">{task.longDescription}</p>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <strong>Zadavatel:</strong>

                                <div>
                                    {task.createdByName}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <strong>Přirazeno:</strong>

                                {
                                    !isEditingAssignedUser
                                        ? (
                                            <>
                                                <div className="mt-1">
                                                    {task.assignedUserName ?? "Nepřiřazeno"}
                                                </div>

                                                {
                                                    isLeader &&
                                                    (
                                                        <button
                                                            className="btn btn-outline-primary btn-sm mt-2"
                                                            onClick={() => {
                                                                setSelectedAssignedUser(
                                                                    task.assignedUserId ?? null
                                                                );
                                                                setIsEditingAssignedUser(true);
                                                            }}
                                                        >
                                                            Změnit
                                                        </button>
                                                    )
                                                }
                                                
                                            </>
                                        )
                                        : (
                                            <>
                                                <select
                                                    className="form-select mt-2"
                                                    value={selectedAssignedUser ?? ""}
                                                    onChange={(e) => setSelectedAssignedUser(
                                                            e.target.value === "" ? null : e.target.value)}
                                                >
                                                    <option value="">
                                                        Nepřiřazeno
                                                    </option>

                                                    {
                                                        availableUsers.map(user => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.fullName}
                                                            </option>
                                                        ))
                                                    }
                                                </select>

                                                <button
                                                    className="btn btn-success btn-sm mt-2"
                                                    onClick={handleSaveAssignedUser}
                                                >
                                                    Uložit
                                                </button>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <strong>Typ práce:</strong>

                                <div>
                                    {WORK_TYPES[task.workType]}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <strong>Stav:</strong>

                                {
                                    !isEditingStatus
                                        ? (
                                            <>
                                                <div className="mt-1">
                                                    <span className={`badge ${getStatusClass(task.status)}`}>
                                                        {TASK_STATUS[task.status]}
                                                    </span>
                                                </div>

                                                <button
                                                    className="btn btn-outline-primary btn-sm mt-2"
                                                    onClick={() => setIsEditingStatus(true)}
                                                >
                                                    Změnit
                                                </button>
                                            </>
                                        )
                                        : (
                                            <>
                                                <select
                                                    className="form-select mt-2"
                                                    value={selectedStatus}
                                                    onChange={(e) => setSelectedStatus(Number(e.target.value))}
                                                >
                                                    {
                                                        Object.entries(TASK_STATUS).map(
                                                            ([key, value]) => (
                                                                <option key={key} value={key}>
                                                                    {value}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>

                                                <button
                                                    className="btn btn-success btn-sm mt-2"
                                                    onClick={handleSaveStatus}
                                                >
                                                    Uložit
                                                </button>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div className="col-12">
                        <div className="mb-3">
                            <strong>Deadline:</strong>

                            <div>
                                {new Date(task.deadline).toLocaleDateString("cs-CZ")}
                            </div>
                        </div>
                    </div>

                    {
                        task.isOverdue &&
                        task.status !== 3 &&
                        (
                            <div className="alert alert-danger">
                                Zakázka je po termínu
                            </div>
                        )
                    }
                </div>

                <TaskComments taskId={task.id}/>
            </div>
        </div>
    );
}