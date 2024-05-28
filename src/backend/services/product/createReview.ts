import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const createReview = async (
  userId: string,
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    await dbConnect();

    const review = new db.review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await review.save();

    // Update the product's average rating and review count
    const product = await db.product.findById(productId);
    if (product) {
      product.reviewCount += 1;
      product.averageRating =
        (product.averageRating * (product.reviewCount - 1) + rating) /
        product.reviewCount;
      product.reviewIds.push(review._id as any);
      await product.save();
    }


    return {
      success: true,
      message: "Review created successfully",
      review,
      status: 201,
    };
  } catch (err) {
    console.log("Error from db Create Review ", err);

    return {
      success: false,
      message: "An error occurred while creating the review",
      error: err,
      status: 500,
    };
  }
};
