"use client";

import useAxios from "@/hooks/use-axios";
import { useReviews } from "@/providers/ReviewsContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";


const ReviewsList = ({ productId }: any) => {
  const { fetchReviews, reviews } = useReviews();


  useEffect(() => {
    fetchReviews(productId);

  }, [productId, fetchReviews]);


  return (
    <div className="mt-8">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review?._id}
            className="mb-8 p-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-4">
                <Image
                  src={review?.user?.image}
                  alt={`${review.user.name}'s avatar`}
                  className="rounded-full"
                  height={40}
                  width={40}
                />
              </div>
              <div>
                <p className="font-semibold">{review?.user?.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold text-yellow-500">{review?.rating} / 5</p>
            </div>

            <p>{review?.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
