import { addCategory, getAllCategory } from "@/backend/services/category";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { name , description } = data;

  const categoryData = {
    name,
    description,
  };

  const result = await addCategory(categoryData as any);

  return new Response("POST request received");
}

export async function GET(req: NextRequest) {
  const categories = await getAllCategory();

  return NextResponse.json(categories);
}
