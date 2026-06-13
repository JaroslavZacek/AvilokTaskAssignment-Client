import { apiGet, apiPost, apiPatch, apiDelete } from "../utils/api";

/*---------------------------------------------*/
/*----------------Sekce zakázek----------------*/
/*---------------------------------------------*/

export const getTasks = (params = {}) => 
    apiGet("tasks", params);

export const getTaskDetail = (taskId) =>
    apiGet(`tasks/${taskId}`);

export const createTask = async (task) =>{
    return await apiPost(
        "tasks",
        task
    )
}

export const assignTask = (taskId, assignedUserId) =>
    apiPatch(`tasks/${taskId}/assign`, {assignedUserId});

export const updateTaskStatus = (taskId, status) =>
    apiPatch(`tasks/${taskId}/status`, {status});

export const deleteTask = (taskId) =>
    apiDelete(`tasks/${taskId}`);

/*---------------------------------------------*/
/*---------------Sekce komentářů---------------*/
/*---------------------------------------------*/

export const getComments = async (taskId) =>
    await apiGet(`tasks/${taskId}/comments`);

export const createComment = async (taskId, text) =>
    await apiPost(`tasks/${taskId}/comments`,{ text }
    );