import React, { useEffect, useState } from 'react'
import {BiComment} from 'react-icons/bi'
import {AiOutlineRetweet, AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {FiUpload} from 'react-icons/fi'
import { useAuth } from '../context/AuthProvider'
import { db } from '../firebase'
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Tweet = ({comments,likes, tweet, tweeter, id,posts,setPosts}) => {
  const [like,setLike] = useState(false);
  const [tweetLikes,setTweetLikes] = useState(0);
  const {users,user} = useAuth();
  const [commentCount,setCommentCount] = useState(comments);
  const navigate = useNavigate();
  let author = users.filter((author) => author.uid === tweeter.uid)[0];
  useEffect(() => {
    getDoc(doc(db,'tweets',id)).then((result) => {
        setTweetLikes(result.data().likes);
    })
    getDoc(doc(db,'users',user.uid)).then((result) => {
        setPosts(result.data().likedPosts);
        if(result.data().likedPosts.includes(id)){
            setLike(true);
        }
    })
  },[])
  const handleLike = () => {
    if(!like){
        getDoc(doc(db,'tweets',id)).then((result) => {
            setTweetLikes(result.data().likes);
        })
        setPosts([...posts,id]);
        updateDoc(doc(db,'tweets',id), {likes: tweetLikes + 1});
        updateDoc(doc(db,'users',user.uid),{likedPosts: [...posts,id]});
        setLike(true);
    }else{
        getDoc(doc(db,'tweets',id)).then((result) => {
            setTweetLikes(result.data().likes);
        })
        let newArr = posts.filter((post) => {
            return post !== id;
        })
        setPosts(newArr)
        updateDoc(doc(db,'tweets',id), {likes: tweetLikes - 1});
        updateDoc(doc(db,'users',user.uid),{likedPosts: newArr});
        setLike(false);
    }
  }
  const icons = [
    {
        icon: <BiComment className='text-lg cursor-pointer'/>,
        count: commentCount|0
    },

    {
        icon : <AiOutlineRetweet className='text-lg cursor-pointer'/>,
        count: 0
    },
      
    {
        icon : like?<AiFillHeart onClick={handleLike} className={`text-lg cursor-pointer`}/>:<AiOutlineHeart onClick={handleLike} className={`text-lg cursor-pointer`}/>,
        count: likes|0,
        type: 'heart'
    },

    {
        icon : <FiUpload className='text-lg cursor-pointer'/>, 
        count: 0
    }
  ]
  const navigateTo = () => {
    navigate('/tweetInfo',{state:{tweet,comments,likes,id,author,likeBool: like,allPosts: posts}})
  }
  return (
    <div data-id={id} className='flex flex-col p-4 bg-white gap-3 border-y border-y-dark7'>
        <div className='flex gap-4'>
            <div className='w-12 h-12 rounded-full aspect-square bg-red-400'>
                <img  src={author.photo} className='w-full rounded-full'/>
            </div>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex gap-2'>
                    <p className='font-bold'>{author.name}</p>
                    <span className='text-dark5'>{author.email}</span>
                </div>
                <div onClick={navigateTo}>{tweet}</div>
                {/* <div>image</div> */}
                <div className='flex w-full items-center'>
                    {icons.map((item,index) => {
                        const {icon,count,type} = item;
                        return(
                            <div key={index} className={`flex-1 flex items-center gap-2 text-dark5 ${(type === 'heart' && like)&&'text-red-500'}`}>
                                {icon}
                                {count}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Tweet