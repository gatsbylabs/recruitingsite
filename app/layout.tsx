import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gatsby Recruiting",
  description: "Prove your skills to join our team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-terminal-bg text-terminal-fg">
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}