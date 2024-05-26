import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { modifyArrayData } from "@/utils/data";

export const getTrendingProducts = async () => {
    try {
        await dbConnect();
        const trendingProducts = await db.product.find({ isTrending: true }).lean().exec()
        return modifyArrayData(trendingProducts) || null;
    } catch (err) {
        return null;
    }
}