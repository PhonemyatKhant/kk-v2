import React from "react";
import DesktopSidebar from "./DesktopSidebar";

import getCurrentUser from "@/app/actions/getCurrentUser";
import MobileNavbar from "./MobileNavbar";

// ADD MOBILE NAV AND SIDEBAR ON TOP OF THE PAGE
// PL 20 FOR FIXED SIDEBAR AND RENDER IN FULL HEIGHT

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileNavbar />
      <main
        className="lg:pl-20 px-4 
          py-5 
          sm:px-6 
          lg:px-8 
          lg:py-6 
          h-full"
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
