"use client";

import { User } from "@prisma/client";
import Image from "next/image";

// import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

  return (
    <div className="relative h-9 md:h-11">
      <div
        className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Image
          className="object-cover"
          fill
          src={user?.image || "/images/profile.png"}
          alt="Avatar"
          sizes="36px"
        />
      </div>
     
      
    </div>
  );
};

export default Avatar;
