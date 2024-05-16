import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  image: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  emailVerified: boolean;
  role: string;
}
