"use client";
import { cn, fetchCallback } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import TextField from "./fields/text-field";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultRoute } from "@/i18n/routing";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "password do not matched",
  });

type SignupForm = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      setError(null);
      const results = await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        fetchCallback(setLoading)
      );
      if (results.error) {
        setError(results.error.message!);
      }

      if (results.data?.token) {
        router.push(searchParams.get("callbackURL") ?? defaultRoute);
      }
    } catch (error) {
      setError("An error occurred while signing up.");
      console.log("Signup error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Signup and register to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>SignUp Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <TextField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="your name"
                  disabled={loading}
                />
                <TextField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="your email"
                  disabled={loading}
                />
                <TextField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="your password"
                  disabled={loading}
                />
                <TextField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="confirm password"
                  disabled={loading}
                />

                <Button type="submit" className="w-full" loading={loading}>
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
