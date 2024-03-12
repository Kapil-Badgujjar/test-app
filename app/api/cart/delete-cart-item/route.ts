import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    if (!body.userId) {
      return NextResponse.json(
        { error: "Failed to add to cart" },
        { status: 401 }
      );
    }
    const result  = await DATABASE.cart.delete({
      where: {
        id: body.cartItem.id,
        userId: body.userId,
      },
    });
    return new NextResponse(JSON.stringify(result), {
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
