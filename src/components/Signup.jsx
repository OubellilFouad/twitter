import React from 'react'
import GoogleButton from 'react-google-button'
import { useAuth } from '../context/AuthProvider'

const Signup = () => {
  const {signUp,user} = useAuth();
  const handleSignIn = async () => {
    await signUp();
  }
  return (
    <div className=' h-80 bg-white border-b border-b-dark7 flex justify-center items-center flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Sign in with google to get the latest tweets and news</h1>
        <GoogleButton onClick={handleSignIn}/>
    </div>
  )
}

export default Signup