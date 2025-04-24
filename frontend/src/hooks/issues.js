import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMeta,
  selectMeta,
} from "@/redux/features/issuesSilce";

export const useIssuesMeta = () => {
  const dispatch = useDispatch();
  const metas = useSelector(selectMeta);

  return useMemo(() => metas, [metas]);
};
