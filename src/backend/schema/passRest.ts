import { IPasswordReset } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";


const PasswordResetSchema = new mongoose.Schema <IPasswordReset>  ({
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
})

const PasswordResetToken : Model<IPasswordReset> = mongoose.models.passwordReset || mongoose.model<IPasswordReset>('passwordReset', PasswordResetSchema);

export default PasswordResetToken;

