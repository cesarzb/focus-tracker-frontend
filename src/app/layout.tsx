import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthProvider";
import { StrictMode } from "react";
import "@/globals.css";

export const metadata: Metadata = {
  title: "Focus Tracker",
  description: "App for tracking focus sessions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="bg-stone-900 h-full w-full">
        <div id="root" className="w-full h-full flex flex-col">
          <StrictMode>
            <AuthProvider>{children}</AuthProvider>
          </StrictMode>
        </div>
      </body>
    </html>
  );
}
