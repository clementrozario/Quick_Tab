import { create } from 'zustand'

export interface InvoiceItem {
    description: string
    quantity: number
    unitPrice: number
    taxPercentage?: number      
    discountPercentage?: number 
    lineTotal: number           
}

export interface InvoiceDraft {
    clientName?: string
    clientEmail?: string
    invoiceDate: string
    currency: string
    items: InvoiceItem[]
    subtotal: number
    taxAmount: number
    discountAmount: number
    total: number
    notes?: string
}

interface InvoiceStore {
    currentInvoice: InvoiceDraft 
    setCurrentInvoice: (invoice: InvoiceDraft) => void
    resetInvoice: () => void
    addItem: (item: Omit<InvoiceItem, 'lineTotal'>) => void
    updateItem: (index: number, updatedItem: Partial<InvoiceItem>) => void
    removeItem: (index: number) => void
    updateInvoiceField: (field: keyof InvoiceDraft, value: any) => void
}

const createEmptyInvoice = (): InvoiceDraft => ({
    clientName: '',
    clientEmail: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    currency: 'USD',
    items: [],
    subtotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0,
    notes:''
})


export const useInvoiceStore = create<InvoiceStore>((set) => ({
    currentInvoice: createEmptyInvoice(),
    
    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
    
    resetInvoice: () => set({ currentInvoice: createEmptyInvoice() }),

    addItem: (item) => set((state) => {
        if (!state.currentInvoice) return state
        const lineTotal = item.quantity * item.unitPrice
        const newItem = { ...item, lineTotal }
        return {
            currentInvoice: {
                ...state.currentInvoice,
                items:[...state.currentInvoice.items,newItem]
            }
        }
    }),

    updateItem: (index, updatedItem) => set((state) => {
        if (!state.currentInvoice) return state
        const items = [...state.currentInvoice.items]
        items[index] = { ...items[index], ...updatedItem }
        return {
            currentInvoice: {
                ...state.currentInvoice,
                items
            }
        }
    }),
    removeItem: (index) => set((state) => {
        if (!state.currentInvoice) return state
        const items = state.currentInvoice.items.filter((_, i) => i !== index)
        return {
            currentInvoice: {
                ...state.currentInvoice,
                items
            }
        }
    }),
    updateInvoiceField: (field, value) => set((state) => {
        if (!state.currentInvoice) return state
        return {
            currentInvoice: {
                ...state.currentInvoice,
                [field]:value
            }
        }
    })
    
    

}))