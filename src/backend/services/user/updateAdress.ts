import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

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
