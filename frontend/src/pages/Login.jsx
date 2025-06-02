import React from 'react'
import Navbar from '../components/Navbar'
import SignUp from './SignUp'

export default function Login() {
  return (
    <div>
      <Navbar/>
      
      <div className='flex items-center justify-center mt-28'>
        <div className='wt-6 border rounded bg-white px-7 py-10'>
          <form>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type="text" placeholder='Email' className='input-box' />
            <input type="text" placeholder='Password' className='input-box' />
            <button type="submit" className='btn-primary'>Submit</button>
            <p className='text-sm text-center mt-4'>
              Not Registered Yet?{" "}
              <p className="">
                Create an Account ?
              </p>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
