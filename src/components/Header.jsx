import React, { useEffect, useRef, useState } from 'react'
import {HiOutlineSparkles} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import {AiOutlineMenu} from 'react-icons/ai'
import { useAuth } from '../context/AuthProvider';

const Header = () => {
  const header = useRef();
  const [resize,setResize] = useState(0);
  const {setMobile,mobile,setShow,show} = useAuth();
  window.addEventListener('resize',((e) => {
    setResize(window.innerWidth);
    if(window.innerWidth <= 640){
      setMobile(true)
    }else{
      setMobile(false)
    }
  }))
  const location = useLocation();
  useEffect(() => {
    const width = document.querySelector('.content').getBoundingClientRect().width;
    header.current.style.width = `${width - 1.5}px`;
  },[resize])
  return (
    <header ref={header} className='header top-0 flex p-4 border-b-dark7 border-b justify-between items-center bg-white fixed'>
        {location.pathname === '/twitter'?(<><AiOutlineMenu onClick={() => setShow(!show)} className='text-2xl font-bold sm:hidden block cursor-pointer'/> <p className='text-lg font-bold'>Home</p></>):location.pathname === '/tweetInfo'?(<Link to={'/twitter'} className='flex gap-3 items-center hover:text-blue '><BsArrowLeftShort className='text-3xl cursor-pointer'/> <p className='font-bold'>Tweet</p></Link>):null}
        <HiOutlineSparkles className='text-2xl text-blue'/>
    </header>
  )
}

export default Header