import { IProductData } from "@/interfaces/product";
import ProductImages from "./ProductImages";
import ProductQuantity from "./ProductQuantity";
import AddToCart from "./AddCartWIshLIst/AddToCart";
import AddToWishList from "./AddCartWIshLIst/AddToWishList";
import VariantProduct from "./VariantProduct";
import ShareButton from "../shared/socialShare/ShareButton";
import { Dictionary, ProductDictionary } from "@/interfaces/lang";
import { Star } from "lucide-react";
import { getCategoryById } from "@/backend/services/category";

interface IProductDerails {
  product: IProductData;
  dictionary: Dictionary;
}

const ProductDerails: React.FC<IProductDerails> = async ({
  product,
  dictionary,
}) => {
  const lang = dictionary.product;

  const rating = Math.round(product?.averageRating ?? 0);
  const category = await getCategoryById(String(product?.category));
  const categoryName = category?.name ?? "No category";

  return (
    <>
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <ProductImages
            images={product?.images}
            thumbnail={product?.thumbnail ?? ""}
          />
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product?.name}
          </h2>

          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <>
                {Array.from({ length: rating }, (_, i) => (
                  <span key={i}>
                    <Star size={19} key={i} />
                  </span>
                ))}
              </>
            </div>

            <div className="text-xs text-gray-500 ml-3">
              ( {product?.reviewCount ?? 0} {lang.reviews})
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              {product?.stock > 0 ? (
                <span className="text-green-600"> {lang.in_stock} </span>
              ) : (
                <span className="text-red-600">{lang.out_of_stock}</span>
              )}
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                {lang.brand} :{" "}
              </span>
              <span className="text-gray-600">{product?.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                {lang.category}:{" "}
              </span>
              <span className="text-gray-600">
                {categoryName}
              </span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">{lang.sku}: </span>
              <span className="text-gray-600">{product?.sku}</span>
            </p>
          </div>

          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              $ {product?.discountPrice ?? product?.price}
            </p>
            <p className="text-base text-gray-400 line-through">
              $ {product?.price}
            </p>
          </div>

          <p className="mt-4 text-gray-600">
            {product?.description?.slice(0, 150)}
          </p>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">
              {lang.quantity}
            </h3>
            <ProductQuantity productId={product?.id} />
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <AddToCart text={dictionary.landing} product={product} />
            <AddToWishList product={product} />
          </div>
          <div className="flex gap-3 mt-4">
            <VariantProduct />
            <div className="ms-10 py-1">
              <ShareButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDerails;
