import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Check if it's a dashboard route
  const isDashboardPath = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirect authenticated users from public pages to dashboard
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login page
  if (!isAuthenticated && isDashboardPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};