import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await DATABASE.product.findMany({
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
    return new NextResponse(JSON.stringify(products),{status: 200, headers: { "Content-Type": "application/json" },});
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something went wrong!"}),{status: 500});
  }
};