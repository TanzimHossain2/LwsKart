import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";



export const updateBasicProfile = async (values: any, userId :string) => {
    try {
        await dbConnect();

        const existingUser = await db.user.findOneAndUpdate (
            { _id: userId },
         values,
            { new: true }  
        )

        return {
            message: "User updated successfully",
            status: 200,
            success: true,
        }
        
        
    } catch (err) {
        
    }
}