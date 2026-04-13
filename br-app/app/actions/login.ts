"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { login as customerLogin } from "@/lib/api/customerAPI";

export type LoginState = {
  success: boolean;
  message: string;
  fields?: {
    email: string;
    password: string;
  };
};

export async function login(initState: LoginState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const token = await customerLogin(email, password);

  if (!token) {
    return {
      success: false,
      message: 'Invalid email or password',
      fields: { email, password },
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return redirect('/order');
}