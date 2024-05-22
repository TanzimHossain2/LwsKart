import mongoose, {  Document, ObjectId } from "mongoose";


// Interface for common fields shared by multiple schemas
interface ICommonFields extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  brand: string;
  weight?: number;
}


//Interface for Product Data
export interface IProductData extends ICommonFields {
  category: mongoose.Types.ObjectId | string;
  isTrending: boolean;
  isNewArrival: boolean;
  tags?: string[];
  images: string[];
  thumbnail?: string;
  discountPrice?: number;
  averageRating?: number;
  reviewCount?: number;
  reviewIds?: mongoose.Types.ObjectId[];
  variants?: mongoose.Types.ObjectId[];
  }

  // Interface for Review Data
  export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }


// Interface for Category
  export interface ICategory extends Document {
    name: string;
    image: string;
    icon: string;
    description?: string;
    parent?: mongoose.Types.ObjectId;
    children?: mongoose.Types.ObjectId[];
  }



// Interface for Variant
export interface IVariant extends ICommonFields {
  productId: mongoose.Types.ObjectId;  
  name: string;
  variantName: string;
  images: string[];
  attributes: Record<string, string>;
}


// Interface for Cart Item
export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

// Interface for Cart
export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
}


// Interface for Wishlist 
export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  productIds: mongoose.Types.ObjectId[];
}
