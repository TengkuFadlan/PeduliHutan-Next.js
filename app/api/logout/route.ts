import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // Clear the userId cookie
  response.cookies.set('userId', '', {
    httpOnly: false, // Allow client-side access
    secure: false,
    path: '/',
    maxAge: 0, // Expire the cookie immediately
  });

  return response;
}