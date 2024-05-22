import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { IVariant } from "@/interfaces/product";
import { variantSchema } from "@/schemas/product";
import * as z from "zod";

type AddVariantProductInput = z.infer<typeof variantSchema>;

export const addVariant = async (variantData: AddVariantProductInput) => {
  try {
    await dbConnect();

    const variant = new db.variant(variantData);
    await variant.save();

    // Update the product to reference the new variant

    await db.product.findByIdAndUpdate (
        variantData.productId,
        { $push: { variants: variant._id } }
    )

    return variant;

  } catch (err) {
    return null;
  }
};
