"use server";
import { register } from "@/lib/api/customerAPI";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SignUpState = {
  success: boolean;
  message: string;
  fields?: {
    email: string;
    password: string;
  };
};

export async function signup(initState: SignUpState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const token = await register(email, password);

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