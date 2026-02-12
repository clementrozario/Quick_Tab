import express from 'express'
import {
    createInvoice,
    getUserInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} from '../controllers/invoice.controller'
import { verifyToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', verifyToken, createInvoice);
router.get('/', verifyToken, getUserInvoices);
router.get('/:id', verifyToken, getInvoiceById);
router.put('/:id', verifyToken, updateInvoice);
router.delete('/:id', verifyToken, deleteInvoice);

export default router