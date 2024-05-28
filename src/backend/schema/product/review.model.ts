import { IReview } from "@/interfaces/product";
import mongoose, { Model, Schema } from "mongoose";

// Review Schema
const ReviewSchema = new Schema<IReview>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Indexing for search
ReviewSchema.index({ product: 1 });
ReviewSchema.index({ user: 1 });

const ReviewModel: Model<IReview> =
  mongoose.models.review || mongoose.model<IReview>("review", ReviewSchema);

export default ReviewModel;
