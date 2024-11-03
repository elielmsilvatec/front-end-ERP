import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = Boolean(token);
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|dashboard).*)'],
};












// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';


// export function middleware(request: NextRequest) {
//   const isAuthenticated = request.cookies.has('next-auth.session-token');
//   const isLoginPage = request.nextUrl.pathname === '/login';


//   if (!isAuthenticated && !isLoginPage) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   if (isAuthenticated && isLoginPage) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
  
//   return NextResponse.next();
// }
 
// export const config = {
//   // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|dashboard).*)'],
  
// };

