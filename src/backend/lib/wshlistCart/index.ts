import { getWishListProductById } from "@/backend/services/wishList/getWishListProduct";
import { ObjectId } from "mongodb";

export const WishListData = async (data: { productIds: ObjectId[] }) => {
    try {
      const productDetails = await Promise.all(
        data.productIds.map(async (id) => {
          const res = await getWishListProductById(id);

          const resData = {
            id: (res?.data?._id as unknown as string).toString(),
            name: res?.data?.name,
            price: res?.data?.price,
            image: res?.data?.images[0],
            stock: res?.data?.stock,
          };

          return resData
        })
      );
      return productDetails;
    } catch (err) {
      console.log("Error in wishlist data inside lib", err);
      return [];
    }
  };
