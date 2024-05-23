import { IAddress } from "@/interfaces";
import mongoose, { Document, Model, Schema } from "mongoose";


const addressSchema = new mongoose.Schema<IAddress>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    postalCode: String,
    state: String,
    additionalInfo: String,
    
    deleveryAt: {
      type: String,
      enum: ["home", "office"],
      default: "home",
    },
  });
  
  const BillingAddressModel: Model<IAddress> =
    mongoose.models.billingAddress || mongoose.model<IAddress>("billingAddress", addressSchema);
  
  const ShippingAddressModel: Model<IAddress> =
    mongoose.models.shippingAddress || mongoose.model<IAddress>("shippingAddress", addressSchema);
  
  export { BillingAddressModel, ShippingAddressModel };