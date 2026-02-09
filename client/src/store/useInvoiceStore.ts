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

const createEmptyInvoice = (): InvoiceDraft => ({
    clientName: '',
    clientEmail: '',
    invoiceNumber:'',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate:new Date().toISOString().split('T')[0],
    currency: 'USD',
    logoUrl: '',

    invoiceTitle: '',
    fromAddress: '',
    billToAddress: '',
    notes: '',
    
    items: [
        {
            description: '',
            quantity: 1,
            unitPrice: 0,
            lineTotal:0
        }
    ],
    subtotal: 0,
    discountRate: 0,
    taxRate: 0,
    discountAmount: 0,
    taxAmount:0,
    total: 0,
})


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
            get().recalculateTotals()
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
   