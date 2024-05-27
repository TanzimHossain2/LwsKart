import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { IProductData } from "@/interfaces/product";
import { modifyArrayData, modifyObjData } from "@/utils/data";

type QueryParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  ratings?: string;
  sort?: string;
  size?: string;
};

export const getAllProduct = async ({
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  ratings = "",
  sort = "",
  size = "",
}: QueryParams): Promise<IProductData[] | null> => {
  try {
    await dbConnect();

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      const categoryArray = decodeURIComponent(category).split("|");
      query.category = categoryArray;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    if (ratings) {
      const ratingsArray = decodeURIComponent(ratings).split("|").map(Number);
      query.averageRating = { $in: ratingsArray };
    }

    if (size) {
      query.size = { $regex: size, $options: "i" };
    }

    let sortQuery: any = {};
    if (sort) {
      if (sort === "newest") {
        sortQuery = { createdAt: -1 };
      } else {
        const [field, order] = sort.split("-");
        sortQuery[field] = order === "desc" ? -1 : 1;
      }
    }

    // Execute the query
    const products = await db.product.find(query)
    .select("name price discountPrice reviewCount images averageRating category")
    .sort(sortQuery).lean();

    return modifyArrayData(products) || null;
  } catch (err) {
    return null;
  }
};
