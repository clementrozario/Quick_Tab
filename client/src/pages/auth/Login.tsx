import { PiInvoiceDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

type SignupFormData = {
    email: string,
    password:string
}

export const Login = () => {
    const { register, handleSubmit } = useForm<SignupFormData>()
    
    const onSubmit = (data:SignupFormData) => {
        console.log(data)
    }
    
  return (
      <div className="min-h-screen flex items-baseline justify-center pt-12 bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg w-112.5">
              
              <div className="flex items-center justify-center gap-2">
                  <PiInvoiceDuotone className="text-2xl"/>
                  <h1 className="text-xl font-bold text-center">Quick Tab</h1>
              </div>
              
              <h2 className="mt-8 font-semibold text-2xl text-center">Welcome Back</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      {...register('email')}
                  />  
              </div>

              <div className="mt-6">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      {...register('password')}
                  />
              </div>

              <button className="bg-black text-white w-full mt-6 px-3 py-2 rounded font-semibold hover:bg-gray-700 cursor-pointer">
                  Log in
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

