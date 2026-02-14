"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserOrders() {
  try {
    // Get token from cookies
    const tokenCookie = (await cookies()).get("next-auth.session-token")?.value || 
                        (await cookies()).get("__Secure-next-auth.session-token")?.value;
    
    if (!tokenCookie) {
      throw new Error("You must be logged in first");
    }

    // Decode token to get user ID
    const decodedToken = await decode({
      token: tokenCookie,
      secret: process.env.AUTH_SECRET!,
    });

    const userId = decodedToken?.id || decodedToken?.sub;
    if (!userId) {
      throw new Error("Unable to extract user ID from token");
    }

    // Fetch orders for this user
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        next: {
          revalidate: 0 // Revalidate immediately
        }
      }
      
    );
    // console.log(res);
    
    if (!res.ok) {
      throw new Error(`API Error: error`);
    }
    const payload = await res.json();
    return payload;
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}