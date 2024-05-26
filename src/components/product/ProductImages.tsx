"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type ProductImagesProps = {
  images: string[];
    thumbnail: string;
};

const ProductImages: React.FC<ProductImagesProps> = ({ images, thumbnail }) => {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>(thumbnail);

  useEffect(() => {
    setAllImages(images);
  }, [images]);


  const handleImageClick = (image: string) => {
    setMainImage(image); // Update the main image on click
  };
 

  return (
    <>
      <Image
        src={mainImage}
        alt="product thumbnail"
        className="w-full"
        width={800}
        height={800}
      />

      <div className="grid grid-cols-5 gap-4 mt-4">
        {allImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="product image"
            className="w-full cursor-pointer border border-primary"
            width={200}
            height={200}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductImages;
