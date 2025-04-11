import { AdminContainer } from "../../admin-container";

export default function ArchivedOrganizationPage() {
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
        {
          label: "Archived",
          href: "/admin/organization/Archived",
        },
      ]}
    >
      <h1>Archived Organization</h1>
      <p>Archived Organization page</p>
    </AdminContainer>
  );
}
