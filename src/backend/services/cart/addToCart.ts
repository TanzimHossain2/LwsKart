import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const addToCart = async (userId: string, productId: string, quantity: number) => {
    try {
        await dbConnect();

        const product = await db.product.findById(productId);
        if (!product || product.stock < quantity) {
           return { error: "Product not found or out of stock", status: 404}
        }

    // Check if cart exists for the user
      let cart = await db.cart.findOne({ userId });

      if (!cart) {
        // Create a new cart
        cart = new db.cart({ userId, items: [] });
      }

      // Check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({
            productId: new mongoose.Types.ObjectId(productId),
            quantity,
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.images[0],
            weight: product.weight || 0,
            stock: product.stock || 0,
          });
      }

        await cart.save();

        return { message: "Product added to cart", status: 200, data: cart };

    } catch (err) {
        return { error: "Internal server error", status: 500 };
    }
}