import { ICart, ICartItem } from "@/interfaces/product";
import mongoose, { Model, Schema } from "mongoose";

const CartItemSchema = new Schema<ICartItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  weight: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

// Indexing for search
CartSchema.index({ userId: 1 });

const CartModel: Model<ICart> =
  mongoose.models.cart || mongoose.model("cart", CartSchema);

export default CartModel;
