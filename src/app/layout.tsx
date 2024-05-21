import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { dbConnect } from "@/backend/db/connectDb";
import Copyright from "@/components/landing/Copyright";
import Header from "@/components/landing/Header";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lwskart",
  description:
    "Lwskart is a platform for buying and selling products online. We provide a wide range of products at affordable prices.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
     
        <SessionProvider session={session}>{children}</SessionProvider>

      </body>
    </html>
  );
}
