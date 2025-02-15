import { updateCart } from "@/backend/services/cart";
import { modifyCartData } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { userId, productId, quantity } = await request.json();

  try {
    const res = await updateCart(userId, productId, quantity);

    if (res.status === 404) {
      return new NextResponse(res.error, {
        status: 404,
        statusText: res.error,
      });
    }

    if (res.status === 500) {
      return new NextResponse(res.error, {
        status: 500,
        statusText: res.error,
      });
    }

    if (res.status === 400) {
      return new NextResponse(res.error, {
        status: 400,
        statusText: res.error,
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
