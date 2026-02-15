"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function getUserWishlist() {
  try {
    const token = await getMyToken();
  if (!token) throw new Error("you should logged in first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  
  const payload = await res.json();
  return payload;
  
  } catch (error) {
    console.log(error);
    
  }
}