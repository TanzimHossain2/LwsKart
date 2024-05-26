import { addCategory } from "@/backend/services/category";
import { v2 as cloudinary } from "cloudinary";

export const addCategoryData = async (categoryData: any) => {
  try {
    const { name, description, image, icon } = categoryData;

    if (!name) {
      return {
        error: "Name is required",
        status: 400,
      };
    }

    // Configure cloudinary
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload image to cloudinary

    if (image) {
      try {
        const { secure_url } = await cloudinary.uploader.upload(image, {
          upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        });

        categoryData.image = secure_url;
      } catch (err) {
        return {
          error: "Failed to upload image",
          status: 400,
        };
      }
    }

    // Upload icon to cloudinary
    if (icon) {
      try {
        const { secure_url } = await cloudinary.uploader.upload(icon, {
          upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        });

        categoryData.icon = secure_url;
      } catch (err) {
        return {
          error: "Failed to upload icon",
          status: 400,
        };
      }
    }

    // Add category to the database
    const res = await addCategory(categoryData);

    if (!res) {
      return {
        error: "Failed to add category",
        status: 400,
      };
    }

    return {
      message: "Category added successfully",
      status: 200,
      success: true,
    };

  } catch (err) {
    return {
      error: (err as Error).message,
      status: 400,
    };
  }
};
