import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  number: string;
}

export const registerUser = async (userData: RegisterData) => {
  await dbConnect();
  try {
    const user = await db.user.create(userData);

    if (user) {
      return user;
    } else {
      throw new Error("User could not be created");
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
