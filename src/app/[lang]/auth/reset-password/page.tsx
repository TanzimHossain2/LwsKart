import NewPasswordForm from "@/components/auth/NewPasswordForm";
import Loading from "@/components/shared/loading";
import appConfig from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lwskart - Reset Password",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Reset%20Password&description=Lwskart%20-%20Reset%20Password%20Page,%20where%20you%20can%20reset%20your%20account%20password`,
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

const VerificationPage = () => {
  return (
    <>
      <div className="container contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Reset your password
          </h2>
          <Suspense fallback={<Loading />}>
            <NewPasswordForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
