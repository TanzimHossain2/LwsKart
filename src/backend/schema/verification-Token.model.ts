import { IVerificationToken } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: Date,
    required: true,
  },

});

const verificationTokenModel: Model<IVerificationToken> = mongoose.models.verificationToken || mongoose.model<IVerificationToken>('verificationToken', verificationTokenSchema);


export default verificationTokenModel;