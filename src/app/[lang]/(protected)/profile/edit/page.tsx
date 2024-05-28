import { getUserById } from "@/backend/services/user";
import ProfileForm from "@/components/user/profile/ProfileForm";
import appConfig from "@/config";
import { Metadata } from "next";
import BreadCamp from "@/components/shared/breadCamp";

export const metadata: Metadata = {
  title: "Lwskart - Edit Profile",
  description: "Lwskart - Edit Profile Page, where you can edit your profile",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Edit%20Profile&description=Lwskart%20-%20Edit%20Profile%20Page,%20where%20you%20can%20edit%20your%20profile`,
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

const EditProfilePage = async ({ searchParams }: any) => {
  const { id } = searchParams;
  const user = await getUserById(id);

  return (
    <div className="container">
          <BreadCamp />
      {user && <ProfileForm user={user} />}
    </div>
  );
};

export default EditProfilePage;
