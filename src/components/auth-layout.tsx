import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { chatPath } from "../paths";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(chatPath(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen grid place-items-center">
      <Outlet />
    </div>
  );
}
