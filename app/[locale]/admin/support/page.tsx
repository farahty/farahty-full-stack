"use client";
import { AdminContainer } from "@/app/[locale]/admin/admin-container";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/fields/text-field";
import { Form } from "@/components/ui/form";

const supportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type SupportSchema = z.infer<typeof supportSchema>;

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<SupportSchema>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: SupportSchema) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      setSuccess("Your support request has been submitted successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting your support request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContainer
      className="px-6"
      breadcrumb={[
        { label: "Dashboard", href: "/admin" },
        { label: "Support" },
      ]}
    >
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-6 text-muted-foreground">
        If you need assistance, please fill out the form below, and our support
        team will get back to you as soon as possible.
      </p>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TextField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Your name"
            disabled={loading}
          />
          <TextField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Your email"
            disabled={loading}
          />
          <TextField
            control={form.control}
            name="message"
            label="Message"
            type="textarea"
            placeholder="Your message"
            disabled={loading}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Submit Request
          </Button>
        </form>
      </Form>
    </AdminContainer>
  );
}
