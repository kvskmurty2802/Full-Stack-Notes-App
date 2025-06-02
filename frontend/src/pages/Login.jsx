import React from 'react'
import Navbar from '../components/Navbar'
// import SignUp from './SignUp'

export default function Login() {
  return (
    <div>
      <Navbar/>
      
      <div className='flex items-center justify-center mt-28'>
        <div className='wt-6 border rounded border-red-600 bg-white px-7 py-10'>
          <form className='flex flex-col gap-4'>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type="text" placeholder='Email' className='input-box border border-red-600 rounded px-2 py-2 placeholder-black' />
            <input type="text" placeholder='Password' className='input-box border border-red-600 rounded px-2 py-2 placeholder-black' />
            <button type="submit" className='btn-primary bg-red-400 py-2 rounded-lg'>Submit</button>
            <p className='text-sm text-center mt-4'>
              <span className='font-bold'>Not Registered Yet?</span>{" "}
              <span className="text-blue-600 cursor-pointer">Create an Account</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
