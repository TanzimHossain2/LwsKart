import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const removeToCart = async (userId: string, productId: string) => {
  await dbConnect();
  try {
    const cart = await db.cart.findOne({ userId });

    if (!cart) {
      return { status: 404, error: "Cart not found" };
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    return { status: 200, message: "Product removed from cart", data: cart };
  } catch (err) {
    return { status: 500, error: "Internal server error" };
  }
};
