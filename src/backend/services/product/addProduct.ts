import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { IProductData } from "@/interfaces/product";
import { productSchema } from "@/schemas/product";
import mongoose from "mongoose";
import * as z from "zod";

export const addProduct = async (productData:  z.infer<typeof productSchema>) => {
  try {
    await dbConnect();

    const  data = {
      ...productData,
      category: new mongoose.Types.ObjectId(productData.category)
    }

    const newProduct = new db.product(data);

    await newProduct.save();

    return newProduct;

  } catch (err) {

    return null;
    
  }

};
