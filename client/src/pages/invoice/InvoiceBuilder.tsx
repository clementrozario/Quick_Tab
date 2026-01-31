import { PiInvoiceDuotone } from "react-icons/pi";

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
                    <div className="flex px-4 pb-4 items-center justify-baseline gap-9">
                        <h3 className="font-bold text-lg">Templates</h3>
                        <button className="text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
                            Save Current
                        </button>
                    </div>
                </div>

                {/* template dynamic cards */}
                <div className="flex-1 mt-6">
                    Templates added soon ...
                </div>

                {/* footer */}
                <div className="p-4 border-t border-gray-200">
                    <button className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Logout
                    </button>
                </div>

            </aside>

            <main className="flex-1">

            </main>
            
       </div>
    )
}