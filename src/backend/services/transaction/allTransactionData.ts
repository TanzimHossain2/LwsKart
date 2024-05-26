import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const allTransactionData = async (userid: string) => {
  try {
    await dbConnect();

    const allTransaction = await db.order
      .find({ userId: userid })
      .select("totalPrice paymentMethod status createdAt products")
      .populate("products")
      .sort({ createdAt: -1 })
      .exec();

    return { success: allTransaction };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};
