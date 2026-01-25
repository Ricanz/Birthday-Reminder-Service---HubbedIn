import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, index: true },
        birthday: { type: Date, required: true },
        timezone: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_: any, ret: any) => {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export const UserModel = mongoose.model('User', UserSchema);