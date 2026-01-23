import { IoSettingsOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { useAuth } from "../lib/useAuth";

const settingsSchema = z.object({
    businessName: z.string().trim().min(1, 'Business name is required'),
    businessAddress: z.string().trim().optional(),
    defaultCurrency: z.string().min(3, 'Please select a currency')
})

type SettingsFormData = z.infer<typeof settingsSchema>

export const Settings = () => {

    const { data: user } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            businessName: user?.businessName || '',
            businessAddress: user?.businessAddress || '',
            defaultCurrency:user?.defaultCurrency || ''
        }
    })

    const [ isLoading,setIsLoading ] = useState(false)
    
    const onSubmit = (data: SettingsFormData) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen flex items-baseline justify-center pt-12 bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-112.5">
                <div className="flex items-center justify-center gap-2">
                    <IoSettingsOutline className="text-2xl"/>
                    <h1 className="text-xl font-bold text-center">Settings</h1>
                </div>

                <h2 className="mt-8 font-semibold text-2xl text-center">Profile Settings</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-8">
                        <label htmlFor="Business name" className="text-sm font-medium">Business Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter business name"
                            {...register('businessName')}
                        />
                        {errors.businessName &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.businessName?.message}
                            </p>}
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Business Address" className="text-sm font-medium">Business Address</label>
                        <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter business address"
                            {...register('businessAddress')}
                        />
                        {errors.businessAddress &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.businessAddress?.message}
                            </p>
                        }
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Default Currency" className="text-sm font-medium">Default Currency</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            defaultValue=""
                            {...register('defaultCurrency')}
                        >
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
                        {errors.defaultCurrency && 
                         <p className="text-red-500 text-sm mt-1">
                            {errors.defaultCurrency?.message}
                         </p>
                        }
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-3 mt-6 rounded-xl font-semibold hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Saving' : 'Save Changes'}
                    </button>
                </form>

            </div>

        </div>
    )
}