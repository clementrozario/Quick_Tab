import { PiInvoiceDuotone } from "react-icons/pi";
import { FiEye, FiDownload, FiPlus, FiX } from 'react-icons/fi'
import { useInvoiceStore } from "../../store/useInvoiceStore"

export const InvoiceBuilder = () => {
    const { currentInvoice, addItem, updateItem, removeItem,updateGlobalField } = useInvoiceStore()


    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

                {/* logo */}
                <div className="h-16 flex items-center mx-3.5 justify-baseline gap-2">
                    <div className="bg-black p-1.5 rounded-lg">
                        <PiInvoiceDuotone className="text-white text-xl " />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">TinyTab</h2>
                </div>

                {/* nav */}
                <div className="border-b border-gray-200 mt-4">
                    <div className="flex px-4 pb-4 items-center justify-between gap-4">
                        <h3 className="font-bold text-base">Templates</h3>
                        <button className="text-sm font-normal text-gray-600 cursor-pointer hover:text-black hover:bg-gray-100 transition-colors">
                            Save Current
                        </button>
                    </div>
                </div>

                {/* templates dynamic */}
                <div className="flex-1 mt-6">
                    Templates added soon ...
                </div>

                {/* footer */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Logout
                    </button>
                </div>

            </aside>

            <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                {/* header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-bold text-3xl">
                        Invoice Generator
                    </h1>

                    <div className="flex flex-col items-baselinez gap-2">
                        <div className="flex gap-3 items-center">
                            <button className="flex items-center gap-2 px-2 py-2 border rounded-lg text-sm border-gray-300 hover:bg-gray-100 transition hover:cursor-pointer">
                                <FiEye />
                                Preview
                            </button>
                            <button className="flex items-center gap-2 px-2 py-2 border rounded-lg text-sm border-gray-300 hover:bg-gray-100 transition hover:cursor-pointer">
                                <FiDownload />
                                Download
                            </button>
                            <button className="px-2 py-2 border rounded-lg text-pretty bg-black text-white hover:bg-gray-800 hover:cursor-pointer">
                                Remove watermark
                            </button>
                        </div>
                    
                        <div className="text-sm text-gray-600">
                            Including watermark *
                        </div>
                    </div>
                </div>

                {/* Cards */}

                {/* Invoice details */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <h2 className="font-semibold text-lg mb-6">Invoice Details</h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Invoice Title
                            </label>
                            <input
                                type="text"
                                defaultValue="Invoice"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Invoice Title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Logo
                            </label>
                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:border-gray-400 transition">
                                Upload Logo
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Currency
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option> $ (USD) - US Dollar</option>
                                <option> $ (CAD) - Canadian Dollar</option>
                                <option> ₹ (USD) - US Dollar</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>English</option>
                                <option>French</option>
                                <option>Latin</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Custom Fields */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">

                    {/* 1st field */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-lg">Custom Fields</h2>
                        <button className="text-sm text-gray-600 cursor-pointer hover:text-black  flex items-center gap-1">
                            <FiPlus />Add Field
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Invoice Number"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field label"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Text</option>
                                    <option>Date</option>
                                </select>
                            </div>

                            <div className="col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="2026-01-01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* 2nd field */}
                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Issue Date"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field label"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Text</option>
                                    <option>Date</option>
                                </select>
                            </div>

                            <div className="col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="2026-01-01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* 3rd field */}
                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Due Date"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field label"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Text</option>
                                    <option>Date</option>
                                </select>
                            </div>

                            <div className="col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="2026-01-01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Addresses */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <h2 className="font-semibold text-lg mb-6">Addresses</h2>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
                            <label>
                                From
                            </label>
                            <textarea
                                defaultValue="**Acme Web Solutions, Inc.**&#10;123 Innovation Drive&#10;Suite 400&#10;San Francisco, CA 94105&#10;United States"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-30 text-sm"
                                placeholder="From Address"
                            />
                        </div>

                        <div>
                            <label htmlFor="">
                                Bill to
                            </label>
                            <textarea
                                defaultValue="**TechStart Ventures LLC**&#10;456 Business Park Avenue&#10;Floor 8&#10;New York, NY 10013&#10;United States"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-30 text-sm"
                                placeholder="Bill to Address"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="shipping" className="rounded" />
                        <label htmlFor="shipping" className="text-sm text-gray-600">
                            Include shipping Addresss
                        </label>
                    </div>
                </section>

                {/* Items */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-lg">Items</h2>
                        <button
                            onClick={addItem}
                            className="text-sm text-gray-600 cursor-pointer hover:text-black flex items-center gap-1">
                            <FiPlus />Add Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                            <div className="col-span-5">Description</div>
                            <div className="col-span-2">Qty</div>
                            <div className="col-span-2">Unit Price</div>
                            <div className="col-span-2">Total</div>
                            <div className="col-span-1"></div>
                        </div>

                        {currentInvoice.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-4 items-start">
                                {/* descrip */}
                                <div className="col-span-5">
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => updateItem(index, { description: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Item description"
                                    />
                                </div>
                                {/* qty */}
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        value={item.quantity === 0 ? "" : item.quantity}
                                        onChange={(e) => {
                                            const val = e.target.value
                                            if (val === "") {
                                                return updateItem(index, { quantity: 0 })
                                            }
                                            updateItem(index, { quantity: Number(val) })
                                        }}
                                        onBlur={() => {
                                            if (!item.quantity || item.quantity < 1) {
                                                updateItem(index, { quantity: 1 })
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* unitprice */}
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={item.unitPrice === 0 ? "" : item.unitPrice}
                                        onChange={(e) => {
                                            const val = e.target.value

                                            if (val === "") {
                                                return updateItem(index, { unitPrice: 0 })
                                            }
                                            updateItem(index, { unitPrice: Number(val) })
                                        }}
                                        onBlur={() => {
                                            if (item.unitPrice < 0 || !item.unitPrice) {
                                                updateItem(index, { unitPrice: 0 })
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                {/* total */}
                                <div className="col-span-2 flex items-center text-sm font-medium w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    ${(item.quantity * item.unitPrice)}
                                </div>
                                {/* Remove */}
                                <div className="col-span-1">
                                    <button
                                        onClick={() => removeItem(index)}
                                        disabled={currentInvoice.items.length === 1}
                                        className="text-gray-400 hover:text-red-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <FiX className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Totals */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <h2 className="font-semibold text-lg mb-6">Totals</h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Rate (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={currentInvoice.discountRate === 0 ? "" : currentInvoice.discountRate}
                                onChange={(e) => {
                                    const val = e.target.value
                                    if (val === "") {
                                        return updateGlobalField('discountRate',0)
                                    }
                                    const value = Number(val)
                                    updateGlobalField('discountRate',value)

                                    updateGlobalField('discountRate',value)
                                }}
                                onBlur={() => {
                                    if (currentInvoice.discountRate < 0 || !currentInvoice.discountRate) {
                                        updateGlobalField('discountRate',0)
                                    }
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={currentInvoice.taxRate === 0 ? "" :currentInvoice.taxRate}
                                onChange={(e) => {
                                    const val = e.target.value
                                    if (val === "") {
                                        return updateGlobalField('taxRate',0)
                                    }
                                    const value = Number(val)
                                    updateGlobalField('taxRate',value)
                                }}
                                onBlur={() => {
                                    if (currentInvoice.taxRate < 0 || !currentInvoice.taxRate) {
                                        updateGlobalField('taxRate',0)
                                    }
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="pt-2.5 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">${currentInvoice.subtotal.toFixed(2)}</span>
                        </div>

                        {currentInvoice.discountRate > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Discount({currentInvoice.discountRate}%)</span>
                                <span className="font-medium text-red-600">-${currentInvoice.discountAmount.toFixed(2)}</span>
                            </div>
                        )}

                        {currentInvoice.taxRate > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax ({currentInvoice.taxRate}%)</span>
                                <span className="font-medium text-green-600">+${ currentInvoice.taxAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>${ currentInvoice.total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                {/* bank info */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-lg">Bank Information</h2>
                        <button className="text-sm text-gray-600 hover:text-black flex items-center gap-1">
                            <FiPlus /> Add Bank Field
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Account Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field Label"
                                />
                            </div>

                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Web Solutions, Inc."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Value"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Account Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field Label"
                                />
                            </div>

                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Web Solutions, Inc."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Value"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Account Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field Label"
                                />
                            </div>

                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Web Solutions, Inc."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Value"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Account Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Field Label"
                                />
                            </div>

                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Web Solutions, Inc."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Value"
                                />
                            </div>

                            <div className="col-span-1 pt-8">
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                    </div>

                </section>

                {/* notes */}
                <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                    <h2 className="font-semibold text-lg mb-6">Notes</h2>
                    <textarea
                        defaultValue="Thank you for your business. Payment is due within 30 days."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-30"
                        placeholder="Additional notes or payment terms..."
                    />
                </section>

            </main>

        </div>
    )
}