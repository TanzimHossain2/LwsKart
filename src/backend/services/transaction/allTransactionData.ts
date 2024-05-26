import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const allTransactionData = async (userid: string) => {
  try {
    await dbConnect();

    const allTransaction = await db.order
      .find({ userId: userid })
      .populate("products")
      .exec();

    return { success: allTransaction };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};
