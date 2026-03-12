import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { canAccessAppHome } from "@/lib/auth-gates";
import { ROUTES } from "@/lib/contracts";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;

  if (url.pathname.startsWith(ROUTES.appHome)) {
    const { userId, has } = await auth();
    const canAccess = canAccessAppHome({ userId, has });
    if (!canAccess) {
      return NextResponse.redirect(new URL(ROUTES.pricing, url.origin));
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
