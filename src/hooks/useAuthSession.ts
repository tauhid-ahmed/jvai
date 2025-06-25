import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useGetUserProfileQuery } from "../services/api";
import { setUser } from "../features/auth/authSlice";
import { useAuth } from "./useAuth";

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
  }, [isSuccess, userProfile, dispatch]);

  return { isLoading };
};
