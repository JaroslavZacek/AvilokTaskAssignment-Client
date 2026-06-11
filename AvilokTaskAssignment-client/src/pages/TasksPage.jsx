import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTasks } from "../api/taskApi";
import { getUsers } from "../api/userApi";

import TaskList from "../components/tasks/TaskList";

import { WORK_TYPES } from "../utils/Tasks/workTypes"
import { TASK_STATUS } from "../utils/Tasks/taskStatus";

export default function TasksPage() {
    
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [workTypeFilter, setWorkTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState("");
    const [assignedUserFilter, setAssignedUserFilter] = useState("");

    useEffect(() => {
        loadUsers();
        loadTasks();
    }, []);

    async function loadUsers() {
        const data = await getUsers();

        setUsers(data);
    }

    async function loadTasks() {
        
        const data = await getTasks({
            workType: workTypeFilter || undefined,
            status: statusFilter || undefined,
            createdById: createdByFilter || undefined,
            assignedUserId: assignedUserFilter || undefined
        });

        setTasks(data);
    }

    async function clearFilters() {
        setWorkTypeFilter("");
        setStatusFilter("");
        setCreatedByFilter("");
        setAssignedUserFilter("");

        const data = await getTasks();

        setTasks(data);
    }

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Filter zakázek</h5>

                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label">Typ práce</label>

                            <select
                                className="form-select"
                                value={workTypeFilter}
                                onChange={(e) => setWorkTypeFilter(e.target.value)}
                            >
                                <option value="">Vše</option>

                                {
                                    Object.entries(WORK_TYPES).map(
                                        ([key, value]) => (
                                            <option
                                                key={key}
                                                value={key}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Stav</label>

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Vše</option>

                                {
                                    Object.entries(TASK_STATUS).map(
                                        ([key, value]) => (
                                            <option
                                                key={key}
                                                value={key}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Vytvořil</label>

                            <select
                                className="form-select"
                                value={createdByFilter}
                                onChange={(e) => setCreatedByFilter(e.target.value)}
                            >
                                <option value="">Všichni</option>

                                {
                                    users.map(user => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.fullName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Přiřazen</label>

                            <select
                                className="form-select"
                                value={assignedUserFilter}
                                onChange={(e) => setAssignedUserFilter(e.target.value)}
                            >
                                <option value="">Všichni</option>

                                {
                                    users.map(user => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.fullName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mt-3">
                                <button className="btn btn-primary" onClick={loadTasks}>
                                    Filtrovat
                                </button>

                                <button className="btn btn-outline-secondary ms-2" onClick={clearFilters}>
                                    Vymazat filtr
                                </button>

                                
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <Link to="tasks/create" className="btn btn-success">
                    <i className="bi bi-plus-lg"></i>
                    {" "}
                    Nová zakázka
                </Link>
            </div>

            {

                
                Object.entries(WORK_TYPES).map(
                    ([workType, title]) => {
                        const filteredTasks = tasks.filter(t => t.workType === Number(workType));

                        return (
                            <section
                                key={workType}
                                className="mb-5"
                            >
                                <div className="d-flex align-items-center mb-3">
                                    <h4 className="mb-0">{title}</h4>

                                    <span className="badge bg-secondary ms-3">
                                        {filteredTasks.length}
                                    </span>
                                </div>

                                <TaskList tasks={filteredTasks}/>
                            </section>
                        );
                    }   
                )
            }

        </div>
    );
}