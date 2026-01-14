import { Link } from "react-router-dom"
import { PiInvoiceDuotone } from "react-icons/pi";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7, "password should be atleast 7 characters")
})

type SignupFormData = z.infer<typeof signupSchema>

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = (data: SignupFormData) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen flex justify-center items-baseline pt-12 bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-112.5">
                <div className="flex justify-center items-center gap-2">
                    <PiInvoiceDuotone className="text-2xl" />
                    <h1 className="text-xl font-bold text-center"> Quick Tab</h1>
                </div>

                <h2 className="text-2xl font-semibold text-center mt-8">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-8">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            {...register('password')}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>}
                    </div>

                    <button className="w-full bg-black text-white py-4 mt-6 rounded-xl font-semibold hover:bg-gray-800 cursor-pointer">
                        Sign up
                    </button>
                </form>

                <p className="text-center mt-4">Already have an account?
                    <Link to='/login' className="text-blue-600"> Login</Link>
                </p>
            </div>
        </div>
    )
}

