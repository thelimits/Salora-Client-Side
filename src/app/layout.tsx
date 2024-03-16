import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import NavbarBottom from "@/Components/NavbarBottom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salora",
  description: "Ecommerce Terpecaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          {children}
        <NavbarBottom />
      </body>
    </html>
  );
}
