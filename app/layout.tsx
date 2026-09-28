import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NETFUND — Scholarship Portal",
  description: "Funding Fresh Dreams, Building Futures",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
