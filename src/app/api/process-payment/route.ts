import { handlePaymentProcessing } from "@/backend/lib/transaction";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
       const { orderId, paymentMethod } = await request.json();

    if (!orderId || !paymentMethod) {
        throw new Error("Invalid data");
    }

    const res = await handlePaymentProcessing(orderId, paymentMethod);

    if (res.status === 200) {
        return  Response.json(res)
    }

    if (res.status === 404) {
        return new NextResponse(res?.error, {
            status: 404,
            statusText: res?.error,
          });
    }

    if (res.status === 400) {
        return new NextResponse(res?.error, {
            status: 400,
            statusText: res?.error,
          });
    }

   } catch (err) {
    console.log("Error in payment-processing route", err );
    
    return new NextResponse("Internal server error", {
        status: 500,
        statusText: "Internal server error",
      });
   }

   
}