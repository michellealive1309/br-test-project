"use client"
import { login } from "@/app/actions/login"
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

export function LoginCard() {
  const [state, formAction, pending] = useActionState(login, { success: false, message: '', fields: { email: '', password: '' } });
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardAction>
          <Button variant="link" onClick={() => router.push('/signup')}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={formAction} id="login-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
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
        <Button type="submit" className="w-full" form="login-form" disabled={pending}>
          Sign in
        </Button>
        {!state.success && state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </CardFooter>
    </Card>
  )
}
