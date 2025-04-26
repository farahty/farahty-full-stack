import { AdminContainer } from "../../admin-container";

export default function InviteOrganizationPage() {
  return (
    <AdminContainer
      className="px-6"
      breadcrumb={[
        {
          label: "Admin",
          href: "/admin",
        },
        {
          label: "Organization",
          href: "/admin/organization",
        },
        {
          label: "Invite",
          href: "/admin/organization/invite",
        },
      ]}
    >
      <h1>Invite Organization</h1>
      <p>Invite Organization page</p>
    </AdminContainer>
  );
}
