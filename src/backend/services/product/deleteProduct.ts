import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const deleteProduct = async (productId: string) => {
  try {
    await dbConnect();
    const product = await db.product.findByIdAndDelete(productId);
    return product;
  } catch (err) {
    console.log(err);
    throw (err as Error).message;
  }
};
