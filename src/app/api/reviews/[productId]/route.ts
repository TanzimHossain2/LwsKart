import { getProductReview } from "@/backend/services/product";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: { productId: any } }
) {
  try {
    const { productId } = context.params;

    const reviews = await getProductReview(productId);

    if (reviews.status === 404) {
      return new Response("Reviews not found", {
        status: 404,
      });
    }

    if (!reviews.success) {
      return new Response("An error occurred while fetching the reviews", {
        status: 500,
      });
    }

    return new Response(JSON.stringify(reviews.modifiedReviews), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response("An error occurred while fetching the reviews", {
      status: 500,
    });
  }
}
