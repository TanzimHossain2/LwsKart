import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose, { ObjectId } from "mongoose";
import { redirect } from "next/navigation";


type PaymentInfo = "cash" | "card" | "paypal" | "crypto";

export const handlePayment = async (
  orderId: string,
  paymentInfo: PaymentInfo
) => {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await db.order.findById(orderId).session(session);

    if (!order) {
      throw new Error("Order not found");
    }

    // Check if the order status is already "cancelled" or "failed"
    if (order.status === "cancelled" || order.status === "failed") {
      throw new Error("Order is already cancelled or failed");
    }

    // if the order status is already "confirmed", redirect to success page
    if (order.status === "confirmed") {
      throw new Error("Order is already confirmed");
    }



    const paymentSuccess = await processPayment(paymentInfo);

    if (paymentSuccess) {
      order.status = "confirmed";
    } else {
      order.status = "failed";
      order.markModified("status");
      for (const item of order.products) {
        const product = await db.product
          .findById(item.productId)
          .session(session);
        if (product) {
          product.stock += item.quantity;
          await product.save({ session });
        }
      }
    }

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return paymentSuccess;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const processPayment = async (paymentInfo: PaymentInfo) => {
  try {
    // Simulate a payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (Math.random() < 0.2) {
      throw new Error("Payment failed");
    }

    return true; // Simulate a successful payment
  } catch (error) {
    console.error("Error in processPayment:", error);
    return false; // Return false on error
  }
};
