"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HiPlusCircle } from "react-icons/hi2";

const ProductsPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" flex items-start justify-between">
      <h1 className=" sub-title">All Products List</h1>
      <HiPlusCircle
        onClick={() => router.push("/admin/products/create")}
        className=" cursor-pointer hover:text-primary h-8 w-8 text-primary/80"
      />
      </div>

      TABLE
    </div>
  );
};

export default ProductsPage;
