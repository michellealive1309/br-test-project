"use client"
import { login } from "@/app/actions/login"
import { signup } from "@/app/actions/signup"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useActionState } from "react"

export function SignUpCard() {
  const [state, formAction, pending] = useActionState(signup, { success: false, message: '', fields: { email: '', password: '' } });
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardAction>
          <Button variant="link" onClick={() => router.push('/signin')}>Back to Sign in</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={formAction} id="signup">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="myemail@example.com"
                defaultValue={state?.fields.email}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" defaultValue={state?.fields.password} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="signup" className="w-full" disabled={pending}>
          Sign Up
        </Button>
        {!state.success && state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </CardFooter>
    </Card>
  )
}
