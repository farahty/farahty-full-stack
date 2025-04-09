"use client";
import { AdminContainer } from "@/components/admin-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted:", formData);
  };

  return (
    <AdminContainer className="px-6">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-6">
        If you need assistance, please fill out the form below, and our support
        team will get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </AdminContainer>
  );
}
