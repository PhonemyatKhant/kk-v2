import getCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";

const ProductsPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <h1>{currentUser?.name} </h1>
    </div>
  );
};

export default ProductsPage;
