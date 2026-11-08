import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "LinkPilot — Smart Link Inspector",
  description: "Inspect public URLs, understand redirect chains, and validate supported links."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}