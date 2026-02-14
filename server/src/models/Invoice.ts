import { Schema, model, Document, Types } from 'mongoose'

export interface IInvoice extends Document {
    userId: Types.ObjectId

    invoiceTitle: string
    currency: string
    logoUrl?: string

    fromAddress: string
    billToAddress: string   
    
    customFields: {
        label: string
        type: 'text' | 'date'
        value: string
    }[]

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

    accountName: string
    accountNumber: string
    routingNumber: string
    swiftCode: string

    notes?: string

    createdAt: Date 
    updatedAt: Date
}

const invoiceSchema = new Schema<IInvoice>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceTitle: { type: String, default: 'Invoice' },
    currency: { type: String, default: '$' },
    logoUrl: { type: String },
    fromAddress: { type: String, required: true },
    billToAddress: { type: String, required: true },
    customFields: [{
        label: String,
        type: { type: String, enum: ['text', 'date'] },
        value: String
    }],
    items: [{
        description: String,
        quantity: Number,
        unitPrice: Number,
        lineTotal: Number
    }],
    subtotal: { type: Number, default: 0 },
    discountRate: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    accountName: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    routingNumber: { type: String, default: '' },
    swiftCode: { type: String, default: '' },
    notes: { type: String }
}, { timestamps: true })

export const Invoice = model<IInvoice>('Invoice', invoiceSchema)