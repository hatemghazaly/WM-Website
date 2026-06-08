import { NextRequest, NextResponse } from "next/server";

import {
  getCookieValue,
  getCareersAdminCookieName,
  isValidCareersAdminToken,
} from "@/lib/careers-admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/careers/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/careers")) {
    const token = getCookieValue(
      request.headers.get("cookie"),
      getCareersAdminCookieName(),
    );

    if (!(await isValidCareersAdminToken(token))) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/careers/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/careers/:path*"],
};
