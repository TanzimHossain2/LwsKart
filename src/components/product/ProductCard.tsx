"use client";
import { IProductData } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type IProductCard = {
  product: IProductData;
};

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const [images, setImages] = useState<string[]>([]);
  const currentImageIndexRef = useRef<number>(0);
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (product?.images) {
      setImages(product.images);
      setCurrentImage(product.images[0]);
      currentImageIndexRef.current = 0;
    }
  }, [product?.images]);

  const handleImageChange = () => {
    if (images.length > 0) {
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length;
      setCurrentImage(images[currentImageIndexRef.current]);
    }
  };

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Image src={currentImage || '/placeholder.png'} alt={`product ${currentImageIndexRef.current + 1}`} width={200} height={200} />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
            justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <button onClick={handleImageChange} className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button onClick={handleImageChange} className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>

      <div className="pt-4 pb-3 px-4">
        <Link href={`/product-details/${product?.id}`}>
          <h4 className="uppercase font-medium text-lg mb-2 text-gray-800 hover:text-primary transition">
            {product?.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">${product?.price - 1}</p>
          <p className="text-sm text-gray-400 line-through">$ {product?.price}</p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span><i className="fa-solid fa-star"></i></span>
            <span><i className="fa-solid fa-star"></i></span>
            <span><i className="fa-solid fa-star"></i></span>
            <span><i className="fa-solid fa-star"></i></span>
            <span><i className="fa-solid fa-star"></i></span>
          </div>
          <div className="text-xs text-gray-500 ml-3">(
            {product?.reviewCount ?? 0}
          )</div>
        </div>
      </div>

      <Link href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</Link>
    </div>
  );
};

export default ProductCard;
