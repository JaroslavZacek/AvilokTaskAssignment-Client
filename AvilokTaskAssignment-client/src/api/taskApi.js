import { apiGet, apiPost, apiPatch, apiDelete } from "../utils/api";

export const getTasks = () => 
    apiGet("tasks");

export const getTaskDetail = (taskId) =>
    apiGet(`tasks/${taskId}`);

export const createTask = async (task) =>{
    return await apiPost(
        "tasks",
        task
    )
}

export const assignTask = (taskId) =>
    apiPatch(`tasks/${taskId}/assign`, {});

export const updateTaskStatus = (taskId, status) =>
    apiPatch(`tasks/${taskId}/status`, {status});

export const deleteTask = (taskId) =>
    apiDelete(`tasks/${taskId}`);