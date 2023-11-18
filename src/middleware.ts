import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({req: request, secret: process.env.SECRET});

  if(!session && request.url.includes("/chat")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if(session && !request.url.includes("/chat")) {
    return NextResponse.redirect(new URL("/chat", request.url));
  } 
}

export const config = {
    matcher: ["/", "/chat"]
}