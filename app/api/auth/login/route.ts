import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const user = await DATABASE.user.findFirst({ where: { email: body.email}} );
    if(user){
      if(user.password === body.password){

        const token = jwt.sign({id:user.id, name: user.name, email: user.email, role: user.role}, process.env.JWT_SECRET_KEY as string,{ expiresIn: '30m'});
        const response = NextResponse.json({
          id:user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          phoneNubmber: user.phoneNumber,
          profilePicture: user.profilePicture,
        },{ status: 200});
        response.cookies.set("supermartnextcookie", token);
        return response;
      }
    }
    return NextResponse.json({ message: 'User not found!'},{status: 404});
  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}