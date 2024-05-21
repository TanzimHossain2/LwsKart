import { IProductData } from "@/interfaces/product";
import mongoose, { Model, Schema } from 'mongoose';


const ProductSchema = new Schema<IProductData>({
  name: { type: String, required: true, index: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, required: true },
  isTrending: { type: Boolean, default: false, index: true },
  isNewArrival: { type: Boolean, default: false, index: true },
  tags: { type: [String] },
  images: { type: [String], required: true },
  sku: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  weight: { type: Number },
  averageRating: { type: Number, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  reviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'variant' }] 
});

// Create indexes for frequently queried fields
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ isTrending: 1 });
ProductSchema.index({ isNewArrival: 1 });
ProductSchema.index({ sku: 1 }, { unique: true });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });


//Todo add pre save hook for slug generation

//Todo add pre remove hook for removing reviews and variants when product is deleted



const ProductModel : Model<IProductData> =
  mongoose.models.product || mongoose.model<IProductData>("product", ProductSchema);

export default ProductModel;
