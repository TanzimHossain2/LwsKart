import { IWishlist } from "@/interfaces/product";
import mongoose, { Model, Schema } from 'mongoose';

const WishlistSchema = new Schema<IWishlist>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
  }, { timestamps: true });

  WishlistSchema.index({ userId: 1 });

const WishlistModel: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);

export default WishlistModel;