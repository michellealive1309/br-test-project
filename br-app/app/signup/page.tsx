import { Metadata } from "next";
import { SignUpCard } from "../components/ui/SignUpCard";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUp() {
  return (
    <div className="flex flex-col flex-1 h-screen items-center align-middle justify-center font-sans">
      <SignUpCard />
    </div>
  );
}