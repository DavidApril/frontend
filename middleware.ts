import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKENS_KEY } from './core/context';

const protectedRoutes = ['/']
const publicRoutes = ['/sign_in', '/sign_out']

export async function middleware(request: NextRequest) {

  const token = request.cookies.get(AUTH_TOKENS_KEY)?.value
  const path = request.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  if(isProtectedRoute && !token){
    return NextResponse.redirect(new URL('/sign_in', request.nextUrl))
  }

  if(isPublicRoute && token && request.nextUrl.pathname.startsWith('')){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next();
}
