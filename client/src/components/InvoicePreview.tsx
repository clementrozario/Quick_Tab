import type { InvoiceDraft } from '../store/useInvoiceStore'

interface InvoicePreviewProps {
    invoice: InvoiceDraft
}

export const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {

    const {subtotal,discountRate,discountAmount,taxRate,taxAmount,total} = invoice
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'numeric',
            day:'numeric'
        })
    }
    
    return (
        <div className='min-h-screen bg-gray-100 py-8 px-4'>

            <div
                className='bg-white mx-auto shadow-2xl flex flex-col'
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
            <div className='flex flex-1 flex-col'>
                
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

                    <div className='text-right min-w-65'>
                        <h1 className='text-4xl font-bold mb-6'>
                            {(invoice.invoiceTitle || 'INVOICE').toUpperCase()}
                        </h1>

                        <div className='grid grid-cols-[140px_1fr] gap-y-1 text-sm'>
                            <span className='font-semibold text-gray-700'>Invoice Number: </span>
                            <span className='text-right'>{invoice.invoiceNumber}</span>
                            
                            <span className='font-semibold text-gray-700'>Issue Date: </span>
                            <span className='text-right'>{formatDate(invoice.issueDate)}</span>
                            
                            <span className='font-semibold text-gray-700'>Due Date: </span>
                            <span className='text-right'>{formatDate(invoice.dueDate)}</span>
                        </div>
                    </div>
                </div>            
            
                {/* {address} from & to*/}
                
                <div className='grid grid-cols-2 gap-8 mb-8'>
                    <div>
                        <h3 className='font-semibold mb-2 text-sm'>From</h3>
                        <div className='text-sm whitespace-pre-line'>
                            {invoice.fromAddress}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-semibold mb-2 text-sm'>Bill To</h3>
                        <div className='text-sm whitespace-pre-line'>
                            {invoice.billToAddress}
                        </div>
                    </div>
                </div>

                {/* table */}

                <div>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='border-b border-gray-300'>
                                <th className='text-left py-2 text-sm font-semibold text-gray-600'>
                                    Items
                                </th>
                                <th className='text-right py-2 text-sm font-semibold text-gray-600'>
                                    Quantity
                                </th>
                                <th className='text-right py-2 text-sm font-semibold text-gray-600'>
                                    Price
                                </th>
                                <th className='text-right py-2 text-sm font-semibold text-gray-600'>
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoice.items.map((item, index) => (
                                <tr
                                    key={index}
                                    className='border-b border-gray-200 last:border-b-0'
                                >
                                    
                                    <td className='py-3 text-sm'>
                                        {item.description || '-'}
                                    </td>

                                    <td className='py-3 text-sm text-right'>
                                        {item.quantity}
                                    </td>

                                    <td className='py-3 text-sm text-right'>
                                        { invoice.currency} {item.unitPrice}
                                    </td>

                                    <td className='py-3 text-sm text-right'>
                                        { invoice.currency} {item.lineTotal}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* totals */}
                <div className='mt-8 flex justify-end'>
                    <div className='w-72 space-y-2 text-sm'>

                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Subtotal</span>
                            <span>{invoice.currency}{subtotal}</span>
                        </div>

                        {discountRate > 0 && discountAmount > 0 && (
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>
                                    Discount ({discountRate}%)
                                </span>
                                <span className='text-red-600'>
                                    - {invoice.currency} {discountAmount}
                                </span>
                            </div>
                        )}

                        {taxRate > 0 && taxAmount > 0 && (
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>
                                    Tax ({taxRate}%)
                                </span>
                                <span className='text-green-600'>
                                    + {invoice.currency} {taxAmount}
                                </span>
                            </div>
                        )}

                        <div className='border-t pt-2 mt-2 flex justify-between font-semibold'>
                            <span>Total</span>
                            <span>
                                {invoice.currency} {total}
                            </span>
                        </div>
                    </div>
                    </div>
                    
            </div>

                {/* footer */}
                <div className='mt-auto'>
                  <div className='mt-16 pt-6 border-t border-gray-300 grid grid-cols-2 gap-8 text-sm'>
                    <div>
                        <h4 className='font-semibold mb-2'>Payment Details</h4>
                        <div className='space-y-1 text-gray-700'>
                            <div>
                                <span className='font-medium'>Account Name:</span>{' '}
                                {invoice.accountName}
                            </div>

                            <div>
                                <span className='font-medium'>Account Number:</span>{' '}
                                {invoice.accountNumber}
                            </div>
                            <div>
                                <span className='font-medium'>Routing Number:</span>{' '}
                                {invoice.routingNumber}
                            </div>
                            <div>
                                <span className='font-medium'>SWIFT/BTC:</span>{' '}
                                {invoice.swiftCode}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className='font-semibold mb-2'>Notes</h4>
                        <div className=''>
                            {invoice.notes}
                        </div>
                    </div>

                    <div className="mt-8 text-xs text-gray-400 text-right">
                        Page 1 / 1
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
         
    )
}