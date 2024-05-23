import { dbConnect } from "@/backend/db/connectDb";
import CartModel from "@/backend/schema/product/cart.model";
import ProductModel from "@/backend/schema/product/product.model";
import mongoose from "mongoose";
import { ICartItem, IProductData } from "@/interfaces/product";

// Extend ICartItem to include the populated product
interface PopulatedCartItem extends Omit<ICartItem, 'productId'> {
    productId: IProductData;
}

export const getCart = async (userId: string | number) => {
    try {
        await dbConnect();
        const id = new mongoose.Types.ObjectId(userId);
        const cart = await CartModel.findOne({ userId: id });

        if (!cart) {
            return { status: 404, error: "Cart not found" };
        }

        // Extract product IDs from the cart items
        const productIds = cart.items.map((item) => item.productId);

        // Fetch product details using product IDs
        const products = await ProductModel.find({ _id: { $in: productIds } });

        // Map product details to their IDs for quick lookup
        const productMap: Record<string, IProductData> = products.reduce((acc, product) => {
            acc[product._id.toString()] = product;
            return acc;
        }, {});

        // Map the cart items with the corresponding product details
        const updatedItems = cart.items.map((item) => ({
            ...item.toObject(),
            // data : productMap[item.productId.toString()],
            productId: productMap[item.productId.toString()]._id,
            stock: productMap[item.productId.toString()]?.stock || 0,
        })); 

        // Create updated cart data with detailed items
        const updatedCart = {
            ...cart.toObject(),
            items: updatedItems,
        };

        console.log(updatedItems);
        

        return { status: 200, data: updatedCart };

    } catch (err) {
        console.error(err);
        return { status: 500, error: "Internal server error" };
    }
}
