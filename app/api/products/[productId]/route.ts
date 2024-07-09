import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(
  request: Request,
  route: { params: { productId: string } }
) {
  try {
    const id = route.params.productId;
    const body = await request.json();
    const { ...updateData } = body;
    if (!id) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    const currentUser = await getCurrentUser();
    if (currentUser?.isAdmin) {
      const updatedProduct = await prisma.products.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json(updatedProduct);
    } else {
      return new NextResponse("Access Denied!", { status: 403 });
    }
  } catch (error) {
    console.log(error, "Error updating product!");
    return new NextResponse("Error updating product!", { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  route: { params: { productId: string } }
) {
  try {
    const id = route.params.productId;

    if (!id) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const currentUser = await getCurrentUser();
    if (currentUser?.isAdmin) {
      await prisma.products.delete({
        where: { id },
      });
      return new NextResponse("Product deleted successfully", { status: 200 });
    } else {
      return new NextResponse("Access Denied!", { status: 403 });
    }
  } catch (error) {
    console.log(error, "Error deleting product!");
    return new NextResponse("Error deleting product!", { status: 500 });
  }
}
