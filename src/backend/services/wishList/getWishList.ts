import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";


export const getWishList = async (userId: string) => {
    try {
        await dbConnect();

        const wishlist = await db.wishlist
            .findOne({ userId })
            .populate({
                path: 'productIds',
                select: 'name price images stock' 
            });
            
        if (!wishlist) {
            return { error: "Wishlist not found", status: 404 };
        }
   
        return {
            message: "Wishlist found",
            status: 200,
            data: wishlist,
        };
        
    } catch (err) {
        return { error: "Internal server error", status: 500 };
    }
}