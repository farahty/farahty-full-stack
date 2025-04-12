import { FileUploader } from "@/components/file-uploader";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-4xl">
        <FileUploader />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold">Welcome to the File Uploader</h1>
        <p className="text-muted-foreground">
          Drag and drop files to upload or click to select files.
        </p>
        <p className="text-muted-foreground">
          Supported formats: <strong>PNG, JPG, GIF</strong>
        </p>
        <p className="text-muted-foreground">
          Max file size: <strong>10MB</strong>
        </p>
        <p className="text-muted-foreground">
          <strong>Note:</strong> This is a demo application. Uploaded files are
          not stored permanently.
        </p>
        <p className="text-muted-foreground">
          <strong>Warning:</strong> This is a demo application. Uploaded files
          are not stored permanently.
        </p>
      </div>
    </main>
  );
}
