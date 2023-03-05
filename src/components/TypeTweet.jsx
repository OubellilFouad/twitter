import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {BsImage} from 'react-icons/bs'
import { useAuth } from '../context/AuthProvider';
import { db } from '../firebase';
import {FaUserAlt} from 'react-icons/fa';

const TypeTweet = () => {
  const textarea = useRef();
  const [tweet,setTweet] = useState('');
  const {user} = useAuth();
  const handleKeyUp = (e) => {
    e.target.style.height = `56px`;
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  const handleTweet = () => {
    let tweetID = uuidv4();
    if(tweet !== ''){
      setDoc(doc(db,'tweets',tweetID),{tweet:tweet,uid:user.uid,tweetID:tweetID,likes:0,comments:[]});
      setTweet('');
    }
  }
  return (
    <div className='flex p-4 border-b-dark7 border-b bg-white'>
        <div className=' w-12 h-12 rounded-full flex justify-center items-center aspect-square text-white text-xl bg-blue'>
          <FaUserAlt/>
        </div>
        <div className='flex flex-col px-3 w-full gap-3'>
            <textarea onChange={(e)=>setTweet(e.target.value)} value={tweet} ref={textarea} onKeyUp={(e) => handleKeyUp(e)} placeholder="What's on your mind" className='w-full py-3 resize-none h-14 text outline-none focus:border-b focus:border-b-dark7'/>
            <div className='flex justify-between items-center'>
                <div><BsImage className='cursor-pointer text-blue'/></div>
                <button onClick={handleTweet} className='py-2 px-8 bg-blue rounded-full text-white'>Tweet</button>
            </div>
        </div>
    </div>
  )
}

export default TypeTweet