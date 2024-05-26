"use server";

import { updateBasicProfile } from "@/backend/services/user/updateBasicProfile";
import { currentUser } from "@/lib/authUser";
import { sanitizeData } from "@/utils/sanitizeData.utils";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const updateBasicInformation = async (values: any) => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return {
        error: "You need to be authenticated to update your info",
      };
    }

    const sanitizedData = sanitizeData(values);

    //if images then images upload cloudinary and get the url
    if (sanitizedData.image) {
      // Configure cloudinary
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const { secure_url } = await cloudinary.uploader.upload(
          sanitizedData.image,
          {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          }
        );

        sanitizedData.image = secure_url;
      } catch (err) {
        return {
          error: "Failed to upload image",
        };
      }
    }

    // Update the user info

    const res = await updateBasicProfile(sanitizedData, userId);

    if (res?.status !== 200) {
      return {
        error: "Failed to update user info",
      };
    }

    // revalidate the user
    revalidatePath("/profile");

    return {
      message: "User info updated successfully",
      status: 200,
      success: true,
    };

  } catch (err) {
    return {
      error: (err as Error).message,
    };
  }
};
