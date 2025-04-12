import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib/utils";

export interface MediaContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: number;
  noAnimation?: boolean;
}

export const MediaContainer: FC<MediaContainerProps> = ({
  children,
  className,

  aspectRatio,
  noAnimation,
  ...props
}) => {
  return (
    <div
      className={cn(
        `w-full overflow-hidden `,
        {
          "cursor-pointer rounded-md shadow-sm dark:shadow-none": !noAnimation,
        },
        className
      )}
      {...props}
    >
      <AspectRatio ratio={aspectRatio ?? 16 / 9} className="relative">
        {children}
      </AspectRatio>
    </div>
  );
};
