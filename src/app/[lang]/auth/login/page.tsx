/* eslint-disable react/no-unescaped-entities */

import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Loading from "@/components/shared/loading";
import appConfig from "@/config";
import { IParams } from "@/interfaces/lang";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Lwskart - Login",
  description: "Lwskart - Login Page, where you can login to your account",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Login&description=Lwskart%20-%20Login%20Page,%20where%20you%20can%20login%20to%20your%20account`,
        width: 1200,
        height: 630,
        alt: "Lwskart",
      },
    ],
    siteName: "Lwskart",
    type: "website",
    locale: "en_US",
  },
};


const LoginPage = async({ params: { lang } }: IParams) => {
  const dictionary = await getDictionary(lang);

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          {dictionary.auth.login}
        </h2>
        <p className="text-gray-600 mb-6 text-sm"> {
          dictionary.general.welcome_back_customer
        } </p>
        <Suspense fallback={<Loading />} >
        <LoginForm dictionary={dictionary} />
        </Suspense>
        <SocialLogin mode="login" />
        <p className="mt-4 text-center text-gray-600">
          Don't have account?{" "}
          <Link href="/auth/register" className="text-primary">
           {dictionary.auth.register_now}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
