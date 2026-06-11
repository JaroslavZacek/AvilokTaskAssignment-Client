import { apiGet } from "../utils/api";

export const getUsers = () =>
    apiGet("users");