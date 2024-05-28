import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import mongoose from "mongoose";

export const getProductReview = async (productId: string) => {
  try {
    await dbConnect();
    const id = new mongoose.Types.ObjectId(productId);

    const reviews = await db.review
      .find({ product: id })
      .populate({
        path: "user",
        select: "username email name role number image",
      })
      .select("-__v")
      .lean()
      .exec();

    const modifiedReviews = reviews.map((review) => {
      return {
        ...review,
        id: review._id.toString(),
        user: {
          ...review.user,
          id: review.user._id.toString(),
        },
      };
    });

    if (!modifiedReviews) {
      return {
        success: false,
        message: "Reviews not found",
        status: 404,
      };
    }

    return {
      success: true,
      message: "Reviews fetched successfully",
      modifiedReviews,
      status: 200,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      success: false,
      message: "An error occurred while creating the review",
      error: err,
      status: 500,
    };
  }
};

export const getProductReviewById = async (reviewId: string) => {
  try {
    await dbConnect();
    // const id = new mongoose.Types.ObjectId(reviewId);

    const review = await db.review
      .findById(reviewId)
      .populate({
        path: "user",
        select: "username email name role number image",
      })
      .select("-__v")
      .lean()
      .exec();

    if (!review) {
      return {
        success: false,
        message: "Review not found",
        status: 404,
      };
    }

    return {
      success: true,
      message: "Review fetched successfully",
      review,
      status: 200,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      success: false,
      message: "An error occurred while fetching the review",
      error: err,
      status: 500,
    };
  }
};
