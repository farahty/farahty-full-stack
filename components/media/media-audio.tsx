import { FileMusic } from "lucide-react";
import { FC } from "react";
import { Media } from "./type";

export const MediaAudio: FC<{ media: Media }> = ({ media }) => {
  return (
    <div className="w-full h-full bg-muted flex justify-center items-center">
      <FileMusic className="w-16 h-16" />
      <audio controls className="absolute bottom-0">
        <source src={media.url} />
      </audio>
    </div>
  );
};
