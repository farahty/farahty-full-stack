"use client";
import { useTranslate } from "@tolgee/react";
export default function Home() {
  const { t } = useTranslate();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        {t("add")}
        <h1 className="text-4xl font-bold text-center">
          {t("greeting", { name: process.env.NEXT_PUBLIC_SITE_NAME })}
          Welcome to{" "}
          <span className="text-green-500">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </span>
          App
        </h1>
        <p className="text-lg text-center sm:text-left">
          This is a simple example of a Next.js application using Tailwind CSS
          and a custom font. You can customize the styles and content as needed.
        </p>
        <p>{t("freeze")}</p>
      </main>
    </div>
  );
}
