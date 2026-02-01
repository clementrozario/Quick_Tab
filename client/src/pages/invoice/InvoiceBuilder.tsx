import { PiInvoiceDuotone } from "react-icons/pi";
import { FiEye,FiDownload,FiPlus,FiX} from 'react-icons/fi'

export const InvoiceBuilder = () => {

    return (
        <div className="min-h-screen flex bg-gray-50">
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
                        <button className="text-sm font-normal text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
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

                    <div className="flex gap-3 items-center">
                        <div className=" text-gray-400">Including watermark *</div>
                        <button className="px-2 py-2 border rounded-lg text-sm border-gray-300 hover:bg-gray-100 transition hover:cursor-pointer">
                            Preview
                        </button>
                        <button className="px-2 py-2 border rounded-lg text-sm border-gray-300 hover:bg-gray-100 transition hover:cursor-pointer">
                            Download
                        </button>
                        <button className="px-2 py-2 border rounded-lg text-pretty bg-black text-white hover:bg-gray-800 hover:cursor-pointer">
                            Remove watermark
                        </button>
                    </div>
                </div>

                {/* Card */}
               
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

            </main>
            
       </div>
    )
}