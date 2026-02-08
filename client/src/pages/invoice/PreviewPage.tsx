import { useEffect, useState } from "react"
import type { InvoiceDraft } from "../../store/useInvoiceStore"
import { InvoicePreview } from "../../components/InvoicePreview"

export const PreviewPage = () => {
    const [invoice, setInvoice] = useState<InvoiceDraft | null>(null)
    
    useEffect(() => {
        const invoiceData = sessionStorage.getItem('invoicePreview')
        if (invoiceData) {
            setInvoice(JSON.parse(invoiceData))
        }
    }, [])
    
    if (!invoice) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading preview...</p>
            </div>
        )
    }

    return <InvoicePreview invoice={invoice} />
}

