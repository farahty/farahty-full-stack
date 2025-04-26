import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  Building,
} from "lucide-react";

export const menu = {
  navMain: [
    {
      title: "Clients",
      url: "/admin/clients",
      icon: Building,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/clients",
        },
        {
          title: "Archived ",
          url: "/admin/clients/archived",
        },
        {
          title: "Invite",
          url: "/admin/clients/invite",
        },
      ],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Bot,
      items: [
        {
          title: "List",
          url: "/admin/users",
        },
        {
          title: "Panned",
          url: "/admin/users/panned",
        },
        {
          title: "API Keys",
          url: "/admin/users/api-keys",
        },
      ],
    },
    {
      title: "Shipments",
      url: "/admin/shipments",
      icon: BookOpen,
      items: [
        {
          title: "List",
          url: "/admin/shipments",
        },
        {
          title: "Create",
          url: "/admin/shipments/create",
        },
        {
          title: "Assign",
          url: "/admin/shipments/assign",
        },
        {
          title: "Generate Bill",
          url: "/admin/shipments/generate-bill",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/admin/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/admin/feedback",
      icon: Send,
    },
  ],
};
