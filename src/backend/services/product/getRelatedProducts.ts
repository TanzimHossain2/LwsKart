import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { modifyArrayData } from "@/utils/data";
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const getRelatedProducts = async (productId: string) => {
  try {
    await dbConnect();

     // Convert productId to ObjectId
     const productObjectId = new ObjectId(productId);

    // Find the original product
    const product = await db.product.findById(productObjectId).exec();

    if (!product) {
      return [];
    }

    // Define criteria for related products excluding text search
    const basicCriteria = {
        $or: [
          { category: product.category },
          { tags: { $in: product.tags } },
          { brand: product.brand },
        ],
        _id: { $ne: product._id } // Exclude the original product
      };
  
      // Perform the main query
      const basicRelatedProducts = await db.product.find(basicCriteria).limit(10).lean().exec();
  
      // Perform a separate text search query
      const textRelatedProducts = await db.product.find({
        $text: { $search: product.name },
        _id: { $ne: product._id }
      }).limit(10).lean().exec();
  
      // Merge and deduplicate results
      const relatedProducts = [...basicRelatedProducts, ...textRelatedProducts]
      .filter((value, index, self) =>
        index === self.findIndex((t) => t._id.toString() === value._id.toString())
      )
      .slice(0, 10);
  
        
      return modifyArrayData(relatedProducts)

  } catch (err) {
    console.error(err);
    return [];
  }
};
