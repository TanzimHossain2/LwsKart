
import CartItems from "@/components/product/CartWishlist/CartItems"
import BreadCamp from "@/components/shared/breadCamp"
import appConfig from "@/config";
import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Lwskart - Cart",
  description:
    "Lwskart - Cart Page, where you can see all the products you have added to your cart",
  openGraph: {
    title: "Lwskart - Cart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Cart&description=Lwskart%20-%20Cart%20Page,%20where%20you%20can%20see%20all%20the%20products%20you%20have%20added%20to%20your%20cart`,
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


const CartPage = async ({ params }: any) => {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return (
    <div className="container ">
        <BreadCamp />
       <CartItems dictionary={dictionary} />
    </div>
  )
}

export default CartPage