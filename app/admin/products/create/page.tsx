import ProductsForm from "@/components/products/ProductsForm";
import React from "react";

const ProductFormPage = () => {
  return (
    <div>
      <h1 className="title">Create Product</h1>
      <ProductsForm variant="create"/>
    </div>
  );
};

export default ProductFormPage;
