import { ICategory } from "@/interfaces/product";
import mongoose, { Model, Schema } from "mongoose";

// Category Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, default: "/vercel.svg"},
    icon: { type: String, default: "/next.svg" },
  },
  { timestamps: true }
);

// Indexing for search
CategorySchema.index({ name: 1 });

const CategoryModel: Model<ICategory> =
  mongoose.models.category ||
  mongoose.model<ICategory>("category", CategorySchema);

export default CategoryModel;
