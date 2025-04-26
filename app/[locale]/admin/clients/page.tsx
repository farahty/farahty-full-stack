"use client";
import { authClient } from "@/lib/auth/auth-client";
import { AdminContainer } from "../admin-container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import TextField from "@/components/fields/text-field";
import { useState } from "react";
import { fetchCallback } from "@/lib/utils";
import { toast } from "sonner";

const createClientSchema = z.object({
  name: z.string().min(3),
  logo: z.string().min(3),
  slug: z.string().min(3),
});
type CreateClientSchema = z.infer<typeof createClientSchema>;

export default function ClientsPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      logo: "",
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: CreateClientSchema) => {
    try {
      const res = await authClient.organization.create(
        {
          name: data.name,
          slug: data.slug,
          logo: data.logo,
        },
        fetchCallback(setLoading)
      );

      if (res.data) {
        toast.success("Client Added Successfully.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const org = authClient.useListOrganizations();

  return (
    <AdminContainer
      breadcrumb={[
        {
          label: "Admin",
          href: "/admin",
        },
        {
          label: "Clients",
          href: "/admin/clients",
        },
      ]}
      className="px-6"
    >
      <h1>Invite Clients</h1>
      <p>Invite Clients page</p>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Client</Button>
        </DialogTrigger>

        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create New Client</DialogTitle>
                <DialogDescription>Create new client</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 my-3">
                <TextField
                  disabled={loading}
                  control={form.control}
                  name="name"
                  label="Name"
                />
                <TextField
                  disabled={loading}
                  control={form.control}
                  name="slug"
                  label="Slug"
                />
                <TextField
                  disabled={loading}
                  control={form.control}
                  name="logo"
                  label="Logo"
                />
              </div>
              <DialogFooter>
                <Button disabled={loading} type="submit" loading={loading}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div>{org.data?.map((obj) => <div key={obj.id}> {obj.name} </div>)}</div>
    </AdminContainer>
  );
}
