import { variantSchema } from "@/schemas/product";
import * as z from "zod";

type AddVariantProductInput = z.infer<typeof variantSchema>;

export async function POST(request: Request, context: any) {
  const { variantId } = context.params;

  const values: AddVariantProductInput = await request.json();

  try {
    //validate
    const validate = variantSchema.safeParse(values);

    if (!validate.success) {
      return Response.json({ error: validate.error });
    }

    return new Response("POST request received variants");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err.errors });
    }
    return Response.json({ error: "Something went wrong" });
  }
}

export async function GET(request: Request, context: any) {
  const { variantId } = context.params;

  return Response.json({ message: "GET request received variants" });
}
export async function PUT(request: Request, context: any) {
  const { variantId } = context.params;

  return new Response("PUT request received variants");
}

export async function DELETE(request: Request, context: any) {
  const { variantId } = context.params;

  return Response.json({ message: "DELETE request received variants" });
}
