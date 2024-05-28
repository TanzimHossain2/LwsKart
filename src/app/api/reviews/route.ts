import { createReview, getProductReview } from "@/backend/services/product";
import { getProductReviewById } from "@/backend/services/product/getProductReview";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, productId, rating, comment } = await req.json();

    // Parse the rating value to ensure it's a number
    const parsedRating = parseFloat(rating);

    if (!userId || !productId || isNaN(parsedRating) || !comment) {
      return new Response("Missing required fields", { status: 400 });
    }

    const res = await createReview(userId, productId, parsedRating, comment);

    if (!res.success) {
      return new Response("An error occurred while creating the review", {
        status: 500,
      });
    }

    // Fetch the review for the product
    const review = await getProductReviewById(res?.review?._id as any);

    return new Response(JSON.stringify(review), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response("An error occurred while creating the review", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const reviews = await getProductReview(productId);

    if (!reviews.success) {
      return new Response("An error occurred while fetching the reviews", {
        status: 500,
      });
    }
  } catch (err) {
    return new Response("An error occurred while fetching the reviews", {
      status: 500,
    });
  }
}
