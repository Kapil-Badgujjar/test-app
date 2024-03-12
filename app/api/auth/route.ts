import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { deleteCookie } from "@/actions/logout";
export async function GET(request: Request) {
  // Extract the cookie named 'supermartnextcookie' from the request
  const cookie = request.headers.get('Cookie') || '';
  const token = cookie.split('; ').find(row => row.startsWith('supermartnextcookie='))?.split('=')[1];
  
  if (!token) {
    return NextResponse.json({ message: 'Token not provided!' }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
    // Assuming 'decoded' contains an 'email' field
    if (!decoded.email) {
      return NextResponse.json({ message: 'Invalid token!' }, { status: 401 });
    }
    // Fetch user details from the database
    const user = await DATABASE.user.findFirst({ where: { email: decoded.email } });
    if (user) {
        const token = jwt.sign({id:user.id, name: user.name, email: user.email}, process.env.JWT_SECRET_KEY as string,{ expiresIn: '30m'});
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
    return NextResponse.json({ message: 'User not found!'},{status: 404});
  } catch(error) {
    deleteCookie();
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}