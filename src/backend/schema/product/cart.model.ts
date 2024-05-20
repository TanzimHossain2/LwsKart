import { ICart, ICartItem } from "@/interfaces/product";
import mongoose, { Model, Schema } from 'mongoose';

const CartItemSchema = new Schema<ICartItem>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, min: 1 }
  });
  
  const CartSchema = new Schema<ICart>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    items: [CartItemSchema]
  }, { timestamps: true });

// Indexing for search
  CartSchema.index({ userId: 1 });

const CartModel: Model<ICart> = mongoose.models.Cart || mongoose.model('Cart', CartSchema);


export default CartModel;