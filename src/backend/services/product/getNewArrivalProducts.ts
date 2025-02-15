import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { modifyArrayData } from "@/utils/data";

export const getNewArrivalProducts = async () => {
  try {
    await dbConnect();
    const newArrivalProducts = await db.product
      .find({ isNewArrival: true })
      .select("name price discountPrice reviewCount images averageRating category")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean().exec();
 
    return modifyArrayData(newArrivalProducts) || null;
  } catch (err) {
    return null;
  }
};
