import BreadCamp from "@/components/shared/breadCamp";
import BillingAdress from "../address/BillingAdress";
import ShipingAdress from "../address/ShipingAdress";
import PersonalInfo from "./PersonalInfo";
import ProfileList from "./ProfileList";
import { currentUser } from "@/lib/authUser";
import { Metadata } from "next";
import appConfig from "@/config";

export const metadata: Metadata = {
  title: "Lwskart - Profile",
  description: "Lwskart - Profile Page, where you can see your profile information",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Profile&description=Lwskart%20-%20Profile%20Page,%20where%20you%20can%20see%20your%20profile%20information`,
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

const ProfileInfo = async () => {
  const user = await currentUser();
  const userId = user?.id || "";

  return (
    <>
      <BreadCamp />
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-4 pb-16">
        <div className="w-full md:w-1/4">
          <ProfileList />
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {user && <PersonalInfo user={user} />}
            <ShipingAdress userId={userId} />
            <BillingAdress userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
