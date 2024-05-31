"use client";
import { IProductData } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import AddToCart from "./AddCartWIshLIst/AddToCart";
import { Dictionary } from "@/interfaces/lang";
import { Star } from "lucide-react";

type IProductCard = {
  product: IProductData;
  dictionary: Dictionary;
};

const ProductCard: React.FC<IProductCard> = ({ product, dictionary }) => {
  const [images, setImages] = useState<string[]>([]);
  const currentImageIndexRef = useRef<number>(0);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (product?.images) {
      setImages(product.images);
      setCurrentImage(product.images[0]);
      currentImageIndexRef.current = 0;
    }
  }, [product?.images]);

  const handleImageChange = () => {
    if (images.length > 0) {
      currentImageIndexRef.current =
        (currentImageIndexRef.current + 1) % images.length;
      setCurrentImage(images[currentImageIndexRef.current]);
    }
  };

  const averageRating = Math.round(product?.averageRating ?? 0);

  return (
    <div className="bg-white shadow rounded overflow-hidden flex flex-col h-full group">
      <div className="relative flex-shrink-0">
        <Image
          src={currentImage || "/placeholder.png"}
          alt={`product ${currentImageIndexRef.current + 1}`}
          width={200}
          height={200}
          className="w-full"
        />

        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
            justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <button
            onClick={handleImageChange}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button
            onClick={handleImageChange}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>

      <div className="pt-4 pb-3 px-4 flex-grow">
        <Link href={`/product/${product?.id}`}>
          <h4 className="uppercase font-medium text-lg mb-2 text-gray-800 hover:text-primary transition">
            {product?.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${product?.discountPrice ?? product?.price}
          </p>
          <p className="text-sm text-gray-400 line-through">
            $ {product?.price}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            {Array.from({ length: averageRating }, (_, i) => (
              <span key={i}>
                <Star size={18} key={i} />
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500 ml-3">
            ({product?.reviewCount ?? 0})
          </div>
        </div>
      </div>
      <div className="mt-auto px-4 pb-4">
        <AddToCart
          text={dictionary.landing}
          product={product}
          landingPage={true}
        />
      </div>
    </div>
  );
};

export default ProductCard;
