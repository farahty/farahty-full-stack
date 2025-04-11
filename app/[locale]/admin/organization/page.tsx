import { AdminContainer } from "../admin-container";

export default function OrganizationPage() {
  return (
    <AdminContainer
      breadcrumb={[
        {
          label: "Admin",
          href: "/admin",
        },
        {
          label: "Organization",
          href: "/admin/organization",
        },
      ]}
    >
      <h1>Invite Organization</h1>
      <p>Invite Organization page</p>
    </AdminContainer>
  );
}
