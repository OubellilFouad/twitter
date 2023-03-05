import { async } from '@firebase/util';
import React, { useRef } from 'react'
import GoogleButton from 'react-google-button'
import { useAuth } from '../context/AuthProvider'

const Signup = () => {
  const {signUp,user} = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signUp(email,password,name);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='h-80 bg-white border-b border-b-dark7 flex justify-center items-center flex-col gap-4'>
        <div className='flex flex-col'>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" name='name' className='bg-dark7 text-dark5 h-8 p-1 outline-none rounded-md'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" name='email' className='bg-dark7 text-dark5 h-8 p-1 outline-none rounded-md'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" name='password' className='bg-dark7 text-dark5 h-8 p-1 outline-none rounded-md'/>
        </div>
        <button type='submit' className='bg-blue py-2 px-10 rounded-lg text-white'>Sign up</button>
    </form>
  )
}

export default Signup