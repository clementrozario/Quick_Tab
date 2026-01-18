import { PiInvoiceDuotone } from "react-icons/pi";
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {  z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { loginUser } from "../../lib/api";

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password:z.string().min(7,'Password must be atleast 7 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
    const { register, handleSubmit,formState:{errors} } = useForm<LoginFormData>({
        resolver:zodResolver(loginSchema)
    })

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            navigate('/')
        }
    })
    
    const onSubmit = (data:LoginFormData) => {
        mutation.mutate(data)
    }
    
  return (
      <div className="min-h-screen flex items-baseline justify-center pt-12 bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg w-112.5">
              
              <div className="flex items-center justify-center gap-2">
                  <PiInvoiceDuotone className="text-2xl"/>
                  <h1 className="text-xl font-bold text-center">Quick Tab</h1>
              </div>
              
              <h2 className="mt-8 font-semibold text-2xl text-center">Welcome Back</h2>

              {mutation.isError && (
                  <p className="text-red-500 text-sm mt-4 text-center">
                      {mutation.error?.message || 'Login Failed. Please try again'}
                  </p>
              )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mt-8">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                          type="email"
                          placeholder="you@mail.com"
                          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      {...register('email')}
                    />  
                      {errors.email &&
                          <p className="text-red-500 text-sm mt-1">{errors.email?.message}
                          </p>
                      }
              </div>

              <div className="mt-6">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      {...register('password')}
                    />
                      {errors.password &&
                          <p className="text-red-500 text-sm mt-1">{errors.password?.message}
                          </p>
                      }
              </div>

                <button
                    disabled={mutation.isPending}
                    type="submit"
                    className="bg-black text-white w-full mt-6 px-3 py-2 rounded font-semibold hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        {mutation.isPending ? 'Logging in...':'Log in'}
                </button>

              <button className="bg-gray-100 w-full px-3 py-2 rounded font-medium mt-2 hover:bg-gray-400 cursor-pointer">
                  Reset Password
              </button>
            </form>

              <p className="mt-4 text-center">Don't have an account?
                  <Link to='/signup' className="text-blue-600 hover:text-blue-400"> Signup</Link>
              </p>

          </div>
    </div>
  )
}

