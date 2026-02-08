"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(){
    let decodeToken = (await cookies()).get("next-auth.session-token")?.value
    let token =await decode({token : decodeToken , secret : process.env.AUTH_SECRET!})
    return token?.token
}
