import { productSchema } from "@/schemas/product";
import * as z from "zod";
import { v2 as cloudinary } from "cloudinary";
import { addProduct } from "@/backend/services/product";

export const addProductData = async (
  productData: z.infer<typeof productSchema>
) => {
  try {
    const validatedProductData = productSchema.parse(productData);

    // Upload images to cloudinary
    const images = validatedProductData.images;
    if (images) {

        // Configure cloudinary
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

        const imageUrls: string[] = [];
        

        for (const image of images) {
          const { secure_url } = await cloudinary.uploader.upload(image, {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          });
          imageUrls.push(secure_url);
        }
        // add image urls to product data
        validatedProductData.images = imageUrls;
    }

    // Add product data to database
    const newProduct = await addProduct(validatedProductData);
    return newProduct;
    
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.errors);
    } else {
      console.log(err);
    }
  }
};
