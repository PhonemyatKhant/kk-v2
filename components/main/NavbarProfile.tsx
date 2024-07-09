'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "./Avatar";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const NavbarProfile = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Dashboard</DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            router.push("/admin/products");
          }}
        >
          Products
        </DropdownMenuItem>
        <DropdownMenuItem className=" justify-between">
          <span>Orders </span>
          <span className=" font-semibold">10</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarProfile;
