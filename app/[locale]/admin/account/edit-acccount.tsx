"use client";
import TextField from "@/components/fields/text-field";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type EditAccountSchema = z.infer<typeof editAccountSchema>;

export function EditAccount() {
  const [loading, setLoading] = useState(false);
  const { data: user } = authClient.useSession();

  const handleSubmit = async (data: EditAccountSchema) => {
    authClient.updateUser(
      {
        name: data.name,
      },
      fetchCallback(setLoading)
    );
  };

  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: user?.user?.name || "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your profile information to keep it up to date.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TextField
              control={form.control}
              name="name"
              label="Name"
              disabled={loading}
            />
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button type="submit" loading={loading} disabled={loading}>
                Save Changes
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
