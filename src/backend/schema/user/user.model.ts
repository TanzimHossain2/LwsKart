import { IUser } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";
import TwoFactorConfirmation from "./TwoFactor-Confirmatio.model";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "/images/avatar.png",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isTwoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorAuth: {
    type: Schema.Types.ObjectId,
    ref: "TwoFactorConfirmation",
    default: null,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  // OAuth accounts
  isOAuth: {
    type: Boolean,
    default: false,
  },

  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
  ],
});

// Middleware to set username before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.username) {
    const count = await this.model("user").countDocuments();
    this.username = `lKR-${count + 1}-${this.email
      .split("@")[0]
      .replace(/[^\w\s]/gi, "")}`;
  }
  next();
});

// Middleware to handle cascading delete
userSchema.pre<IUser>("deleteOne", { document: true }, async function (next) {
  await TwoFactorConfirmation.deleteOne({ userId: this._id });
  next();
});

const userModel: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default userModel;
