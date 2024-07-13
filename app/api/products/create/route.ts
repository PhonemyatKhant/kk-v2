import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      brand,
      category,
      countInStock,
      description,
      discountPercentage,
      image,
      price,
    } = body;

    if (
      !name ||
      !brand ||
      !category ||
      
      !description ||
      
      !image ||
      !price
    ) {
      return new NextResponse("Insufficient Data", { status: 500 });
    }

    const currentUser = await getCurrentUser();
    if (currentUser?.isAdmin) {
        
      const createdProduct = await prisma.products.create({
        data: {
          name,
          brand,
          category,
          countInStock,
          description,
          discountPercentage,
          image,
          price,
        },
      });
      return NextResponse.json(createdProduct);
    } else {
      return new NextResponse("Access Denied!", { status: 403 });
    }
  } catch (error) {
    console.log(error, "Error creating new product!");
    return new NextResponse("Error creating new product!", { status: 500 });
  }
}
