import React, { useEffect, useState } from 'react'
import {RiHome7Fill,RiFileList3Line} from 'react-icons/ri';
import {HiOutlineHashtag} from 'react-icons/hi'
import {BsBell,BsBookmark,BsPerson,BsTwitter,BsThreeDots} from 'react-icons/bs'
import {RxEnvelopeClosed} from 'react-icons/rx'
import {CgMoreO} from 'react-icons/cg'
import {TiArrowSortedDown} from 'react-icons/ti'
import { useAuth } from '../context/AuthProvider';
import {GrClose} from 'react-icons/gr'
import {FaUserAlt} from 'react-icons/fa';

const nav = [
    {
        text: "Home",
        icon: <RiHome7Fill/>
    },
    {
        text: "Explore",
        icon: <HiOutlineHashtag/>
    },
    {
        text: "Notifications",
        icon: <BsBell/>
    },
    {
        text: "Messages",
        icon: <RxEnvelopeClosed/>
    },
    {
        text: "Bookmarks",
        icon: <BsBookmark/>
    },
    {
        text: "Lists",
        icon: <RiFileList3Line/>
    },
    {
        text: "Profile",
        icon: <BsPerson/>
    },
    {
        text: "More",
        icon: <CgMoreO/>
    },
]

const Sidebar = () => {
  const [showw,setShoww] = useState(false);  
  const {logout,user,mobile,setMobile,show,setShow} = useAuth();
  const handleLogout= async () => {
    await logout();
    setShoww(false)
  }
  if(!mobile){
    return (
        <div className='h-full lg:pl-6 pl-0 lg:flex-[1.1] flex-[0] border-r border-r-dark7 sm:block hidden'>
            <div className='flex flex-col justify-between h-full bg-white py-5 lg:px-5 px-10 lg:items-start items-center'>
                <div className='flex flex-col gap-7 w-fit '>
                    <div className='text-3xl text-blue'>{<BsTwitter/>}</div>
                    <div className='flex flex-col gap-6'>
                        {nav.map((item,index) => {
                            const {text,icon} = item;
                            return(
                                <div key={index} className='flex items-center gap-5 cursor-pointer'>
                                    <span className='text-3xl'>{icon}</span>
                                    <p className='text-lg font-medium lg:block hidden'>{text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {user && (
                    <div className='flex lg:w-full shadow-md rounded-full border border-dark7 lg:p-2 p-0 gap-2 items-center relative lg:aspect-[0/0] aspect-square mt-6'>
                        <div className='w-10 h-10 flex-[30%] bg-blue text-white text-lg flex justify-center items-center aspect-square rounded-full'>
                            <FaUserAlt/>
                        </div>
                        <div className='flex-[100%] flex flex-col relative'>
                            <p className='text-lg font-bold hidden lg:block'>{user.displayName}</p>
                            <span className='text-sm text-dark6 hidden lg:block'>UserHandle</span>
                            <BsThreeDots onClick={() => setShoww(!showw)} className='absolute text-lg font-bold cursor-pointer top-2/4 -translate-y-2/4 right-0'/>
                        </div>
                        <div className={`w-full absolute -top-16 bg-white shadow-xl border-dark7 border rounded-lg p-4 ${showw?'block':'hidden'}`}>
                            <button onClick={handleLogout} className='w-full h-full'>logout
                                <TiArrowSortedDown className={`absolute text-3xl -bottom-4 text-white -right-1`}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )
  }else{
    return(
        <div className={`h-full lg:pl-6 pl-0 border-r border-r-dark7 absolute z-10 ${show?'translate-x-0':' -translate-x-[100%]'} transition-[transform_200ms]`}>
            <div className='flex flex-col justify-between h-full bg-white p-5 px-10'>
                <div className='flex flex-col gap-7 w-fit '>
                    <div className='text-3xl text-blue flex justify-between items-center relative'><BsTwitter/> <GrClose onClick={() => setShow(!show)} className='text-xl absolute -right-4'/></div>
                    <div className='flex flex-col gap-6'>
                        {nav.map((item,index) => {
                            const {text,icon} = item;
                            return(
                                <div key={index} className='flex items-center gap-5 cursor-pointer'>
                                    <span className='text-3xl'>{icon}</span>
                                    <p className='text-lg font-medium'>{text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {user && (
                    <div className='flex lg:w-full shadow-md rounded-full border border-dark7 p-2 gap-2 items-center relative mt-6'>
                        <div className='w-10 h-10 flex-[30%] bg-blue text-white text-lg flex justify-center items-center aspect-square rounded-full'>
                            <FaUserAlt/>
                        </div>
                        <div className='flex-[100%] flex flex-col relative'>
                            <p className='text-base font-bold'>{user.displayName}</p>
                            <span className='text-sm text-dark6'>UserHandle</span>
                            <BsThreeDots onClick={() => setShow(!show)} className='absolute text-lg font-bold cursor-pointer top-2/4 -translate-y-2/4 right-0'/>
                        </div>
                        <div className={`w-full absolute -top-16 bg-white shadow-xl border-dark7 border rounded-lg p-4 ${showw?'block':'hidden'}`}>
                            <button onClick={handleLogout} className='w-full h-full'>logout
                                <TiArrowSortedDown className={`absolute text-3xl -bottom-4 text-white -right-1`}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
  }
}

export default Sidebar