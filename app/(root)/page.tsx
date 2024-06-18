import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import logo from "@/public/assets/kklogo.png";

const HomePage = () => {
  return (
    <div>
      <Image src={logo} alt="logo"  />
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;
