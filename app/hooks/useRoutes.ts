import { useMemo } from "react";
import {
  HiArrowLeftOnRectangle,
  HiSquaresPlus,
  HiUsers,
  HiTruck,
  HiChartBar,
  HiBuildingStorefront,
} from "react-icons/hi2";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// RETURN routes:ARRAY THAT CHANGES ACTIVE STATES OF THE ROUTES DYNAMICALLY AND LOGOUT TAB
const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      // {
      //   label: "Chat",
      //   href: "/conversations",
      //   icon: HiChartBar,
      //   active: pathname === "/conversations" ,
      // },
      {
        label: "Products",
        href: "/admin/products",
        icon: HiSquaresPlus,
        active: pathname === "/admin/products",
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: HiTruck,
        active: pathname === "/admin/orders",
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: HiUsers,
        active: pathname === "/admin/users",
      },
      {
        label: "Store",
        href: "/",
        icon: HiBuildingStorefront,
        // active: pathname === "/users",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
      // {
      //   label: "Settings",
      //   href: "/settings",
      //   icon: HiCog,
      //   active: pathname === "/settings",
      // },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
