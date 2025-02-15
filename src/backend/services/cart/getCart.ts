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

        const productIds = cart.items.map((item) => item.productId);

        // Fetch product details using product IDs
        const products = await ProductModel.find({ _id: { $in: productIds } });


        // Map product details to their IDs for quick lookup
        const productMap: Record<string, IProductData> = products.reduce((acc, product) => {
            // @ts-ignore
            acc[product._id.toString()] = product;
            return acc;
        }, {});

        // Map the cart items with the corresponding product details
        const updatedItems = cart.items.map((item) => ({
            ...item.toObject(),
            productId: productMap[item.productId.toString()]._id,
            stock: productMap[item.productId.toString()]?.stock || 0,
        })); 

        const updatedCart = {
            ...cart.toObject(),
            items: updatedItems,
        };
        
        return { status: 200, data: updatedCart };

    } catch (err) {
        console.error(err);
        return { status: 500, error: "Internal server error" };
    }
}
