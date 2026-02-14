"use server";
import { checkoutSchema, CheckoutSchemaType } from './../schema/checkout.schema';
import { getMyToken } from "@/utilities/getMyToken";

export async function CheckPayment(cardId : string  ,formValues : CheckoutSchemaType) {
  try {
    const token = await getMyToken();
    const url =process.env.NEXT_URL
  if (!token) throw new Error("you should logged in first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        shippingAddress: formValues,
      }),
  });
  
  const payload = await res.json();
  return payload;
  
  } catch (error) {
    console.log(error);
    
  }
}