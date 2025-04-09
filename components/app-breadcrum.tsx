import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";

type AppBreadcrumbProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  const roots = items.slice(0, items.length - 1);
  const last = items[items.length - 1];
  const locale = useLocale();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {roots.map((item, index) => (
          <>
            <BreadcrumbItem key={index} className="hidden md:block">
              <BreadcrumbLink href={item.href ?? "#"}>
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              className={cn("hidden md:block", { "rotate-180": isRTL(locale) })}
            />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{last.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
