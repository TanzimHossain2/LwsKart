"use client";

import useAxios from "@/hooks/use-axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReviews } from "@/providers/ReviewsContext";

const ReviewSchema = z.object({
  rating: z
    .number()
    .min(0, "Minimum rating is 0")
    .max(5, "Maximum rating is 5"),
  comment: z
    .string()
    .min(1, "Comment is required")
    .max(500, "Comment is too long"),
});

type Inputs = z.infer<typeof ReviewSchema>;
type ReviewFormProps = {
  productId: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const user = useCurrentUser();
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const { addReview } = useReviews();

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axiosInstance.post("/api/reviews", {
        productId,
        // @ts-ignore
        userId: user?.id,
        rating: data.rating,
        comment: data.comment,
      });

      if (res.status === 201) {
        addReview(res.data.review);
        reset();
        router.refresh(); 
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Add a Review
        </h3>
        <p className="mb-4 text-gray-600">
          You need to be logged in to post a review.
        </p>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md mt-8"
    >
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Add a Review
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <input
          type="number"
          {...register("rating", { valueAsNumber: true })}
          min={0}
          max={5}
          className={`w-full border ${
            errors.rating ? "border-red-500" : "border-gray-300"
          } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.rating && (
          <span className="text-red-500 text-sm">{errors.rating.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          {...register("comment")}
          className={`w-full border ${
            errors.comment ? "border-red-500" : "border-gray-300"
          } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
        />
        {errors.comment && (
          <span className="text-red-500 text-sm">{errors.comment.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
