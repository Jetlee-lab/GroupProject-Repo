// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
export const BACKEND_URL = 'https://groupproject-repo.onrender.com'
export const API_URL = `${BACKEND_URL}/api/v1`;

const STATUS_OPEN = "open";
const STATUS_INREVIEW = "in_review";
const STATUS_ESCALATED = "escalated";
const STATUS_RESOLVED = "resolved";
const STATUS_REJECTED = "rejected";
const STATUS_CLOSED = "closed";


export {
    STATUS_OPEN,
    STATUS_INREVIEW,
    STATUS_ESCALATED,
    STATUS_RESOLVED,
    STATUS_REJECTED,
    STATUS_CLOSED,
}