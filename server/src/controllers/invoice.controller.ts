import { Request, Response } from "express"
import { Invoice } from "../models/Invoice"

interface AuthRequest extends Request{
    userId?:string
}

export const createInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'user not found' })
        }
        
        const {
            title,
            invoiceNumber,
            dates,
            currency,
            logoUrl,
            fromAddress,
            billToAddress,
            items,
            totals,
            customFields,
            bankInfo,
            notes
        } = req.body;

        const newInvoice = new Invoice({
            userId,
            title,
            invoiceNumber,
            dates,
            currency,
            logoUrl,
            fromAddress,
            billToAddress, 
            items,
            totals,
            customFields,
            bankInfo,
            notes
        })

        const savedInvoice = await newInvoice.save()

        res.status(201).json(savedInvoice)

    } catch (error) {
        console.error('create Invoice error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUserInvoices = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: 'user not authenticated' })
        }

        const invoices = await Invoice.find({ userId })
            .sort({ createdAt: -1 })
            .lean()

        return res.status(200).json(invoices);

    } catch (error) {
        console.error('failed to get all invoice', error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getInvoiceById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ message: 'user not authenticated' })
        }

        const invoice = await Invoice.findOne({
            _id: id,
            userId:userId
        });

        if (!invoice) {
            return res.status(404).json({ message: 'invoice not found' })
        }

        return res.status(200).json(invoice);
    } catch (error) {
        console.error('Failed to get invoice', error);
        res.status(500).json({message:'Internal server error'})
    }
}

export const updateInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({message:'user not authenticated'})
        }

        const updateInvoice = await Invoice.findOneAndUpdate(
            { _id: id, userId: userId },
            { $set: req.body },
            {new:true}           
        )

        if (!updateInvoice) {
            return res.status(404).json({message:'invoice not found'})
        }

        return res.status(200).json(updateInvoice)
    } catch (error) {
        console.error('Failed to update invoice', error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId
        const { id } = req.params
        
        if (!userId) {
            return res.status(401).json({ message: 'user not authenticated' });
        }

        const deleteInvoice = await Invoice.findOneAndDelete(
            { _id: id, userId: userId },
        )

        if (!deleteInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Failed to delete Invoice', error);
        return res.status(500).json({message:'Internal Server error'})
    }
}