import { Inter } from "next/font/google";
import type { Metadata } from 'next'
import { ClerkProvider } from "@clerk/nextjs";
import '../globals.css'

export const metadata: Metadata = {
  title: "StitchTalk",
  description: "A Next.js 13 StitchTalk Application like Threads",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
