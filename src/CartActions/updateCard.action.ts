"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function updateCart(id: string , count : string) {
  let token = await getMyToken();
  if (!token) throw new Error("you should logged in first");

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count,
    }),
  });
  
  let payload = await res.json();
  return payload;
}