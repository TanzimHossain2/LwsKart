import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { ObjectId } from "mongodb";

export const getWishListProductById = async (productId: ObjectId) => {
  try {
    await dbConnect();

    const product = await db.product
      .findById(productId)
      .select("name price images stock");

    if (!product) {
      return { error: "Product not found", status: 404 };
    }
    return {
      message: "Product found",
      status: 200,
      data: product,
    };
  } catch (err) {
    return { error: "Internal server error", status: 500 };
  }
};




