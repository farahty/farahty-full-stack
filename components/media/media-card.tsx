"use client";

import { FC, useCallback } from "react";
import { MediaContainer } from "./media-container";
import { MediaImage } from "./media-image";
import { MediaAudio } from "./media-audio";
import { MediaVideo } from "./media-video";
import { MediaPDF } from "./media-pdf";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CircleCheckBig, X } from "lucide-react";

import { MediaPlaceholder } from "./media-placeholder";
import { Media } from "./type";

export const MediaCard: FC<{
  media?: Media;
  onRemove?: (media?: Media) => void;
  onSelect?: (media?: Media) => void;
  selected?: boolean;
  className?: string;
  noAnimation?: boolean;
  aspectRatio?: number;
  width?: number;
  height?: number;
}> = ({
  media,
  onRemove,
  onSelect,
  selected,
  width,
  height,
  className,
  noAnimation,
  aspectRatio = 16 / 9,
}) => {
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(media);
    }
  }, [media, onSelect]);

  const showToolbar = !!onRemove;

  return (
    <MediaContainer
      className={cn("relative group", className)}
      onClick={handleSelect}
      aspectRatio={aspectRatio}
      noAnimation={noAnimation}
    >
      {!media ? (
        <MediaPlaceholder />
      ) : media.type === "image" ? (
        <MediaImage
          media={media}
          width={width}
          height={height}
          noAnimation={noAnimation}
        />
      ) : media.type === "audio" ? (
        <MediaAudio media={media} />
      ) : media.type === "video" ? (
        <MediaVideo media={media} />
      ) : (
        <MediaPDF media={media} />
      )}

      {showToolbar ? (
        <div className="absolute top-0 left-0 right-0 h-10 opacity-0 group-hover:opacity-100 transition-all ">
          <Button
            variant="ghost"
            onClick={() => onRemove(media)}
            className="hover:bg-accent/20"
          >
            <X />
          </Button>
        </div>
      ) : null}

      {onSelect ? (
        <div className="absolute bottom-0 left-3 right-0 h-14">
          {selected ? (
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl bg-primary">
              <CircleCheckBig className="text-accent" />
            </div>
          ) : null}
        </div>
      ) : null}
    </MediaContainer>
  );
};
