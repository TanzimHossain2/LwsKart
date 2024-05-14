import { IUser } from '@/interfaces/User';
import mongoose, { Model, Schema } from 'mongoose';

const userSchema = new mongoose.Schema<IUser>({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        default: function() {
          const emailParts = this.email.split('@');
          return emailParts[0]; 
        }
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
    },
    image: { 
        type: String,
        default: "/images/avatar.png"
    },
    
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    accessToken: { 
        type: String 
    },
    refreshToken: { 
        type: String 
    },
}, { timestamps: true });


const userModel: Model<IUser> = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

export default userModel;
