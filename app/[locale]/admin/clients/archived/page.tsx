import { AdminContainer } from "../../admin-container";

export default function ArchivedOrganizationPage() {
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
