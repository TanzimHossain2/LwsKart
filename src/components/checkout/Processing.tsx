"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import useAxios from "@/hooks/use-axios";

type ProcessingProps = {
  orderId: string;
  method: "cash" | "card" | "paypal" | "crypto";
};

const Processing: React.FC<ProcessingProps> = ({ orderId, method }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { axiosInstance } = useAxios();

  useEffect(() => {
    const processPayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.post("/api/process-payment", {
          orderId,
          paymentMethod: method,
        });

        console.log(res);

        if (res.status === 200) {
          toast.success("Success! Sent a Invoice to your email.", {
            position: "bottom-right",
            autoClose: 1200,
          });

          // redirect afer 2 seconds
          setTimeout(() => {
            router.push("/orders");
          }, 1500);
        } else {
          console.log("error in response", res.data.error);
          setError(res.data.error);
        }
      } catch (err: any) {
        console.log("Error in processing component", err);

        if (err.response && err.response.data) {
          setError(err.response.data || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [orderId, method, router, axiosInstance]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && !error && (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => router.push("/orders")}
          >
            Go to Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default Processing;
