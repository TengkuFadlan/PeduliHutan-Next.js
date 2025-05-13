import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;

  // If the user has a userId cookie, redirect to the dashboard
  if (userId) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // If the user does not have a userId cookie, redirect to login
    if (!request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};