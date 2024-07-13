import React from "react";
import ProductsPage from "../../../components/products/ProductsPage";
import getProduct from "@/app/actions/getProduct";

const Products = async () => {
  
  const pageIndex = 0;
 
  const allProducts = await getProduct({},pageIndex);
  if (allProducts?.products?.length! > 0) {
    console.log(allProducts);
  }

  return (
    <div>
      <h1 className="title">Products</h1>
      <ProductsPage />
    </div>
  );
};

export default Products;
