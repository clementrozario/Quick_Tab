import { IoSettingsOutline } from "react-icons/io5";

export const Settings = () => {
    return (
        <div className="min-h-screen flex items-baseline justify-center pt-12 bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-112.5">
                <div className="flex items-center justify-center gap-2">
                    <IoSettingsOutline className="text-2xl"/>
                    <h1 className="text-xl font-bold text-center">Settings</h1>
                </div>

                <h2 className="mt-8 font-semibold text-2xl text-center">Profile Settings</h2>
                <form>
                    <div className="mt-8">
                        <label htmlFor="Business name" className="text-sm font-medium">Business Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter business name"
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Business Address" className="text-sm font-medium">Business Address</label>
                        <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter business address"
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Default Currency" className="text-sm font-medium">Default Currency</label>
                        <select className="w-full border border-gray-300 rounded px-3 py-2 mt-1" defaultValue="">
                            <option value="" disabled>
                                Select Currency
                            </option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>
                            <option value="CAD">CAD</option>
                            <option value="JPY">JPY</option>
                            <option value="GBP">GBP</option>
                            <option value="AUD">AUD</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 mt-6 rounded-xl font-semibold hover:bg-gray-700 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </form>

            </div>

        </div>
    )
}