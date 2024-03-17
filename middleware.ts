import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import {
  testRoutes,
  userRoutes,
  sellerRoutes,
  apiRoutePrefix,
  authRoutes,
  publicRoutes,
  dynamicPublicRoutes
} from "@/routes";

const allowedOrigins = [
  'https://checkout.stripe.com',
  'https://test-app-kapil-badgujjar.vercel.app',
  // Add other domains as needed
];

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const requestOrigin = req.headers.get('origin');
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    response.headers.set('Access-Control-Allow-Origin', requestOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  const { cookies } = req;
  const pathname = req.nextUrl.pathname;

  const isTestRoute = testRoutes.includes(pathname);
  if(isTestRoute) return response;

  const isUserRoute = userRoutes.includes(pathname);
  const isSellerRoutes = sellerRoutes.includes(pathname);

  const isApiRoute = pathname.startsWith(apiRoutePrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isDynamicPublicRoute = dynamicPublicRoutes.includes(pathname.split('/').slice(0,-1).join('/'));

  const token = cookies.get("supermartnextcookie")?.value;

  if(isApiRoute || isPublicRoute || isDynamicPublicRoute){
    return response
  }
  
  if(isAuthRoute && !token){
    return response
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
      console.log("Payload >>",payload);

      if(isUserRoute&&payload.role === "USER"||isSellerRoutes&&payload.role === "SELLER"){
        return response
      }
      if(isUserRoute&&payload.role === "SELLER"||isSellerRoutes&&payload.role === "USER"){
        return NextResponse.redirect(new URL("/not-allowed", req.url));
      }

      if(isAuthRoute) {
        if (payload) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return null;
      }
    return response
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    if (error instanceof Error) {
      if ((error as any).name === 'JWTExpired') {
        if (error.name === 'JWTExpired') return response;
      }
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
