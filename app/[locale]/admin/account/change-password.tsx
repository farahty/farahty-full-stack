"use client";
import TextField from "@/components/fields/text-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth/auth-client";
import { fetchCallback } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      path: ["confirmPassword"],
      message: "password do not matched",
    }
  );

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (data: ChangePasswordSchema) => {
    try {
      setError(null);
      // Call the API to change the password
      const res = await authClient.changePassword(
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        fetchCallback(setLoading)
      );

      if (res.error) {
        setError(res.error.message!);
      } else {
        toast.success("Password changed successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Change Password Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TextField
              control={form.control}
              name="currentPassword"
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              disabled={loading}
            />
            <TextField
              control={form.control}
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="Enter new password"
              disabled={loading}
            />
            <TextField
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm new password"
              disabled={loading}
            />
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button type="submit" disabled={loading} loading={loading}>
                Change Password
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
