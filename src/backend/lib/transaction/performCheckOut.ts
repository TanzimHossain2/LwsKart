import {
  saveOrder,
} from "@/backend/services/transaction";
import { OrderDataSchema } from "@/schemas/transaction";
import * as z from "zod";
import { IOrder } from "@/backend/schema/transaction/order.model";
import mongoose from "mongoose";

type IData = z.infer<typeof OrderDataSchema>;

export const performCheckOut = async (values: IData, userId: string) => {
  try {
    const orderInformation = OrderDataSchema.parse(values);
    const { user, products, totalPrice, paymentMethod } = orderInformation;

    user.id = userId;

    const orderData = {
      userId: new mongoose.Types.ObjectId(user.id),
      user: user,
      products: products,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      status: "pending",
    };

    const newOrder: IOrder = await saveOrder(orderData);
 
    if (!newOrder) {
      throw new Error("Order not created");
    }

    return {
      success: "Order created successfully",
      orderId: newOrder._id.toString(),
      status: 201,
      paymentMethod: newOrder.paymentMethod,
    };

  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      throw {
        error: err.errors.map((err) => err.message),
        data: null,
        status: 400,
      };
    }
    throw new Error("Internal Server Error");
  }
};
