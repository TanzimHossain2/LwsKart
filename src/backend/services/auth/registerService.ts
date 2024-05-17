import { dbConnect } from "@/backend/db/connectDb";
import { userModel } from "../../schema";

interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  

export const registerUser = async ( userData:RegisterData ) => {
    await dbConnect();
    try {
        const user = await userModel.create(userData);

        if (user) {
            return user;
        } else {
            throw new Error('User could not be created');
        }
        
    } catch (err) {
       throw new Error((err as Error).message);
    }
}