export function isManagement(user) {

    return (
        user?.roles?.includes("Admin") ||
        user?.roles?.includes("Leader Developer") ||
        user?.roles?.includes("Leader Graphic") ||
        user?.roles?.includes("Leader Story")
    );
}