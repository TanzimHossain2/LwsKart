import { getProductsByCategoryId } from "@/backend/services/product";

export async function GET (request: Request, context: any) {
  const {
    id
  } = context.params;
  try {
    const product = await getProductsByCategoryId(id);
    return Response.json(product);
  } catch (err) {
    return Response.json({
      error: "Something went wrong"
    });
  }
}