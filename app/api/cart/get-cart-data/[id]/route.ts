import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
try {
      const { id } = params;
    const products = await DATABASE.cart.findMany({
        where: {userId: id},
        select: { 
            id: true,
            quantity: true,
            product: { 
              select : { id: true, image: true, productName: true, price: true, offer: true }
        }}});
    return new NextResponse(JSON.stringify(products),{status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something went wrong!"}),{status: 500});
  }
};