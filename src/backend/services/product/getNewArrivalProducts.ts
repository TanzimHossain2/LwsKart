import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { modifyArrayData } from "@/utils/data";

export const getNewArrivalProducts = async () => {
  try {
    await dbConnect();
    const newArrivalProducts = await db.product
      .find({ isNewArrival: true }).sort({ createdAt: -1 }).lean().exec();
 
    return modifyArrayData(newArrivalProducts) || null;
  } catch (err) {
    return null;
  }
};
