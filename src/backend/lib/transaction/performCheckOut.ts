import {
  checkAndReserveStock,
  saveOrder,
} from "@/backend/services/transaction";
import { OrderDataSchema } from "@/schemas/transaction";
import * as z from "zod";

type IData = z.infer<typeof OrderDataSchema>;

export const performCheckOut = async (values: IData, userId: string) => {
  try {
    const orderInformation = OrderDataSchema.parse(values);
    const { user, products, totalPrice, paymentMethod } = orderInformation;

    user.id = userId;

    const orderData = {
      user: user,
      products: products,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      status: "pending",
    };

    await checkAndReserveStock(orderData.products);

    const res = await saveOrder(orderData);

    if (!res) {
      throw { error: "Order not created", data: null, status: 400 };
    }

    return {
      success: "Order created successfully",
      orderId: res._id,
      status: 201,
    };

  } catch (err) {
    if (err instanceof z.ZodError) {
      throw {
        error: err.errors.map((err) => err.message),
        data: null,
        status: 400,
      };
    } else if ((err as Error).message.includes("out of stock")) {
      console.error((err as Error).message);
      throw { error: [(err as Error).message], data: null, status: 400 };
    } else {
      console.error(err);
      throw { error: ["Internal Server Error"], data: null, status: 500 };
    }
  }
};
