import { db } from "@/backend/schema";
import checkOrderStatus from "./checkOrderStatus";
import { handlePayment } from "./handlePayment";
import { currentUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

type PaymentInfo = "cash" | "card" | "paypal" | "crypto";

export const handlePaymentProcessing = async (
  orderId: string,
  paymentMethod: PaymentInfo
) => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    const paymentSuccess = await handlePayment(orderId, paymentMethod);

    if (!paymentSuccess) {
      throw new Error("Payment failed");
    }

    //handle still pending orders , when user close the browser, or network issue
    const orderStatus = await checkOrderStatus(orderId);

    if (!orderStatus) {
      return {
        error: "Unable to process the order",
        status: 404,
      };
    }

    // Remove items from the user's cart
    const cart = await db.cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Clear the cart
    cart.items = [];
    await cart.save();

    revalidatePath("/cart");

    return {
      data: "Payment processed successfully",
      status: 200,
    };
  } catch (err) {
    return {
      error: (err as Error).message,
      status: 400,
    };
  }
};
