import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadInvoiceToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
    });

    await unlink(filePath); // Delete the temporary file
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    await unlink(filePath); // Ensure the file is deleted even if upload fails
    throw new Error(`Failed to upload invoice to Cloudinary: ${(error as Error).message}`);
  }
};
