import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import data from "./data.json";
import { AdminContainer } from "@/components/admin-container";

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
