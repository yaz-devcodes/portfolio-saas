import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/app")) {
    const { userId, has } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/pricing", url.origin));
    }

    const canAccessDashboard = has({ feature: "dashboard_access" });

    if (!canAccessDashboard) {
      return NextResponse.redirect(new URL("/pricing", url.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
