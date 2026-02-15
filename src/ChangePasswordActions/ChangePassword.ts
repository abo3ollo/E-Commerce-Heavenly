"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function getChangePassword(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const token = await getMyToken();
    
    if (!token) {
      return {
        success: false,
        message: "You must be logged in first",
      };
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
      }
    );

    const payload = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: payload.message || "Failed to change password",
      };
    }

    return {
      success: true,
      message: payload.message || "Password changed successfully",
      data: payload,
    };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}