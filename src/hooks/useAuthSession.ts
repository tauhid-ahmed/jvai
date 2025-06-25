// src/hooks/useAuthSession.ts

import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useGetUserProfileQuery } from "../services/api";
// 'setCredentials' এর পরিবর্তে 'setUser' ইমপোর্ট করুন
import { setUser } from "../features/auth/authSlice";
import { useAuth } from "./useAuth";

/**
 * এই হুকটি অ্যাপ লোড হওয়ার সময় ব্যবহারকারীর সেশন ম্যানেজ করে।
 * যদি টোকেন থাকে, এটি ব্যবহারকারীর প্রোফাইল তথ্য নিয়ে আসে এবং Redux state-এ সেট করে।
 */
export const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth(); // টোকেন আছে কি না তা চেক করার জন্য

  // টোকেন থাকলেই শুধুমাত্র এই API কলটি হবে
  const {
    data: userProfile,
    isSuccess,
    isLoading,
  } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && userProfile) {
      // --- <<< এখানে সঠিক অ্যাকশনটি ব্যবহার করা হয়েছে >>> ---
      // শুধুমাত্র user তথ্যটি state-এর user প্রোপার্টিতে আপডেট করা হচ্ছে,
      // টোকেনসহ userData অবজেক্টকে স্পর্শ করা হচ্ছে না।
      dispatch(setUser(userProfile));
    }
  }, [isSuccess, userProfile, dispatch]);

  // প্রাথমিক সেশন চেকের লোডিং অবস্থা রিটার্ন করা হচ্ছে
  return { isLoading };
};
