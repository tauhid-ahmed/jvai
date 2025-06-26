import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";

export const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const isAuthenticated = useMemo(() => !!token && user?.is_verified, [token]);

  return { isAuthenticated, token };
};
