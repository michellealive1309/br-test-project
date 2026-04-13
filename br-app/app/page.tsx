import { redirect } from "next/dist/client/components/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const token = (await cookies()).get('auth_token')?.value || '';
  if (!token) {
    redirect('/login');
  }

  redirect('/order');
}
