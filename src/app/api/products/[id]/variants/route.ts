import { addVariantProduct } from "@/backend/lib/product/addVariantProduct";
import { variantSchema } from "@/schemas/product";
import * as z from "zod";

type AddVariantProductInput = z.infer<typeof variantSchema>;

export async function POST(request: Request, context: any) {
  const { id } = context.params;
  const values: AddVariantProductInput = await request.json();

  try {
    const validate = variantSchema.safeParse(values);

    if (!validate.success) {
      return Response.json({ error: validate.error });
    }

    const variant = await addVariantProduct(validate.data);

    return Response.json({ variant });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err.errors });
    }
    return Response.json({ error: "Something went wrong" });
  }
}


export async function GET(request: Request, context:any) {
    const { id } = context.params;

    return  Response.json({ message: 'GET request received' });
}