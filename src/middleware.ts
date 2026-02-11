import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// /cart ==> request
export async function middleware(request: NextRequest) {
  let token = await getToken({ req: request });
  console.log(request);

  if (token) {
    if (
      request.nextUrl.pathname == "/login" ||
      request.nextUrl.pathname == "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (request.nextUrl.pathname == "/cart" || request.nextUrl.pathname.includes("/products/") ) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/cart", "/products/:id+" , "/login" , "/register"],
};
