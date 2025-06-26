import { Outlet } from "react-router";
import { cn } from "../lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";
import { useLogoutMutation } from "../services/api";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";
import ModeToggle from "./mode-toggle";
import * as paths from "../paths";
import { NavLink } from "react-router-dom";

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
      <div className="h-screen flex flex-col text-grey-900 dark:text-grey-100 bg-grey-300 dark:bg-blue-400 border-r border-grey-200 dark:border-grey-900/20">
        <div className="h-16 flex items-center px-4 border-b border-grey-200 dark:border-grey-900/20">
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
        <div className="flex-1 overflow-y-scroll p-4 space-y-6 [&_*]:whitespace-nowrap!">
          {!isMenuCollapsed && <ModeToggle />}

          <Navigation isExpanded={!isMenuCollapsed} />
        </div>
        {!isMenuCollapsed && (
          <div className="pb-8 pt-4 px-4">
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className="px-4 text-grey-900 dark:text-grey-100 bg-grey-300 dark:bg-blue-400">
        <div className="h-16 flex gap-4 justify-between items-center -mx-4 px-4 bg-zinc-200 dark:bg-blue-400 border-b border-zinc-300 dark:border-zinc-900/20">
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

const navigationData = [
  {
    icon: "⚡︎",
    name: "Manage Subscription",
    to: paths.manageSubscriptionPath,
  },
  {
    icon: "👤",
    name: "Users",
    to: paths.usersPath,
  },
  {
    icon: "🤝",
    name: "Help And Support",
    to: paths.helpAndSupportPath,
  },
  {
    icon: "?",
    name: "FAQ",
    to: paths.faqPath,
  },
];

function Navigation({ isExpanded }: { isExpanded: boolean }) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {navigationData.map((nav) => (
        <li className="w-full" key={nav.name}>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-200 text-white" : ""
              } w-full flex flex-1 items-center -mx-4x px-4 py-2 rounded`
            }
            to={nav.to()}
          >
            <span className="flex size-8 text-xl leading-none tracking-tight rounded items-center justify-center">
              <span className="-ml-0.5">{nav.icon}</span>
            </span>
            {isExpanded && nav.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
