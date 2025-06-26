import { Outlet, useNavigate } from "react-router";
import { useAuthSession } from "../hooks/useAuthSession";
import { useAppSelector } from "../app/hooks";
import { selectVerifiedUser } from "../features/auth/authSlice";
import { chatPath } from "../paths";

export default function AuthLayout() {
  const { isLoading } = useAuthSession();
  const navigate = useNavigate();

  const verifiedUser = useAppSelector(selectVerifiedUser);

  if (verifiedUser?.is_verified) {
    navigate(chatPath());
  }

  if (isLoading) return <>Loading</>;
  return (
    <div className="h-screen grid place-items-center">
      <Outlet />
    </div>
  );
}
