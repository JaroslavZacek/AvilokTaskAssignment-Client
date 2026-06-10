import { apiGet, apiPost } from "../utils/api";

export const login = (email, password) =>
    apiPost("auth/login", {
        email,
        password,
        rememberMe: true
    });

export const getCurrentUser = () =>
    apiGet("auth/me")