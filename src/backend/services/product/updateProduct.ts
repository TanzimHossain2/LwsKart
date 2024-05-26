import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const updateProduct = async (
  productId: string,
  updatedProductData: any
) => {
  try {
    await dbConnect();
    const product = await db.product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    return product;
  } catch (err) {
    console.log(err);
    throw (err as Error).message;
  }
};
