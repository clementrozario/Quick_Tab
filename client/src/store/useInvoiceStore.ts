import { create } from 'zustand'

export interface InvoiceItem {
    description: string
    quantity: number
    unitPrice: number
    lineTotal: number // quantity * unitprice           
}

export interface InvoiceDraft {
    clientName?: string
    clientEmail?: string
    
    invoiceNumber:string
    issueDate: string
    dueDate: string
    
    currency: string
    logoUrl?: string
    
    invoiceTitle: string
    fromAddress: string
    billToAddress: string
    
    items: InvoiceItem[]
    subtotal: number
    discountRate:number
    taxRate: number
    discountAmount: number
    taxAmount:number
    total: number

    accountName: string
    accountNumber: string
    routingNumber: string
    swiftCode: string
    
    notes?: string
}

interface InvoiceStore {
    currentInvoice: InvoiceDraft 
    setCurrentInvoice: (invoice: InvoiceDraft) => void
    resetInvoice: () => void
    addItem: () => void
    updateItem: (index: number, updatedItem: Partial<InvoiceItem>) => void
    removeItem: (index: number) => void
    updateGlobalField: (field:'discountRate' | 'taxRate' | keyof Omit<InvoiceDraft,'items' | 'subtotal' | 'discountAmount' | 'taxAmount' | 'total'>,value:any) => void
    recalculateTotals:() => void
}

const createEmptyInvoice = (): InvoiceDraft => {

    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(dueDate.getDate() + 30)
    
    return {
        clientName: '',
        clientEmail: '',
        invoiceNumber: 'INV-2026-002',
        issueDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        currency: '',
        logoUrl: '',

        invoiceTitle: '',
        
        fromAddress: `Acme Web Solutions, Inc.
        123 Innovation Drive
        Suite 400
        San Francisco, CA 94105
        United States`,    
        
        billToAddress: `TechStart Ventures LLC.
        456 Business Park Avenue
        Floor 8
        New York, NY 10013
        United States`,
        
        items: [
            {
                description: '',
                quantity: 1,
                unitPrice: 0,
                lineTotal: 0
            }
        ],
        subtotal: 0,
        discountRate: 0,
        taxRate: 0,
        discountAmount: 0,
        taxAmount: 0,
        total: 0,

        accountName: 'Acme Web Solutions, Inc.',
        accountNumber: '1234567890',
        routingNumber: '0931234219',
        swiftCode: 'CHASU753',

        notes: 'Thank you for your business. Payment is due within 30 days.',
    }
}


export const useInvoiceStore = create<InvoiceStore>((set,get) => ({
    currentInvoice: createEmptyInvoice(),
    
    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
    
    resetInvoice: () => set({ currentInvoice: createEmptyInvoice() }),

    addItem: () => {
        set((state) => ({
            currentInvoice: {
                ...state.currentInvoice,
                items: [...state.currentInvoice.items, { description: '', quantity: 1, unitPrice: 0, lineTotal: 0 }]
            }
        }))
        get().recalculateTotals()
    },

    updateItem: (index, updatedItem) => {
        set((state) => {
            const items = [...state.currentInvoice.items]
            items[index] = { ...items[index], ...updatedItem }
            return {
                currentInvoice: {
                    ...state.currentInvoice,
                    items
                }
            }
        })
            get().recalculateTotals()
    },

    removeItem: (index) => {
        set((state) => ({
            currentInvoice: {
                ...state.currentInvoice,
                items: state.currentInvoice.items.filter((_, i) => i !== index)
            }
        }))
            get().recalculateTotals()
    },

    updateGlobalField: (field, value) => {
        set((state) => {
            let sanitizedValue = value

            if (field === 'discountRate' || field === 'taxRate') {
                sanitizedValue = Math.max(0,Math.min(100,Number(value) || 0))
            }

            return {
                currentInvoice: { ...state.currentInvoice, [field]: sanitizedValue }
            }
        })
        if (field === 'discountRate' || field === 'taxRate') {
            get().recalculateTotals()
        }
            
    },

    recalculateTotals: () => set((state) => {
        const { items, discountRate, taxRate } = state.currentInvoice

        if (items.length === 0) {
            return {
                currentInvoice: {
                    ...state.currentInvoice,
                    items: [],
                    subtotal: 0,
                    discountAmount: 0,
                    taxAmount: 0,
                    total: 0
                }
            }
        }

        const updatedItems = items.map(item => ({
            ...item,
            lineTotal:Number((item.quantity * item.unitPrice).toFixed(2))
        }))
        
        const subtotal = Number(updatedItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2))
        
        const discountAmount = Number((subtotal * (discountRate / 100)).toFixed(2))
        const taxAmount = Number((subtotal * (taxRate / 100)).toFixed(2))
        const total = Number((subtotal - discountAmount + taxAmount).toFixed(2))

        return {
            currentInvoice: {
                ...state.currentInvoice,
                items:updatedItems,
                subtotal,
                discountAmount,
                taxAmount,
                total
            }
        }
    })
}))
   