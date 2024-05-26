import { addVariant } from "@/backend/services/product";
import { variantSchema } from "@/schemas/product";
import * as z from "zod";

type AddVariantProductInput = z.infer<typeof variantSchema>;

export const addVariantProduct = async (values: AddVariantProductInput) => {
  try {
    const validate = variantSchema.parse(values);

    const variant = await addVariant(validate);

    return variant;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors };
    }
    return null;
  }
};
