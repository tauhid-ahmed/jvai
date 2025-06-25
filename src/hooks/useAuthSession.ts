import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useGetUserProfileQuery } from "../services/api";
import { setCredentials } from "../features/auth/authSlice";
import { useAuth } from "./useAuth";

export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  const d = useGetUserProfileQuery();

  // useEffect(() => {
  //   if (isSuccess && userProfile) {
  //     dispatch(setCredentials(userProfile));
  //   }
  // }, [isSuccess, userProfile, dispatch]);

  // return { isLoading };
};
