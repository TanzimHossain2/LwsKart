import { addToCart } from "@/backend/services/cart";
import { modifyCartData } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, productId, quantity } = await request.json();

  try {
    const res = await addToCart(userId, productId, quantity);

    if (res.status === 404) {
      return new NextResponse(res.error, {
        status: 404,
        statusText: "Not found",
      });
    }

    if (res.status === 500) {
      return new NextResponse(res.error, {
        status: 500,
        statusText: "Internal server error",
      });
    }
    
    const resData = modifyCartData(res?.data?.items || []);
    return Response.json(resData);

  } catch (err) {
    return new NextResponse("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
