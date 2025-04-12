import { AdminContainer } from "@/app/[locale]/admin/admin-container";
import { EditAccount } from "./edit-acccount";
import { ChangePassword } from "./change-password";

export default function MyAccountPage() {
  return (
    <AdminContainer
      className="px-4 gap-6"
      breadcrumb={[
        { label: "Dashboard", href: "/admin" },
        { label: "Account" },
      ]}
    >
      <EditAccount />

      <ChangePassword />
    </AdminContainer>
  );
}
