import getSession from "./getSession";
import prisma from "@/lib/prismadb";
import { queriesSchema, paginationSchema } from "@/schemas/productQuerySchema";
import { NextResponse } from "next/server";
import { z } from "zod";

const getProduct = async (
  queries: z.infer<typeof queriesSchema> = {},
  pageIndex = 0,
  productsPerPage = 9
) => {
  const { brand, category, minPrice, maxPrice, searchTerm } = queries;

  const where: any = {};

  if (brand) {
    where.brand = brand;
  }
  if (category) {
    where.category = category;
  }

  if (minPrice) {
    where.price = {
      ...(where.price || {}),
      gte: minPrice,
    };
  }

  if (maxPrice) {
    where.price = {
      ...(where.price || {}),
      lte: maxPrice,
    };
  }

  if (searchTerm) {
    where.OR = [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  try {
    // Count the total number of products that match the query
    const totalProducts = await prisma.products.count({
      where,
    });

    // Calculate total pages
    const totalPages = productsPerPage
      ? Math.ceil(totalProducts / productsPerPage)
      : 1;

    // Ensure the pageIndex is within the valid range
    if (pageIndex >= totalPages) {
      console.log("no products to display");

      return {};
    }

    const products = await prisma.products.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: productsPerPage ? pageIndex * productsPerPage : undefined,
      take: productsPerPage,
    });

    return {
      products,
      totalProducts,
      totalPages,
    };
  } catch (error) {
    console.log(error);

    return {};
  }
};

export default getProduct;
