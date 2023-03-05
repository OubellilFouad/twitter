import React, { useEffect, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import Header from './Header'
import Main from './Main'
import Protected from './Protected'
import Signup from './Signup'
import TweetInfo from './TweetInfo'
import TypeTweet from './TypeTweet'

const Content = () => {
  const {user} = useAuth();
  const separator = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if(user !== null){
        navigate('/twitter');
    }else{
        navigate('/signup');
    }
  },[user])
  useEffect(() => {
    const height = document.querySelector('.header').getBoundingClientRect().height;
    separator.current.style.paddingTop = `${height}px`;
  })
  return (
    <div ref={separator} className='flex-[3] flex flex-col border-dark7 border bg-dark8 overflow-x-scroll content'>
        <Header/>
        <Routes>
            <Route path='signup' element={<Signup/>}/>
            <Route path='twitter' element={<Protected><Main/></Protected>}/>
            <Route path='tweetInfo' element={<TweetInfo/>}/>
        </Routes>
    </div>
  )
}

export default Content