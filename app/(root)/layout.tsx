import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className=" h-full">{children} </div>;
};

export default MainLayout;
