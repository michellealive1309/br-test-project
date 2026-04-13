import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value || '';
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
 
export const config = {
  matcher: [
    '/',
    '/order/:path*',
    '/customer/:path*',
  ],
}