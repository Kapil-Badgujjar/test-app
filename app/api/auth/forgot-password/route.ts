// import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // if(!user?.email) {
    //   return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    // }
    
    return NextResponse.json({}, { status: 200})

  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}