import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  number: string;
  image: string;
  password: string;
  emailVerified: boolean;
  isTwoFactorEnabled: boolean;
  role: string;
  twoFactorAuth: ObjectId;
  accounts: ObjectId[];
  isOAuth: boolean;
}

export interface IAccount extends Document {
  userId: ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_Token?: string;
  access_Token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_Token?: string;
  sessionState?: string;
}

interface IBaseToken extends Document {
  _id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface IVerificationToken extends IBaseToken {}
export interface IPasswordReset extends IBaseToken {}

export interface ITwoFactorToken extends IBaseToken {
  userId: ObjectId;
}
