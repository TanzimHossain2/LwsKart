import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { IOrder } from "@/backend/schema/transaction/order.model";
import { OrderDataSchema } from "@/schemas/transaction";
import mongoose from "mongoose";
import * as z from "zod";
import { checkAndReserveStock } from "./checkAndReserveStock";

type IData = z.infer<typeof OrderDataSchema>;

export const saveOrder = async (orderData: IData):Promise<IOrder>=> {
  try {
    await dbConnect();
    const session = await mongoose.startSession();
     session.startTransaction();

     
    // Check and reserve stock before creating the order
    await checkAndReserveStock(orderData.products);

    const newOrder = await db.order.create([orderData], { session });

    if (!newOrder) {
      throw new Error("Order not created");
    }

    await session.commitTransaction();
    session.endSession();

   

    return newOrder[0] as IOrder;

  } catch (err) {
 
    throw new Error("Internal Server Error");
  }
};
