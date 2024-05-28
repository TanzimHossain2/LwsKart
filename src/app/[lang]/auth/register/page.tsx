import RegistrationForm from "@/components/auth/RegistrationForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Loading from "@/components/shared/loading";
import appConfig from "@/config";
import { IParams } from "@/interfaces/lang";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Lwskart - Register Page",
  description: "Lwskart - Register Page, where you can register for new customer",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Register%20Page&description=Lwskart%20-%20Register%20Page,%20where%20you%20can%20register%20for%20new%20customer.`,
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

const RegistrationPage = async({ params: { lang } }: IParams) => {
  const dictionary = await getDictionary(lang);



  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
       
          {dictionary.auth.create_account}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">Register for new cosutumer</p>
        <Suspense fallback={<Loading />}>
          <RegistrationForm dictionary={dictionary}/>
          <SocialLogin mode="register"  />
        </Suspense>
        <p className="mt-4 text-center text-gray-600">
          {dictionary.auth.already_have_account}{" "}
          <Link href="/auth/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
