// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { defaultLocale } from "@/i18n";

export const metadata: Metadata = {
  title: "Kronos Audio",
  description: "High-end turntables and tonearms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <body
      className="
          bg-black
          text-neutral-100
          antialiased
        "
      >
        {children}
      </body>
    </html>
  );
}