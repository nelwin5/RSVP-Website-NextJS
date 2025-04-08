import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const baseDomain = "weddingofcarlanne.com"; // Update this with your real domain
  const isLocalhost = host.includes("localhost");

  let subdomain = "";

  if (isLocalhost) {
    const parts = host.split(".");
    if (parts.length > 2) subdomain = parts[0]; // e.g. sub.localhost:3000
  } else {
    subdomain = host.replace(`.${baseDomain}`, "");
  }

  // Skip root domain or www
  if (!subdomain || subdomain === "www" || host === baseDomain) {
    return NextResponse.next();
  }

  // Rewrite to internal subdomain route
  url.pathname = `/_subdomain/${subdomain}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
