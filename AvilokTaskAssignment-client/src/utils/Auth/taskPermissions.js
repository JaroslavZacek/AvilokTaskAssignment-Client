import { ROLE_NAMES } from "../Tasks/roleNames";

export function isTaskLeader(user, workType) {

    const roleName = ROLE_NAMES[workType];

    return (
        user?.roles?.includes("Admin") ||
        user?.roles?.includes(`Leader ${roleName}`)
    );
}