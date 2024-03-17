import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request:Request)=> {
      try {
        const { category } = await request.json();
    const products = await DATABASE.product.findMany({
      where: { category: category},
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
      take: 6,
    });
    return new NextResponse(JSON.stringify(products),{status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something went wrong!"}),{status: 500});
  }
};