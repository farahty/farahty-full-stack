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

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters long"),
});

type FeedbackSchema = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  const onSubmit = async (data: FeedbackSchema) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      setSuccess("Thank you for your feedback!");
      form.reset();
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting your feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContainer
      className="px-6"
      breadcrumb={[
        { label: "Dashboard", href: "/admin" },
        { label: "Feedback" },
      ]}
    >
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <p className="mb-6 text-muted-foreground">
        We value your feedback! Please fill out the form below to share your
        thoughts, suggestions, or concerns with us.
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
            name="feedback"
            label="Feedback"
            type="textarea"
            placeholder="Your feedback"
            disabled={loading}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Submit Feedback
          </Button>
        </form>
      </Form>
    </AdminContainer>
  );
}
