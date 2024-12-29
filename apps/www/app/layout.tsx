import "./globals.css";

import type { Metadata } from "next";

import { localFonts } from "@/app/fonts";
import { AppLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: "stunes",
  description: "Just a dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(localFonts.className, "font-medium")}>
        <StoreProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster visibleToasts={1} richColors position="top-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
