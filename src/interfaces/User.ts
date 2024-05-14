import { Document } from 'mongoose';



export interface IUser extends Document {
  username: string;
  email: string;
  image?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  isVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
