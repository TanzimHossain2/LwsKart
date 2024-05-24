import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const removeWishList = async (userId: string, idProduct: string) => {
  try {
    await dbConnect();
    const productId = new mongoose.Types.ObjectId(idProduct);

    //find the wishlist
    const wishlist = await db.wishlist.findOne({ userId });

    if (!wishlist) {
      return { error: "Wishlist not found", status: 404 };
    }

    //find the product in the wishlist
    const index = wishlist.productIds.indexOf(productId);

    if (index === -1) {
      return { error: "Product not found in wishlist", status: 404 };
    } else {
      wishlist.productIds.splice(index, 1);
      await wishlist.save();
      return {
        message: "Product removed from wishlist",
        status: 200,
        data: wishlist,
      };
    }
  } catch (err) {
    return { error: "Internal server error", status: 500 };
  }
};
