import React from 'react'
import Accounts from './Accounts'
import InfoHeader from './InfoHeader'

const Info = () => {
  return (
    <div className='flex-[1.7] p-4 gap-5  flex-col md:flex hidden'>
        <InfoHeader/>
        <Accounts/>
    </div>
  )
}

export default Info