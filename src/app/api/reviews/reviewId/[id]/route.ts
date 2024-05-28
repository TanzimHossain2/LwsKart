import { getProductReview } from "@/backend/services/product";
import { getProductReviewById } from "@/backend/services/product/getProductReview";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, context: { params: { id: any } }) {
  try {
    const { id } = context.params;

    const res = await getProductReviewById(id);

    if (res.status === 404) {
      return new Response("Reviews not found", {
        status: 404,
      });
    }

    if (!res.success) {
      return new Response("An error occurred while fetching the reviews", {
        status: 500,
      });
    }

    return Response.json(res);
  } catch (err) {
    return new Response("An error occurred while fetching the reviews", {
      status: 500,
    });
  }
}
