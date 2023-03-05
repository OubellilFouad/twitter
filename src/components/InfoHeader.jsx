import React from 'react'
import {FiSearch} from 'react-icons/fi'

const InfoHeader = () => {
  return (
    <div className='relative flex justify-center items-center'>
        <input type="text" id='search' placeholder='Search Twitter' className='py-3 px-14 outline-none bg-dark7 w-full rounded-full focus:bg-white focus:border-blue focus:border group' />
        <label htmlFor="search" className='absolute left-5'><FiSearch className='text-dark5 text-xl'/></label>
    </div>
  )
}

export default InfoHeader