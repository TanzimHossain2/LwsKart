import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  user: {
    name: string;
    id : string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    deliveryAt: string;
  };
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId;
      name: string;
      price: number;
      quantity: number;
      weight: number;
    }
  ];
  totalPrice: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "cancelled" | "failed";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId :{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  user: {
    name: { type: String, required: true },
    id: { type: String , required: true},
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    deliveryAt: { type: String, enum: ["home", "office"], required: true },
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      weight: { type: Number, required: true },
    }
  ],

  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled","failed"],
    default: "pending",
  },
  
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const OrderModel: Model<IOrder> = mongoose.models.order || mongoose.model<IOrder>("order", orderSchema);

export default OrderModel;
