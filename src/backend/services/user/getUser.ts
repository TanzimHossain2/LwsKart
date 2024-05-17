import { dbConnect } from "@/backend/db/connectDb";
import { userModel } from "@/backend/schema";

export const getUserByEmail = async (email: string) => {
  try {

    await dbConnect();
    const user = await userModel.findOne({ email });
    return user;

  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserByUsername = async (username: string) => {
  try {

    await dbConnect();
    const user = await userModel.findOne({ username });
    return user;

  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserById = async (id : string) => {

  if (!id) {
    return null;
  }

  try {

    await dbConnect();
    const user = await userModel.findById(id);
    return user;

  } catch (error) {
    throw new Error(String(error));
  }
}

export const existingUserCheck = async (email: string) : Promise<boolean> => {
  try {
    
    await dbConnect();
    const user = await userModel.findOne({ email });

    if (user) {
      return true;
    }
    
    return false;

  } catch (error) {
    throw new Error(String(error));
  }

};



