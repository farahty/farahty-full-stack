import { FC } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Media } from "./type";

export const MediaImage: FC<{
  media: Media;
  width?: number;
  height?: number;
  noAnimation?: boolean;
}> = ({ media, noAnimation }) => {
  return (
    <NextImage
      loading="lazy"
      src={media.url}
      alt={media.name ?? ""}
      fill
      sizes="500px"
      className={cn(
        "object-cover w-full h-full bg-muted flex justify-center items-center duration-300 ease-in-out transition-all",
        {
          "hover:scale-110 hover:rotate-1 ": !noAnimation,
        }
      )}
    />
  );
};
