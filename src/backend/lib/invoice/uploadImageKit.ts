/*


import ImageKit from "imagekit";
import { unlink } from 'fs/promises';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ?? "",
});

export const uploadInvoiceToImageKit = async (filePath: string): Promise<string> => {
  try {
    const result = await imagekit.upload({
      file: filePath,
      fileName: `invoice-${Date.now()}.pdf`,
      folder: "/invoices",
    });
    console.log("result uploadInvoiceToImageKit", result);

    await unlink(filePath); // Delete the temporary file
    return result.url;
  } catch (error) {
    await unlink(filePath); // Ensure the file is deleted even if upload fails
    throw new Error(`Failed to upload invoice to ImageKit: ${(error as Error).message}`);
  }
};

*/
