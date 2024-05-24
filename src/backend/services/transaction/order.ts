import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { OrderDataSchema } from "@/schemas/transaction";
import * as z from "zod";

type IData = z.infer<typeof OrderDataSchema>;

export const saveOrder = async (orderData: IData) => {
  try {
    await dbConnect();

    const newOrder = await db.order.create(orderData);

    if (!newOrder) {
      throw new Error("Order not created");
    }

    return newOrder;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};
