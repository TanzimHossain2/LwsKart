"use server";
import { addProductData } from "@/backend/lib/product";
import { productSchema } from "@/schemas/product";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const adProduct = async (formData: FormData) => {
  const data = {
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: parseFloat(<string>formData.get("price")),
    stock: parseInt(<string>formData.get("stock")),
    discountPrice: parseFloat(<string>formData.get("discountPrice")),
    sku: formData.get("sku"),
    brand: formData.get("brand"),
    weight: parseFloat(<string>formData.get("weight")),
    isTrending: formData.get("isTrending") === "true",
    isNewArrival: formData.get("isNewArrival") === "true",
    tags: (<string>formData.get("tags")).split(","),
    images: Array.from(formData.getAll("images")),
  };

  const result = productSchema.safeParse(data);

  if (result.success) {
    revalidatePath("/");
    const res = await addProductData(result.data);
    if (res) {
      return {
        success: true,
        message: "Product added successfully",
        status: 201,
      };
    }
  } else {
    console.log(result.error.errors);

    return {
      error: result.error.errors,
    };
  }
};
