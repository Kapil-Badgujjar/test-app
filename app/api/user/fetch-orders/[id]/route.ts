import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const response = await DATABASE.order.findMany({ 
      where: {userId:id },
      select: { 
        id: true,
        paymentId: true,
        quantity: true,
        paymentStatus: true,
        amount: true,
        status: true,
        shipmentTrackingId: true,
        product: { 
          select : { 
            id: true, 
            image: true, 
            productName: true, 
            price: true
           }
        }
      }
     });
     console.log(response);
    if (!response) {
      return new NextResponse(
        JSON.stringify({ message: "Not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(response), {
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
