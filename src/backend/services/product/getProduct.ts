import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { IProductData } from "@/interfaces/product";
import { modifyArrayData, modifyObjData } from "@/utils/data";

export const getAllProduct = async (): Promise<IProductData[] | null> => {
  try {
    await dbConnect();
    const products = await db.product.find().lean();
    return modifyArrayData(products) || null;
  } catch (err) {
    return null;
  }
};

export const getSingleProductById = async (id: string): Promise<IProductData | null> => {
  try {
    await dbConnect();
    const product = await db.product.findById(id).lean();
    return modifyObjData(product) || null;
  } catch (err) {
    return null;
  }
}

export const getProductsByCategoryId = async (id: string): Promise<IProductData[] | null> => {
  try {
    await dbConnect();
    const products = await db.product.find({ category: id }).lean().exec(); 
    return modifyArrayData(products) || null;
  } catch (err) {
    return null;
  }
}
