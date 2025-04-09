import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import NextTopLoader from "nextjs-toploader";
import { getDirection, locales, routing } from "@/i18n/routing";
import "../globals.css";
import AuthProvider from "@/components/auth-provider";
import { notFound } from "next/navigation";
import { getTolgee } from "@/i18n/toglee/server";
import { TolgeeNextProvider } from "@/i18n/toglee/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Create Next App",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Generated by create next app",
};

export const generateStaticParams = () => {
  return locales.map((i) => ({ locale: i }));
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const tolgee = await getTolgee();
  const records = await tolgee.loadRequired();

  return (
    <html lang={locale} dir={getDirection(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TolgeeNextProvider language={locale} staticData={records}>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </TolgeeNextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
