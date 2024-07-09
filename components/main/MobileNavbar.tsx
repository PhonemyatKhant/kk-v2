"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import MobileItem from "./MobileItem";


const MobileNavbar = () => {
  const routes = useRoutes();

  return (
    <>
      <div
        className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
        dark:bg-dusk
        dark:border-lightgray
      "
      >
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
       
      </div>
    </>
  );
};

export default MobileNavbar;
