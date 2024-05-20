import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { ICategory } from "@/interfaces/product";

export const addCategory = async (categoryData: ICategory) => {
  try {
    await dbConnect();

    const category = new db.category(categoryData);
    await category.save();

    return category;
  } catch (err) {
    return null;
  }
};
