// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Vercel preview deploys might have a weird domain like carlandanne.vercel.app
  // So make sure to handle that too
  const isLocalhost = host.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost:3000' : 'yourplatform.com'; // change this to your actual base domain

  // Skip main domain or api routes
  if (
    host === baseDomain ||
    host.startsWith('www.') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  const subdomain = host.replace(`.${baseDomain}`, '');

  // Rewrite the path to the dynamic `[site]` route
  url.pathname = `/${subdomain}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
