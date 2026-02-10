import { useEffect, useState } from 'react'
import { InvoicePreview } from '../../components/InvoicePreview'
import type { InvoiceDraft } from '../../store/useInvoiceStore'

export const InvoicePreviewPage = () => {
    const [invoice, setInvoice] = useState<InvoiceDraft | null>(null)

    useEffect(() => {
        const storedInvoice = sessionStorage.getItem('invoicePreview')

        if (storedInvoice) {
            setInvoice(JSON.parse(storedInvoice))
        }
    }, [])

    if (!invoice) {
        return <div className="p-10 text-gray-500">Loading preview...</div>
    }

    return <InvoicePreview invoice={invoice} />
}
