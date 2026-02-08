
"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function removeCartItem(id: string) {
  let token = await getMyToken();
  if (!token) throw new Error("you should logged in first");

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  
  let payload = await res.json();
  return payload;
}