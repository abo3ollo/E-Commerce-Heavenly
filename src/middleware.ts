import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// /cart ==> request
export async function middleware(request: NextRequest) {
  let token = await getToken({ req: request });


  if (token) {

    return NextResponse.next();

} else {

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/cart' , '/products/:id+'],
}
