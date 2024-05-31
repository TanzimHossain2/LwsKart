import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { modifyObjData } from "@/utils/data";

export const getUserByEmail = async (email: string) => {
  try {
    await dbConnect();
    const user = await db.user.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    await dbConnect();
    const user = await db.user.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserById = async (id: string) => {
  if (!id) {
    return null;
  }

  try {
    await dbConnect();
    const user = await db.user.findById(id)
    .select("-__v")

    ;
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const existingUserCheck = async (email: string): Promise<boolean> => {
  try {
    await dbConnect();
    const user = await db.user.findOne({ email });

    if (user) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(String(error));
  }
};
