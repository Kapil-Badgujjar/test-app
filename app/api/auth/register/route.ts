import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let result = await DATABASE.user.findFirst({where: { email: body.email }});
    console.log("Checking previous user >>>", result )
    if(result) return NextResponse.json({message: "Email already in use!"},{status:200});
    if(body.role==='SELLER') result = await DATABASE.user.create({data: { name: body.name, email: body.email, password: body.password, role: body.role }});
    else result = await DATABASE.user.create({data: { name: body.name, email: body.email, password: body.password, role: body.role, isBlocked: false }});

    if(result){
      return NextResponse.json({message: "User registered successfully!", user: result}, { status: 200})
    }
    return NextResponse.json({message: "Registrations failed!"}, { status: 200})
  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}