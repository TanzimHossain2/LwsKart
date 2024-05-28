import ErrorCard from "@/components/auth/ErrorCard"
import appConfig from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lwskart - Auth Error",
  description: "Lwskart - Auth Error Page, Here you can see the error message when user is not authenticated.",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Auth%20Error&description=Lwskart%20-%20Auth%20Error%20Page,%20Here%20you%20can%20see%20the%20error%20message%20when%20user%20is%20not%20authenticated.`,
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

const AuthErrorPage = () => {
  return (
    <>
    <ErrorCard />
    </>


  )
}

export default AuthErrorPage