import { ITwoFactorToken } from "@/interfaces";
import mongoose, { Model } from "mongoose";

const twoFactorTokenSchema = new mongoose.Schema<ITwoFactorToken>({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const TwoFactorTokenModel: Model<ITwoFactorToken> =
  mongoose.models.twoFactorToken ||
  mongoose.model<ITwoFactorToken>("twoFactorToken", twoFactorTokenSchema);

export default TwoFactorTokenModel;
