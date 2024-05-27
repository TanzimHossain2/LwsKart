import { getDictionary } from "@/app/[lang]/dictionaries";
import { getSingleProductById } from "@/backend/services/product";
import ProductInfo from "@/components/product/ProductInfo";
import BreadCamp from "@/components/shared/breadCamp";
import { QuantityProvider } from "@/providers/QuantityProvider";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { id } }: any) {
  const product = await getSingleProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "Product Not Found",
      image: "/not-found.jpg",
      url: "/",
    };
  }

  return {
    title: product?.name,
    openGraph: {
      description: (product.description || "").slice(0, 100),
      url: `/product/${product.id}`,
      images: [
        {
          url: product?.images[0],
          width: 1200,
          height: 630,
          alt: product?.name,
        },
        {
          url: product?.images[1],
          width: 1200,
          height: 630,
          alt: product?.name,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      site: "@kdptanzim",
      cardType: "summary_large_image",
        title: product?.name,
      description: (product.description || "").slice(0, 100),
      images: [
        {
          url: product?.images[0],
          width: 1200,
          height: 630,
          alt: product?.name,
        },
        {
          url: product?.images[1],
          width: 1200,
          height: 630,
          alt: product?.name,
        },
      ],
    },
  };
}

const productDetailsPage = async ({ params }: any) => {
  const { id, lang } = params;
  const dictionary = await getDictionary(lang);

  const product = await getSingleProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <BreadCamp />
      <QuantityProvider>
        <ProductInfo product={product} dictionary={dictionary} />
      </QuantityProvider>
    </>
  );
};

export default productDetailsPage;
