import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata: Metadata = {
  title: "StitchTalk",
  description: "A Next.js 13 app StitchTalk inspired by Threads",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#847cfb",
          colorText: "white",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
