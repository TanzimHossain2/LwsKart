import { addVariantProduct } from "@/backend/lib/product/addVariantProduct";
import { deleteProduct, updateProduct, getSingleProductById } from "@/backend/services/product";

import * as z from "zod";


export async function PUT(request: Request, context: any) {
    const { id } = context.params;
    const data = await request.json();
  try {

    const updatedProduct = await updateProduct(id, data);
    return Response.json(updatedProduct);

  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err.errors });
    }
    return Response.json({ error: "Something went wrong" });
  }
}

export async function GET(request: Request, context: any) {
    const { id } = context.params;
    
  try {
        const product = await getSingleProductById(id);
        return Response.json(product);

  } catch (err) {
 
    return Response.json({ error: "Something went wrong" });
  }
}