// import prisma from "@/lib/db";
import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if(!email) {
      return NextResponse.json({ errormsg: 'Not found' }, { status: 404 })
    }

    const result = await DATABASE.user.findFirst({where: {email: email}});

    
    return NextResponse.json({result}, { status: 200})

  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}