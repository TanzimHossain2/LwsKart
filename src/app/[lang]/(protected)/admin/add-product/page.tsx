import AddProductForm from "@/components/product/AddProductForm";
import Loading from "@/components/shared/loading";
import ProfileList from "@/components/user/profile/ProfileList";
import appConfig from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lwskart - Admin: Add Product",
  description: "Lwskart - Admin: Add Product Page, where you can add new products.",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Admin:%20Add%20Product&description=Lwskart%20-%20Admin:%20Add%20Product%20Page,%20where%20you%20can%20add%20new%20products.`,
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

const AddProductPage = () => {
  return (
    <div className="container py-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-4 pb-16">
        <div className="w-full md:w-1/4">
          <ProfileList />
        </div>
        <Suspense fallback={<Loading />}>
          <AddProductForm />
        </Suspense>
      </div>
    </div>
  );
};

export default AddProductPage;
