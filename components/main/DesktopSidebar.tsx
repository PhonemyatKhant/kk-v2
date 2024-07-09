"use client";

import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  //GET routes ARRAY CONTAINING ICONS, LABELS, SIGN OUT, etc..
  const routes = useRoutes();

  return (
    <>
      <div
        className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        dark:bg-dusk
        dark:border-lightgray
      "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.slice(0, 4).map((item) => (
              <DesktopItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <ul role="list" className="my-2">
            {" "}
            <DesktopItem
              key={routes[4].href}
              href={routes[4].href}
              label={routes[4].label}
              icon={routes[4].icon}
              active={routes[4].active}
              onClick={routes[4].onClick}
            />
          </ul>
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
