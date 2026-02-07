import { FiX } from "react-icons/fi";
import type { InvoiceDraft } from '../store/useInvoiceStore'

interface InvoicePreviewProps {
    invoice: InvoiceDraft
    isOpen: boolean
    onClose:() => void
}

export const InvoicePreview = ({invoice,isOpen,onClose}:InvoicePreviewProps) => {
    if (!isOpen) return null

    return (
        <div>
            <div>
                <button
                    onClick={onClose}
                    className=""
                >
                    <FiX />
                </button>

                <div>
                    <h3>Invoice Preview</h3>
                    <p>content coming next...</p>
                </div>
            </div>
        </div>
    )
}