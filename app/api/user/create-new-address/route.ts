import { DATABASE } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {

    const body = await request.json();

    let response = await DATABASE.address.findFirst({where: {userId: body.userId}});
    if(response) response = await DATABASE.address.create({data: { userId: body.userId, address: body.address }});
    else response = await DATABASE.address.create({data: { ...body, defaultAddress:true }});
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
