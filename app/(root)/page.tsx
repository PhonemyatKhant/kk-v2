import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import logo from "@/public/assets/kklogo.png";
import { signOut } from "next-auth/react";

const HomePage = () => {
  return (
    <div>
      <Image src={logo} alt="logo" />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default HomePage;
