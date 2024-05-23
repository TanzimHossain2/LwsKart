"use server";

import {
  updateBillingAdress,
  updateShippingAdress,
} from "@/backend/services/user";
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
    const validate = AdressSchema.parse(address);
    const data = sanitizeData(validate);

    if (mode === "shipping") {
      const updatedAddress = await updateShippingAdress(data, id);

      if (updatedAddress.error) {
        return { error: updatedAddress.error };
      }
      revalidatePath("/profile");
      return { success: "Shipping Address updated successfully", code: 200 };
    } else {
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
