import { Image as ImagePlaceholder } from "lucide-react";
import { FC } from "react";

export const MediaPlaceholder: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-full bg-muted flex justify-center items-center">
      <ImagePlaceholder className="w-[80%] h-[80%] text-muted-foreground" />
      <div className="absolute left-0 bottom-0 right-0">{children}</div>
    </div>
  );
};
