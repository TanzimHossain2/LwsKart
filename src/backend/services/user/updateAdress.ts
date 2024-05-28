import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const updateShippingAdress = async (address: any, id: string) => {
  try {
    await dbConnect();
    const updatedAddress = await db.shippingAddress.findOneAndUpdate(
      { _id: id },
      address,
      { new: true }
    );
    return { address: updatedAddress };
  } catch (err) {
    return { error: err as Error };
  }
};

export const updateBillingAdress = async (address: any, id: string) => {
  try {
    await dbConnect();
    const updatedAddress = await db.billingAddress.findOneAndUpdate(
      { _id: id },
      address,
      { new: true }
    );
    return { address: updatedAddress };
  } catch (err) {
    return { error: err as Error };
  }
};

// create shiping address if not exist
export const createShippingAddress = async (address: any, id: string) => {

  try {
    await dbConnect();

    const userId = new mongoose.Types.ObjectId(id);

    const data = { ...address, userId };
   
    const newAddress = await db.shippingAddress.create(data);
    return { address: newAddress };
  } catch (err) {
    return { error: err as Error };
  }
};

// create billing address if not exist
export const createBillingAddress = async (address: any, id: string) => {
  try {
    await dbConnect();

    const userId = new mongoose.Types.ObjectId(id);

    const data = { ...address, userId };


    const newAddress = await db.billingAddress.create(data);
    return { address: newAddress };
  } catch (err) {
    return { error: err as Error };
  }
};
