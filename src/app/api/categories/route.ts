import { addCategoryData } from "@/backend/lib/category";
import { addCategory, getAllCategory } from "@/backend/services/category";
import { validateToken } from "@/utils/validateToken";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    const { isValid, token } = await validateToken(req);
    if (!isValid) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    const { name, description, image, icon } = data;

    const categoryData = {
      name,
      description,
      image,
      icon,
    };

    const result = await addCategoryData(categoryData as any);

    if (result.status !== 200) {
      return new NextResponse(result.error, {
        status: result.status,
        statusText: result.error,
      });
    }

    revalidatePath("/admin/add-product");

    return NextResponse.json(result);
  } catch (err) {
    return new NextResponse(err as BodyInit, {
      status: 500,
      statusText: err as string,
    });
  }
}

export async function GET(req: NextRequest) {
  const categories = await getAllCategory();

  return NextResponse.json(categories);
}
