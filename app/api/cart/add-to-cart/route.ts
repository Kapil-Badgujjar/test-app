import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body);
    if (!body.userId) {
      return NextResponse.json(
        { error: "Failed to add to cart" },
        { status: 401 }
      );
    }
    let quantity = 1;
    let result = undefined;
    const prviousProduct = await DATABASE.cart.findFirst({
      where: {
        userId: body.userId,
        productId: body.productId,
      },
      select:{
        id:true,
        quantity:true,
        product:{
          select:{
            id:true,
            image:true,
            offer:true,
            price:true,
            productName:true,
          }
        }
      }
    });
    if (prviousProduct) {
      quantity += prviousProduct.quantity;
      await DATABASE.cart.updateMany({where:{ userId: body.userId, product:{ id: body.productId}},data:{quantity: quantity}})
      result = {...prviousProduct, quantity: 1 }

    }else {
        result = await DATABASE.cart.create({
          data: {
            userId: body.userId,
            productId: body.productId,
            quantity: 1,
          },
        });
        result = await DATABASE.cart.findUnique({
          where:{id: result.id}, 
          select:{
          id:true,
          quantity:true,
          product:{
            select:{
              id:true,
              image:true,
              offer:true,
              price:true,
              productName:true,
            }
          }
        }})
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
