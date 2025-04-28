import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveRole,
  setActiveRole,
} from "@/redux/features/auth/authSlice";
import { useUser } from "@/features/auth";

export const useActiveRole = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectActiveRole);

  function changeRole(role) {
    dispatch(setActiveRole(role));
  }

  return useMemo(() => [role, changeRole], [role]);
};

export function useRoles() {
  const user = useUser();
  return useMemo(() => user?.roles || [], [user]);
}

export const useNextRoute = () => {
  const next = new URLSearchParams(location.search).get('next')
  return next || null
}