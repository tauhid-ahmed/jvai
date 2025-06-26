import { Outlet } from "react-router";
import { cn } from "../lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";
import { useLogoutMutation } from "../services/api";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";

export default function ChatLayout() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={cn("grid transition-[grid] duration-300", {
        "grid-cols-[5rem_1fr]": isMenuCollapsed,
        "grid-cols-[18rem_1fr]": !isMenuCollapsed,
      })}
    >
      <div className="h-screen flex flex-col">
        <div className="h-16 flex items-center px-4">
          {isMenuCollapsed ? (
            <Button onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}>
              M
            </Button>
          ) : (
            <div className="flex gap-2 items-center justify-between w-full">
              <Logo size="sm" />
              <Button onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}>
                X
              </Button>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-scroll">
          {/* <div className="h-screen bg-emerald-500"></div> */}
        </div>
        {!isMenuCollapsed && (
          <div className="pb-8 pt-4">
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className="px-4">
        <div className="h-16 flex gap-4 justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="size-14 inline-flex items-center justify-center rounded-full border"></span>
            <span className="flex flex-col">
              <span>Guest</span>
              <span>Welcome back</span>
            </span>
          </div>
          <Button>His</Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
