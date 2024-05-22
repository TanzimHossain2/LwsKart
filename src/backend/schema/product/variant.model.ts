import { IVariant } from "@/interfaces/product";
import mongoose, { Model, Schema, ObjectId } from "mongoose";

const VariantSchema = new Schema<IVariant>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  variantName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  attributes: { type: Map, of: String },
  images: { type: [String], required: true },
});

// Indexing for search
VariantSchema.index({ productId: 1 });
VariantSchema.index({ sku: 1 }, { unique: true });

const VariantModel: Model<IVariant> =
  mongoose.models.variant || mongoose.model<IVariant>("variant", VariantSchema);

export default VariantModel;
