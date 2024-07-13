import ProductsForm from "@/components/products/ProductsForm";
import React from "react";

const UpdateProductPage = ({ params }: { params: { productId: string } }) => {
  const productId = params.productId;
  return (
    <div>
      <h1 className="title">Update Product</h1>
      <ProductsForm variant="update"/>
    </div>
  );
};

export default UpdateProductPage;
