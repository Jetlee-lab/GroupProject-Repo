import {
  CheckCircle2Icon,
  LoaderIcon,
  TrendingUpIcon,
  ArrowUp,
  CircleX,
  Loader,
  CircleEllipsis,
  Lock,
  AlertTriangle,
} from "lucide-react";

let BACKEND_URL;

if (import.meta.env.DEV) {
  BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
} else {
  // https://groupproject-repo.onrender.com
  // https://aits-groups-d962bd2c1d87.herokuapp.com

  BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://aits-groups-d962bd2c1d87.herokuapp.com";
}

export { BACKEND_URL };
export const API_URL = `${BACKEND_URL}/api/v1`;

export const STATUS_PENDING = "pending";
export const STATUS_INREVIEW = "in_review";
export const STATUS_ESCALATED = "escalated";
export const STATUS_RESOLVED = "resolved";
export const STATUS_REJECTED = "rejected";
export const STATUS_CLOSED = "closed";

export const statusMap = {
  [STATUS_RESOLVED]: {
    icon: CheckCircle2Icon,
    color: "green",
  },
  [STATUS_PENDING]: {
    icon: Loader,
    color: "blue"
  },
  [STATUS_ESCALATED]: {
    icon: ArrowUp,
    color: "yellow",
  },
  [STATUS_REJECTED]: {
    icon: CircleX,
    color: "red",
  },
  [STATUS_INREVIEW]: {
    icon: CircleEllipsis,
    color: "purple",
  },
  [STATUS_CLOSED]: {
    icon: Lock,
    color: "gray",
  },
};

export const PRIOTITY_LOW = "low";
export const PRIOTITY_MODERATE = "moderate";
export const PRIOTITY_HIGH = "high";
export const PRIOTITY_CRITICAL = "critical";

export const priorityMap = {
  [PRIOTITY_LOW]: {
    icon: CheckCircle2Icon,
    color: "blue",
  },
  [PRIOTITY_MODERATE]: {
    icon: CircleEllipsis,
    color: "gray",
  },
  [PRIOTITY_HIGH]: {
    icon: ArrowUp,
    color: "orange",
  },
  [PRIOTITY_CRITICAL]: {
    icon: AlertTriangle,
    color: "red",
  },
};

export const ESCALATION_L0 = "level_0";
export const ESCALATION_L1 = "level_1";
export const ESCALATION_L2 = "level_2";

export const ROLE_STUDENT = "student"
export const ROLE_LECTURER = "lecturer"
export const ROLE_REGISTRAR = "registrar"
