import { apiGet, apiPatch, apiPost } from "../utils/api";

export const getUsers = () =>
    apiGet("users");


export const createUser = async (user) =>
    await apiPost(
        "/auth/register",
        user
    )