"use client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";

export function AdminContainer({
  children,
  className,
  breadcrumb,
  ...props
}: React.ComponentProps<typeof SidebarInset> & {
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <SidebarInset {...props}>
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between pr-4 ">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {breadcrumb && <AppBreadcrumb items={breadcrumb} />}
        </div>

        <ModeToggle />
      </header>
      <div className="flex flex-1 flex-col ">
        <div
          className={cn(
            "@container/main flex flex-1 flex-col gap-2",
            className
          )}
        >
          {children}
        </div>
      </div>
    </SidebarInset>
  );
}
