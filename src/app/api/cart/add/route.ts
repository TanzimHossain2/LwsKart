import { addToCart } from "@/backend/services/cart";
import { modifyCartData } from "@/utils/data";
import { validateToken } from "@/utils/validateToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  // const { isValid, token } = await validateToken(request);
  // if (!isValid) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }


  const { userId, productId, quantity } = await request.json();


  try {
    const res = await addToCart(userId, productId, quantity);

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
    
    const resData = modifyCartData(res?.data?.items || []);
    return Response.json(resData);

  } catch (err) {
    console.log("Error in add to cart route", err);
    
    return new NextResponse("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
