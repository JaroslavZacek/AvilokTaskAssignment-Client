import { apiGet, apiPatch } from "../utils/api";

export const getUsers = () =>
    apiGet("users");
