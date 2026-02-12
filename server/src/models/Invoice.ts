import { Schema, model, Document, Types } from 'mongoose'

export interface IInvoice extends Document {
    userId: Types.ObjectId
    title: string
    invoiceNumber: string
    issueDate: Date
    dueDate: Date
    currency: string
    logoUrl?: string
    fromAddress: string
    billToAddress: string
    shippingAddress?: string
    items: {
        description: string
        quantity: number
        unitPrice: number
        lineTotal: number
    }[]
    subtotal: number
    discountRate: number
    discountAmount: number
    taxRate: number
    taxAmount: number
    total: number
    customFields: {
        label: string
        type: 'text' | 'date'
        value: string
    }[]
    bankInfo: {
        label: string
        value: string
    }[]
    notes?: string
    createdAt: Date
    updatedAt: Date
}

const invoiceSchema = new Schema<IInvoice>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'Invoice' },
    invoiceNumber: { type: String, required: true },
    issueDate: { type: Date },
    dueDate: { type: Date },
    currency: { type: String, default: 'USD' },
    logoUrl: String,
    fromAddress: { type: String, required: true },
    billToAddress: { type: String, required: true },
    shippingAddress: String,
    items: [{
        description: String,
        quantity: Number,
        unitPrice: Number,
        lineTotal: Number
    }],
    subtotal: Number,
    discountRate: Number,
    discountAmount: Number,
    taxRate: Number,
    taxAmount: Number,
    total: Number,
    customFields: [{
        label: String,
        type: { type: String, enum: ['text', 'date'] },
        value: String
    }],
    bankInfo: [{
        label: String,
        value: String
    }],
    notes: String
}, { timestamps: true })

export const Invoice = model<IInvoice>('Invoice', invoiceSchema)