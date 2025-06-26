import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useGetUserProfileQuery } from "../services/api";
import { useAuth } from "./useAuth";
import { setUser } from "../features/auth/authSlice";

export const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const {
    data: userProfile,
    isSuccess,
    isLoading,
  } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && userProfile) {
      dispatch(setUser(userProfile));
    }
  }, [dispatch, isSuccess]);

  return { isLoading, token };
};
