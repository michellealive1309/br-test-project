"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout as customerLogout } from "@/lib/api/customerAPI";

export async function logout() {
  customerLogout();

  const cookieStore = await cookies();
  cookieStore.set("auth_token", '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return redirect('/');
}