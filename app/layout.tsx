import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "英語学習アプリ",
  description: "英検3級を目指す英語学習アプリ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full bg-[#F7F7F7] flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen flex flex-col bg-[#F7F7F7]">
          {children}
        </div>
      </body>
    </html>
  );
}
