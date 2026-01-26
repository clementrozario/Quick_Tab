import { IoSettingsOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { useAuth } from "../lib/useAuth";
import { uploadLogo,updateProfile } from "../lib/api";
import { useUserStore } from "../store/useUseStore";

const settingsSchema = z.object({
    businessName: z.string().trim().min(1, 'Business name is required'),
    businessAddress: z.string().trim().optional(),
    defaultCurrency: z.string().min(3, 'Please select a currency')
})

type SettingsFormData = z.infer<typeof settingsSchema>

export const Settings = () => {

    const { data: user } = useAuth()

    const setUserProfile = useUserStore((state) => state.setUserProfile);

    const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            businessName: user?.businessName || '',
            businessAddress: user?.businessAddress || '',
            defaultCurrency:user?.defaultCurrency || ''
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(user?.logoUrl || null)
    const [uploadMessage,setUploadMessage] = useState<{type:'success' | 'error',text:string} | null>(null)
    
    const uploadMutation = useMutation({
        mutationFn: uploadLogo,
        onSuccess: (data) => {
            setPreviewUrl(data.logoUrl)
            setSelectedFile(null)

            const currentProfile = useUserStore.getState().userProfile
            if (currentProfile) {
                setUserProfile({ ...currentProfile, logoUrl: data.logoUrl })
            }
            setUploadMessage({ type: 'success', text: 'Logo Uploaded Successfully' })
            setTimeout(()=>setUploadMessage(null),3000)
        },
        onError: (error: Error) => {
            console.error('Upload Failed:', error.message)
            setUploadMessage({ type: 'error', text: error.message || "Failed to upload Logo" })
            setTimeout(()=>setUploadMessage(null),3000)
        }
    })

    const updateMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => { 
            setUserProfile(data.user)
            console.log('Profile Updated',data)
        },
        onError: (error: Error) => {
            console.error('Update failed',error.message)
        }
    })
    
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file)
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }
    }
    
    const onSubmit = (data: SettingsFormData) => {
        updateMutation.mutate(data)
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

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Business Logo</h3>
                        <label className="text-sm font-medium">
                            Upload Logo
                        </label>

                        <div className="flex justify-center mb-4">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Business Logo"
                                    className="w-32 h-32 rounded-full object-cover object-center border-4 border-gray-200"
                                />
                            ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                        <span className="text-gray-500 text-sm">No Logo</span>
                                    </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        />
                        <button
                            type="button"
                            onClick={() => selectedFile && uploadMutation.mutate(selectedFile)}
                            disabled={!selectedFile || uploadMutation.isPending}
                            className="w-full bg-blue-600 text-white py-2 mt-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploadMutation.isPending?'Uploading...':'Upload Logo'}
                        </button>

                        {uploadMessage && (
                            <p className={`text-sm mt-2 text-center ${uploadMessage.type === 'success' ? 'text-green-600':'text-red-600'}`}>
                                {uploadMessage.text}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="w-full bg-black text-white py-3 mt-6 rounded-xl font-semibold hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>

            </div>

        </div>
    )
}