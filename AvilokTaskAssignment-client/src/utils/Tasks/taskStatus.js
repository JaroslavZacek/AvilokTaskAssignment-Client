export const TASK_STATUS = {
    0: "Not started",
    1: "In progress",
    2: "Need Revision",
    3: "Finished",
    4: "Closed"
}

export function getStatusClass(status) {
    switch (status) {
        case 0:
            return "bg-secondary";
        case 1:
            return "bg-primary";
        case 2:
            return "bg-warning text-dark";
        case 3:
            return "bg-success";
        default:
            return "bg-secondary"
    }
}