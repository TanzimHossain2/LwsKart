import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const addWishList = async (userId: string, idProduct: string) => {
  try {
    await dbConnect();
    const productId = new mongoose.Types.ObjectId(idProduct);

    const product = await db.product
      .findById(productId)
      .select("name price images stock ");

    if (!product) {
      return { error: "Product not found", status: 404 };
    }

    // Check if wishlist exists for the user
    let wishlist = await db.wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist
      wishlist = new db.wishlist({ userId, productIdsx: [] });
    } else {
      // Check if product already in wishlist
      if (wishlist.productIds.includes(productId)) {
        return { error: "Product already in wishlist", status: 400 };
      }
    }

    wishlist.productIds.push(productId);

    await wishlist.save();

    return {
      message: "Product added to wishlist",
      status: 200,
      data: wishlist,
    };
  } catch (err) {
    console.log("Error in add to wishlist route", err);
    
    return { error: "Internal server error", status: 500 };
  }
};
