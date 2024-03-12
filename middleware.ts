import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import {
  DEFAULT_LOGIN_REDIRECT,
  testRoutes,
  apiRoutePrefix,
  authRoutes,
  publicRoutes,
  dynamicPublicRoutes
} from "@/routes";

export default async function middleware(req: NextRequest) {
  const { cookies } = req;
  const pathname = req.nextUrl.pathname;

  const isTestRoute = testRoutes.includes(pathname);
  if(isTestRoute) return NextResponse.next();

  const isApiRoute = pathname.startsWith(apiRoutePrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isDynamicPublicRoute = dynamicPublicRoutes.includes(pathname.split('/').slice(0,-1).join('/'));

  const token = cookies.get("supermartnextcookie")?.value;

  if(isApiRoute || isPublicRoute || isDynamicPublicRoute){
    return NextResponse.next();
  }
  
  if(isAuthRoute && !token){
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
      console.log(payload);
      if(isAuthRoute) {
        if (payload) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return null;
      }
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
