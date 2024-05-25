"use server";

import { db } from "@/backend/schema";
import {
  createBillingAddress,
  createShippingAddress,
  updateBillingAdress,
  updateShippingAdress,
} from "@/backend/services/user";
import { currentUser } from "@/lib/authUser";
import { AdressSchema } from "@/schemas/adress";
import { sanitizeData } from "@/utils/sanitizeData.utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";

type IAdress = z.infer<typeof AdressSchema>;
type Mode = "shipping" | "billing";

export const updateAddress = async (
  address: IAdress,
  id: string,
  mode: Mode
) => {
  try {
    const user  =await currentUser();
    const userId = user?.id;

    const validate = AdressSchema.parse(address);
    const data = sanitizeData(validate);

    if (mode === "shipping") {

      // create shiping address if not exist
      const  shippingAddress = await db.shippingAddress.findOne({ userId });

      if ( !shippingAddress) {
        const newAddress = await createShippingAddress(data, userId as string);
        if (newAddress.error) {
          return { error: newAddress.error };
        }
        revalidatePath("/profile");
        return { success: "Shipping Address created successfully", code: 200 };
      }

      const updatedAddress = await updateShippingAdress(data, id);
     
      if (updatedAddress.error) {
        return { error: updatedAddress.error };
      }
      revalidatePath("/profile");
      return { success: "Shipping Address updated successfully", code: 200 };


    } else {
   
      // create billing address if not exist
      const billingAddress = await db.billingAddress.findOne({ userId });

      if (!billingAddress) {
        const newAddress = await createBillingAddress(data, userId as string);
        if (newAddress.error) {
          return { error: newAddress.error };
        }
        revalidatePath("/profile");
        return { success: "Billing Address created successfully", code: 200 };
      }


      const updatedAddress = await updateBillingAdress(data, id);

      if (updatedAddress.error) {
        return { error: updatedAddress.error };
      }

      revalidatePath("/profile");
      return { success: "Billing Address updated successfully", code: 200 };
    }

  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors };
    }
    return { error: err as Error };
  }
};
