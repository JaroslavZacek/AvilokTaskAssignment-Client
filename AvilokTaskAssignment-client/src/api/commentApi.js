import { apiGet, apiPost, apiPatch, apiDelete } from "../utils/api";

export const getComments = async (taskId) =>
    await apiGet(`tasks/${taskId}/comments`);

export const createComment = async (taskId, text) =>
    await apiPost(`tasks/${taskId}/comments`,{ text }
    );

export const deleteComment = async (commentId) =>
    await apiDelete(`tasks/comments/${commentId}`);