"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import useAxios from "@/hooks/use-axios";

type Review = {
  _id: string;
  id: string;
  user: { name: string; image: string };
  rating: number;
  comment: string;
  date: string;
};

type ReviewsContextType = {
  reviews: Review[];
  addReview: (review: Review) => void;
  fetchReviews: (productId: string) => void;
};


// create context
const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

// hook to use reviews
export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};

type ReviewsProviderProps = {
  children: ReactNode;
};

// provider
export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const { axiosInstance } = useAxios();
  const [reviews, setReviews] = useState<Review[]>([]);

  //callback function to fetch reviews
  const fetchReviews = useCallback(async (productId: string) => {
    try {
      const response = await axiosInstance.get(`/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  }, [axiosInstance, setReviews]);

  const addReview = (review: Review) => {
    setReviews((prevReviews) => [review, ...prevReviews]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, fetchReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};
