import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    name: string
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        name: { type: String, trim: true },
    },
    {
        timestamps: true
    }
)

export const User = model<IUser>('User', userSchema)