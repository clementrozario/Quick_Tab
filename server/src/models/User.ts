import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    name: string,
    businessName: string,
    businessAddress: string,
    defaultCurrency: string,
    logoUrl:string
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        name: { type: String, trim: true },
        businessName: { type: String, trim: true },
        businessAddress: { type: String, trim: true },
        defaultCurrency:{type:String,default:'USD'},
        logoUrl:{type:String}
    },
    {
        timestamps: true
    }
)

export const User = model<IUser>('User', userSchema)