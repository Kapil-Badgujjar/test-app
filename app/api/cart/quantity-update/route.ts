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
    let result = undefined;
    if(body.action === "increase"){
      result = await DATABASE.cart.update({
        where: {
          id: body.id,
        },
        data:{
          quantity: {
            increment: 1,
          }
        }
      });
      result = { ...result, localActionCode: 1 }
    } else if(body.action === "decrease"){
      const data = await DATABASE.cart.findFirst({where: {id: body.id}, select:{ quantity: true}});
      console.log(data);
      if(data && data.quantity>1){
        result = await DATABASE.cart.update({
          where: {
            id: body.id,
          },
          data:{
            quantity: {
              decrement: 1,
            }
          }
        });
        result = { ...result, localActionCode: -1 }
      } else if(data){
        result = await DATABASE.cart.delete({where: {id: body.id}});
        result = { ...result, localActionCode: 0 }
      }
      else throw new Error("No item found!");
    }
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
