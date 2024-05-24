import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const updateCart = async (userId: string, productId: string, quantity: number) => {
    await dbConnect();

    if (quantity <= 0) {
        return { error: "Quantity must be greater than zero", status: 400 };
    }

    const product = await db.product.findById({ _id: productId });

    if (!product) {
        return { error: "Product not found", status: 404 };
    }

    
    
    try {
        const cart = await db.cart.findOne({ userId});

        if (!cart) {
            return { error: "Cart not found", status: 404 };
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity; 
            cart.items[itemIndex].stock = product.stock;
            await cart.save();
            return { message: "Cart updated successfully", status: 200, data: cart };

        } else {
            return { error: "Product not found in cart", status: 404 };
        }
    } catch (err) {
        return { error: "Internal server error", status: 500 };
    }
}