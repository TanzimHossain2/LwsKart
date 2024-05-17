import { IUser } from '@/interfaces';
import mongoose, { Model, Schema } from 'mongoose';

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
    emailVerified: { 
        type: Boolean, 
        default: false 
    },
});


userSchema.pre<IUser>('save', async function (next) {
    if (!this.username) {
        const count = await this.model('users').countDocuments();
        this.username = `lKR-${count + 1}-${this.email.split('@')[0].replace(/[^\w\s]/gi, '')}`;
    }
    next();
});


const userModel: Model<IUser> = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

export default userModel;
