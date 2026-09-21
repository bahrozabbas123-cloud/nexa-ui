import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./auth.css";
import "./settings.css";
import "./navigation.css";
import "./dashboard.css";
import "./search.css";
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: "NexaUI | Modern SaaS Dashboard Starter Kit",
  description: "A premium, reusable dashboard starter kit for modern SaaS products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><Providers>{children}</Providers></body>
    </html>
  );
}
