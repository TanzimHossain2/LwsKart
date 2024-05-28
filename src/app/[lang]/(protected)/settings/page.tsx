import SettingForm from "@/components/auth/settingForm";
import ProfileList from "@/components/user/profile/ProfileList";
import appConfig from "@/config";
import { currentUser } from "@/lib/authUser";
import { Metadata } from "next";
import BreadCamp from "@/components/shared/breadCamp";

export const metadata: Metadata = {
  title: "Lwskart - Settings page",
  description: "Lwskart - Settings Page, where you can update your account information",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Settings%20page&description=Lwskart%20-%20Settings%20Page,%20where%20you%20can%20update%20your%20account%20information`,
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

const SettingsPage = async () => {
  const user = await currentUser();
  return (
    <div className="container py-4">
          <BreadCamp />
      <h2 className="text-center text-xl font-semibold py-5">
        Update your account Information
      </h2>
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-4 pb-16">
        <div className="w-full md:w-1/4">
          <ProfileList />
        </div>
        <>{user && <SettingForm user={user as any} />}</>
      </div>
    </div>
  );
};

export default SettingsPage;
