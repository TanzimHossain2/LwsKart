import { IAccount } from '@/interfaces';
import mongoose, { Model, Schema } from 'mongoose';

const accountSchema = new mongoose.Schema<IAccount>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    providerAccountId: {
        type: String,
        required: true,
    },
    refresh_Token: {
        type: String,
    },
    access_Token: {
        type: String,
    },
    expires_at: {
        type: Number,
    },
    token_type: {
        type: String,
    },
    scope: {
        type: String,
    },
    id_Token: {
        type: String,
    },
    sessionState: {
        type: String,
    },
});

const accountModel: Model<IAccount> = mongoose.models.accounts || mongoose.model<IAccount>('accounts', accountSchema);

export default accountModel;
