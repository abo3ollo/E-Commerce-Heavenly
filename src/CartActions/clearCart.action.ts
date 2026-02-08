"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function clearCart() {
  let token = await getMyToken();
  if (!token) throw new Error("you should logged in first");

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  
  let payload = await res.json();
  return payload;
}