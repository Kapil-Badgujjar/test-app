import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const product = await DATABASE.product.findUnique({ 
      where: { id },
      select: {
        id: true,
        image: true,
        productName: true,
        price: true,
        category:true,
        description:true,
        stocks:true,
        offer:true,
      },
     });
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err); // Implement detailed error handling/logging in production
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
