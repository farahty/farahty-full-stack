import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type AppBreadcrumbProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  const roots = items.slice(0, items.length - 1);
  const last = items[items.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {roots.map((item, index) => (
          <BreadcrumbItem key={index} className="hidden md:block">
            <BreadcrumbLink href={item.href ?? "#"}>
              {item.label}
            </BreadcrumbLink>
            {index < roots.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{last.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
