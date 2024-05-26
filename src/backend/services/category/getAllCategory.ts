import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

type Category = {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon?: string;
};

export const getAllCategory = async (): Promise<Category[] | null> => {
  try {
    await dbConnect();
    const categories = await db.category.find();

    const resData: Category[] = categories.map((category) => {
      return {
        id: String(category._id).toString(),
        name: category.name,
        description: category.description || "",
        image: category.image || "",
        icon: category.icon || "",
      };
    });

    return resData || null;
  } catch (err) {
    return null;
  }
};
