import { DataTable } from "@/app/[locale]/admin/data-table";
import { SectionCards } from "@/app/[locale]/admin/section-cards";
import { ChartAreaInteractive } from "@/app/[locale]/admin/chart-area-interactive";

import data from "./data.json";
import { AdminContainer } from "@/app/[locale]/admin/admin-container";

export default function Page() {
  return (
    <AdminContainer breadcrumb={[{ label: "Dashboard" }]}>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </AdminContainer>
  );
}
