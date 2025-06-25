import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-screen grid place-items-center">
      <Outlet />
    </div>
  );
}
