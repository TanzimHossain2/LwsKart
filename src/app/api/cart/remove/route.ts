import { removeToCart } from "@/backend/services/cart";
import { currentUser } from "@/lib/authUser";
import { modifyCartData } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const user = await currentUser();
  const { productId } = await request.json();
  const userId = user?.id || "";

  try {
    const res = await removeToCart(userId, productId);

    if (res.status === 404) {
      return new NextResponse(res.error, {
        status: 404,
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
