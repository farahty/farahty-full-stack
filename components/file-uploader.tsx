"use client";

import { useCallback, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { MediaCard } from "./media/media-card";
import { cn } from "@/lib/utils";
import { MediaContainer } from "./media/media-container";
import { MediaPlaceholder } from "./media/media-placeholder";
import { uploadFile } from "@/lib/storage"; // Import the server action
import { Loader2 } from "lucide-react";

type FileUploaderProps = {
  onUpload?: (fileName: string) => void;
  onError?: (error: Error) => void;
  maxSize?: number; // Maximum file size in bytes
  acceptedTypes?: Accept; // Accepted MIME types
};

export function FileUploader({
  onUpload,
  onError,

  maxSize = 5 * 1024 * 1024, // Default max size: 5MB
  acceptedTypes = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [],
    "application/pdf": [],
  }, // Default accepted types
}: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);

      // Handle rejected files
      if (fileRejections.length > 0) {
        const rejectionErrors = fileRejections.map(
          (rejection) =>
            `${rejection.file.name}: ${rejection.errors[0].message}`
        );
        setError(rejectionErrors.join(", "));
        if (onError) onError(new Error(rejectionErrors.join(", ")));
        return;
      }

      // Process accepted files
      for (const file of acceptedFiles) {
        try {
          setUploading(true);

          // Upload file using the server action
          const fileName = await uploadFile(file);

          if (onUpload) onUpload(fileName);
        } catch (err) {
          console.error(err);
          setError("An error occurred while uploading the file.");
          if (onError) onError(err as Error);
        } finally {
          setUploading(false);
        }
      }
    },
    [onUpload, onError]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      maxSize,
      accept: acceptedTypes,
    });

  return (
    <div
      {...getRootProps()}
      className="w-full min-w-2xs flex justify-center items-center"
    >
      <input {...getInputProps()} />
      {error && (
        <div className="text-destructive text-sm mb-2">
          <strong>Error:</strong> {error}
        </div>
      )}
      {acceptedFiles.length > 0 ? (
        <div className="space-y-2 w-full">
          {acceptedFiles.map((file) => (
            <MediaCard
              key={file.name}
              media={{
                key: file.name,
                name: file.name,
                type: file.type.startsWith("image/") ? "image" : "file",
                url: URL.createObjectURL(file),
              }}
            />
          ))}
        </div>
      ) : (
        <MediaContainer
          className={cn("border-2", {
            "border-primary/60 border-dashed": isDragActive,
          })}
        >
          <MediaPlaceholder />
        </MediaContainer>
      )}
      {uploading && (
        <Loader2 className="absolute animate-spin w-20 h-20"></Loader2>
      )}
    </div>
  );
}
