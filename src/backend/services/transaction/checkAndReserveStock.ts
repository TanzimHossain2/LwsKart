import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const checkAndReserveStock = async (products: any[]) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    await dbConnect();

    try {

      for (const item of products) {
        const product = await db.product.findById(item.productId).session(session);

        if (!product || product.stock < item.quantity) {
          throw new Error(`Product ${item.name} is out of stock`);
        }

          // Prevent the stock from going negative
          if (product.stock - item.quantity < 0) {
            throw new Error(`Insufficient stock for product ${item.name}`);
          }

        product.stock -= item.quantity;
        await product.save({ session });
      }

      await session.commitTransaction();

    } catch (err) {
      await session.abortTransaction();
      throw err;

    } finally {

      session.endSession();

    }

  };