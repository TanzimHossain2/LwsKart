import mongoose, { Model, Schema } from "mongoose";

export interface IVerificationToken extends Document {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
  email: {
    type: String,
    required: true,
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