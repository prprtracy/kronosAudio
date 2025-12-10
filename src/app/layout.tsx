// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kronos Audio",
  description: "High-end turntables and tonearms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 注意：这里不要再写 <html>/<body>，交给 [locale]/layout 处理
  return children;
}
