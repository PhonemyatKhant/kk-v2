"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../main/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/schemas/productFormSchema";
import { z } from "zod";
import FormTextArea from "../main/FormTextArea";
import { Button } from "../ui/button";
import { CldUploadButton } from "next-cloudinary";
import { Label } from "../ui/label";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductsForm = ({
  variant,
  params,
}: {
  variant: "create" | "update";
  params?: { productId: string };
}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const router = useRouter();
  // USE FORM
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      image: [],
      countInStock: 0,
      price: 0,
      discountPercentage: 0,
      description: "",
    },
  });
  const { handleSubmit, watch, setValue } = form;

  const image = watch("image");
  console.log(image);

  const onSubmit: SubmitHandler<z.infer<typeof productFormSchema>> = (data) => {
    setIsLoading(true);

    setIsLoading(true);
    axios
      .post("/api/products/create", data)
      .then(() => router.push("/admin/products"))
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };
  //   HANDLE IMAGE UPLOAD
  const handleUpload = (result: any) => {
    setValue("image", [...imagesArray, result?.info?.secure_url], {
      shouldValidate: true,
    });
    setImagesArray((prev) => [...prev, result?.info?.secure_url]);
    // console.log(typeof result?.info?.secure_url);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 w-full  p-5 rounded-lg mt-7"
      >
        <FormInput
        
          label="Product Name"
          control={form.control}
          name="name"
          type="text"
          required={true}
          register={form.register}
          errors={form.formState.errors}
          disabled={isLoading}
        />
        <FormInput
          label="Brand"
          control={form.control}
          name="brand"
          type="text"
          required={true}
          register={form.register}
          errors={form.formState.errors}
          disabled={isLoading}
        />
        <FormInput
          label="Category"
          control={form.control}
          name="category"
          type="text"
          required={true}
          register={form.register}
          errors={form.formState.errors}
          disabled={isLoading}
        />

        {/* IMAGES  */}
        <div className=" space-y-2 flex flex-col">
          <Label>Images</Label>
          <CldUploadButton
            className=" text-primary font-semibold p-10 bg-primary/10 rounded-md"
            options={{ maxFiles: 3 }}
            onUpload={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          >
            Upload Images
          </CldUploadButton>
          {imagesArray.length > 0 && (
            <div className="flex gap-2">
              {imagesArray.map((i, index) => (
                <Image
                  key={index}
                  src={i}
                  alt="product image"
                  className=" aspect-square object-cover"
                  width={200}
                  height={200}
                />
              ))}
            </div>
          )}
        </div>
        <div className=" flex gap-4 items-start">
          <div className="flex-1">
            <FormInput
              label="Stock"
              control={form.control}
              name="countInStock"
              type="number"
              required={true}
              register={form.register}
              errors={form.formState.errors}
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Price MMK"
              control={form.control}
              placeholder="MMK"
              name="price"
              type="number"
              required={true}
              register={form.register}
              errors={form.formState.errors}
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Discount %"
              control={form.control}
              name="discountPercentage"
              type="number"
              required={true}
              register={form.register}
              errors={form.formState.errors}
              disabled={isLoading}
            />
          </div>
        </div>

        <FormTextArea
          label="Product Description"
          control={form.control}
          placeholder="Write a product description."
          name="description"
          disabled={isLoading}
          errors={form.formState.errors}
        />
        <Button className=" w-full" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProductsForm;
