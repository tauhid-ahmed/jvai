import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  console.log({ user, token });

  const isAuthenticated = useMemo(() => !!token, [token]);

  return { isAuthenticated, user, token };
};
