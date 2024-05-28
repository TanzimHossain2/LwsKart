import NewVerificationForm from "@/components/auth/NewVerificationForm";
import Loading from "@/components/shared/loading";
import appConfig from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lwskart - New Verification",
  description: "Lwskart - New Verification Page, where you can verify your account",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20New%20Verification&description=Lwskart%20-%20New%20Verification%20Page,%20where%20you%20can%20verify%20your%20account`,
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
      <Suspense fallback={<Loading />}>
        <NewVerificationForm />
      </Suspense>
    </>
  );
};

export default VerificationPage;
