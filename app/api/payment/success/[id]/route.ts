import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const response = await DATABASE.order.updateMany({ 
      where: {paymentId:id },data: { status:'processed', paymentStatus: 'received'}
     });
     if(response){
        const result = await DATABASE.order.findFirst({where: {paymentId:id}});
        await DATABASE.cart.deleteMany({where: {userId:result?.userId}});
        console.log(result);
     }
     console.log(response);
    if (!response) {
      return new NextResponse(
        JSON.stringify({ message: "Order failed" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify({...response, message: 'Order placed successfully'}), {
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
