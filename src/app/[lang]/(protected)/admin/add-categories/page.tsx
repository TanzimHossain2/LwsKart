import CategoryForm from "@/components/categories/CategoryForm";
import Loading from "@/components/shared/loading";
import ProfileList from "@/components/user/profile/ProfileList";
import appConfig from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lwskart - Admin: Manage Categories",
  description: "Lwskart - Admin: Manage Categories Page, where you can add, edit and delete categories.",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Admin:%20Manage%20Categories&description=Lwskart%20-%20Admin:%20Manage%20Categories%20Page,%20where%20you%20can%20add,%20edit%20and%20delete%20categories`,
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

const CategoriesCreatePage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin: Manage Categories
      </h1>
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-4 pb-16">
        <div className="w-full md:w-1/4">
          <ProfileList />
        </div>
        <Suspense fallback={<Loading />}>
          <CategoryForm />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoriesCreatePage;
