import type { InvoiceDraft } from '../store/useInvoiceStore'

interface InvoicePreviewProps {
    invoice: InvoiceDraft
}

export const InvoicePreview = ({invoice}:InvoicePreviewProps) => {
    
    return (
        <div className='min-h-screen bg-gray-100 py-8 px-4'>

            <div
                className='bg-white mx-auto shadow-2xl'
                style={{
                    width: '210mm',
                    height: '297mm',
                    maxWidth: '100%',
                    padding: '1.5cm 1.2cm',
                    fontFamily: 'Arial,sans-serif',
                    fontSize: '12pt',
                    lineHeight:'1.5'
                    
                }}
            >
                
                {/* Header section */}
                <div className='flex justify-between items-start mb-8'>
                    {/* logo */}
                    <div className='shrink-0'>
                        {invoice.logoUrl ? (
                            <img
                                src={invoice.logoUrl}
                                alt="Company logo"
                                className='h-16 w-auto object-contain'
                            />
                        ) : (
                            <div className='h-16 w-32 bg-gray-200 flex items-center justify-center text-gray-400 text-xs '>
                                No Logo
                            </div>
                        )}
                        
                    </div>

                    {/* Invoice & title */}

                    <div className='text-right'>
                        <h1 className='text-4xl font-bold mb-4'>
                            {invoice.invoiceTitle.toUpperCase() || 'INVOICE'}
                        </h1>
                        <div className='text-sm space-y-1'>
                            <span className='font-semibold'>Invoice Number:</span>{invoice.invoiceNumber}
                        </div>
                        <div>
                            <span className='font-semibold'>Issue Date:</span>{invoice.issueDate}
                        </div>
                        <div>
                            <span className='font-semibold'>Due Date:</span>{invoice.dueDate}
                        </div>
                    </div>
                </div>            
            
                        {/* {address} from & to*/}
                
            </div>
        </div>
        
    )
}