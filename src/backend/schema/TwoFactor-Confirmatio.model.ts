import { ITwoFactorToken } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const twoFactorConfirmationSchema = new mongoose.Schema<ITwoFactorToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const TwoFactorConfirmation: Model<any> =
  mongoose.models.TwoFactorConfirmation ||
  mongoose.model("TwoFactorConfirmation", twoFactorConfirmationSchema);

export default TwoFactorConfirmation;
