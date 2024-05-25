import { db } from "@/backend/schema";
import mongoose from "mongoose";

const checkOrderStatus = async (orderId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await db.order.findById(orderId).session(session);

    if (!order) {
      throw new Error("Order not found");
    }

    let currentTime = new Date();
    let orderCreationTime = order.createdAt as Date; 
    let timeDifference = currentTime.getTime() - orderCreationTime.getTime();
    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

    if (order.status === "pending" && timeDifferenceInMinutes >= 5) {
      // If the order is pending for more than 5 minutes, cancel the order
      order.status = "cancelled";

      // Restore the stock
      for (const item of order.products) {
        const product = await db.product
          .findById(item.productId)
          .session(session);
        if (product) {
          product.stock += item.quantity;
          await product.save({ session });
        }
      }

      // Save the updated order and commit the transaction
      await order.save({ session });
      await session.commitTransaction();
      session.endSession();

     throw new Error("Order cancelled due to inactivity");
    }

    // If the order is not pending for more than 5 minutes, simply commit the transaction
    await session.commitTransaction();
    session.endSession();

    return true;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export default checkOrderStatus;
