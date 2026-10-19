import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Philonglish",
  description: "Learn B2 English through philosophical texts, from Ancient Greece to the Renaissance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
