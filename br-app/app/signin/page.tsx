import { Metadata } from "next";
import { LoginCard } from "../components/ui/LoginCard";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function Signin() {
  return (
    <div className="flex flex-col flex-1 h-screen items-center align-middle justify-center font-sans">
        <LoginCard />
    </div>
  );
}