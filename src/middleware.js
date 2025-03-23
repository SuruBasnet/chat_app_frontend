import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Check if the request path is '/' (home route)
  if (request.nextUrl.pathname === '/') {
    const token = request.cookies.get('token');  // Assuming token is stored in cookies
    
    // Check if token exists
    if (!token) {
      // Redirect to login page if token is not found
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Optionally, you can validate the token with an API or decode it if needed
    // For now, this is just a check to see if the token exists.
  }

  return NextResponse.next();  // Allow the request to proceed if the token is valid
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}