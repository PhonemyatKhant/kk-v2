
import Sidebar from "@/components/main/Sidebar";
import React from "react";


const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    // CHILDREN PL 20 H FULL
    <Sidebar>
      
      <div className=" h-full">{children} </div>
    </Sidebar>
  );
};

export default layout;
