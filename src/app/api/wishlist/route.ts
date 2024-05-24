import { WishListData } from "@/backend/lib/wshlistCart";
import {
  addWishList,
  getWishList,
  removeWishList,
} from "@/backend/services/wishList";
import { currentUser } from "@/lib/authUser";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { productId } = await request.json();

  try {
    const user = await currentUser();
    const userId = user?.id ?? "664a217f2fbc316c7de071f3";

    const res = await addWishList(userId, productId);

    if (res?.status !== 200) {
      return new NextResponse(JSON.stringify({ error: res?.error }), {
        status: res?.status,
      });
    }

    if (res?.data) {
      const data = await WishListData(res.data);
      return Response.json(data);
    }
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  const user = await currentUser();
  const userId = user?.id ?? "664a217f2fbc316c7de071f3";

  try {
    const res = await getWishList(userId);

    if (res?.status === 404) {
      return new NextResponse(res?.error, {
        status: 404,
        statusText: res?.error,
      });
    }

    if (res?.status === 500) {
      return new NextResponse(res?.error, {
        status: 500,
        statusText: res?.error,
      });
    }

    if (res?.data) {
      const data = await WishListData(res?.data);
      return Response.json(data);
    }
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    });
  }
}

export async function DELETE(request: Request) {
  const { productId } = await request.json();

  try {
    const user = await currentUser();
    const userId = user?.id ?? "664a217f2fbc316c7de071f3";

    const res = await removeWishList(userId, productId);

    if (res?.status === 404) {
      return new NextResponse(res?.error, {
        status: 404,
        statusText: res?.error,
      });
    }

    if (res?.status === 500) {
      return new NextResponse(res?.error, {
        status: 500,
        statusText: res?.error,
      });
    }

    if (res?.data) {
      const data = await WishListData(res.data);
      return Response.json(data);
    }
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
