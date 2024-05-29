import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Locale, i18n } from "@/i18n.config";
import { dbConnect } from "@/backend/db/connectDb";
import Copyright from "@/components/landing/Copyright";
import Header from "@/components/landing/Header";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/footer";
import { auth } from "@/auth";
import { getSession, SessionProvider } from "next-auth/react";
import GlobalProvider from "@/providers/GlobalProvider";
import { getDictionary } from "./dictionaries";
import { SpeedInsights } from '@vercel/speed-insights/next';
import XSessionProvider from "@/providers/XSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lwskart",
  description:
    "Lwskart is a platform for buying and selling products online. We provide a wide range of products at affordable prices.",
    
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children, 
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  await dbConnect();
  const dictionary = await getDictionary(lang);
  const session = await auth();

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <XSessionProvider propsData={session}>
          <GlobalProvider>
            <Header dictionary={dictionary.page} />
            <Navbar dictionary={dictionary} />
            {children}
            <Footer dictionary={dictionary.footer}  />
            <Copyright />
          </GlobalProvider>
          </XSessionProvider>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
