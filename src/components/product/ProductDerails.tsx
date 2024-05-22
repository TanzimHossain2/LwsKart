import { IProductData } from "@/interfaces/product";
import ProductImages from "./ProductImages";
import ProductQuantity from "./ProductQuantity";
import AddToCart from "./AddCartWIshLIst/AddToCart";
import AddToWishList from "./AddCartWIshLIst/AddToWishList";
import VariantProduct from "./VariantProduct";

interface IProductDerails {
  product: IProductData;
}

const ProductDerails: React.FC<IProductDerails> = ({ product }) => {
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
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
            </div>

            <div className="text-xs text-gray-500 ml-3">
              ( {product?.reviewCount ?? 0} Reviews)
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              {product?.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{product?.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Sofa</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">{product?.sku}</span>
            </p>
          </div>

          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              $ {product?.price - 1}
            </p>
            <p className="text-base text-gray-400 line-through">
              $ {product?.price}
            </p>
          </div>

          <p className="mt-4 text-gray-600">{product?.description}</p>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <ProductQuantity />
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <AddToCart product={product} />
            <AddToWishList product={product} />
          </div>
          <VariantProduct />
        </div>
      </div>
    </>
  );
};

export default ProductDerails;
