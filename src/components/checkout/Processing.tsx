"use client";
import { axiosInstance } from "@/config/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { set } from "mongoose";

type ProcessingProps = {
  orderId: string;
  method: "cash" | "card" | "paypal" | "crypto";
};

const Processing: React.FC<ProcessingProps> = ({ orderId, method }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.post("/api/process-payment", {
          orderId,
          paymentMethod: method,
        });

        if (res.status === 200) {
          router.push("/success");
        } else {
          console.log("error in response", res.data.error);
          setError(res.data.error);
        }
      } catch (err: any) {
        if (err.response && err.response.data) {
          setError(err.response.data || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [orderId, method, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => router.push("/")}
          >
            Go back to home
          </button>

        </div>
      )}
    </div>
  );
};

export default Processing;
