export const getDifficultyBadgeClass = (diffculty) => {
    switch (diffculty?.toLowerCase()) {
        case "easy":
            return "badge-success"
        case "medium":
            return "badge-warning"
        case "hard":
            return "badge-error"
        default:
            return "badge-ghost"
    }
};