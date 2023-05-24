import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const user = await getToken({req});
    if (!user?.isAdmin) return NextResponse.redirect(new URL("/", url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
};
