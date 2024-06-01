import WishlistList from '@/components/product/CartWishlist'
import BreadCamp from '@/components/shared/breadCamp'
import appConfig from '@/config';
import { Metadata } from 'next';
import { Suspense } from 'react'
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Lwskart -  WishList",
  description:
    " Lwskart - WishList Page, where you can see all the products you have added to your wishlist",
  openGraph: {
    title: "Lwskart - WishList",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20WishList&description=Lwskart%20-%20WishList%20Page,%20where%20you%20can%20see%20all%20the%20products%20you%20have%20added%20to%20your%20wishlist`,
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



const WishListPage =async ({ params }: any) => {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
        <BreadCamp />
        <Suspense fallback={<div>Loading...</div>}>
        <WishlistList dictionary={dictionary} />
        </Suspense>
    </div>
  )
}

export default WishListPage