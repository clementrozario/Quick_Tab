import type { InvoiceDraft } from '../store/useInvoiceStore'

interface InvoicePreviewProps {
    invoice: InvoiceDraft
}

export const InvoicePreview = ({invoice}:InvoicePreviewProps) => {
    
    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className='bg-white w-full max-w-[210mm] min-h-[297mm] mx-auto shadow-2xl'>
                <div className='p-8'>
                    <h3 className='text-2xl font-bold'>Invoice Preview</h3>
                    <p className='text-gray-600 mt-2'>Preview content coming soon...</p>
                </div>
            </div>
        </div>
    )
}