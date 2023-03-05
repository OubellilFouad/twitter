import React, { useState, useEffect } from 'react'
import {BiComment} from 'react-icons/bi'
import {AiOutlineRetweet, AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {FiUpload} from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const TweetInfo = () => {
  const location = useLocation(); 
  const [commentAuthor,setCommentAuthor] = useState({});
  const [comment,setComment] = useState('');
  const [tweetComments,setTweetComments] = useState([]);
  const {tweet,likes,comments,author,id,likeBool,allPosts} = location.state;
  const [posts,setPosts] = useState(allPosts)
  const [like,setLike] = useState(likeBool);
  const [tweetLikes,setTweetLikes] = useState(0);
  const {user,setUser} = useAuth();
  const [commentCount,setCommentCount] = useState(0);
  const colRef = collection(db,'comments');
  useEffect(() => {
    getDoc(doc(db,'tweets',id)).then((result) => {
        setTweetLikes(result.data().likes);
    })
    getDoc(doc(db,'users',user.uid)).then((result) => {
        if(result.data().likedPosts.includes(id)){
            setLike(true)
        }
        setPosts(result.data().likedPosts);
    })
    onSnapshot(colRef,(result) => {
        let resultArr = [];
        result.docs.map((doc) => {
            if(doc.data().tweet === id){
                resultArr.push(doc.data());
            }
        })
        setTweetComments(resultArr);
    })
  },[])
  const handleLike = () => {
    if(!like){
        getDoc(doc(db,'tweets',id)).then((result) => {
            setTweetLikes(result.data().likes);
        })
        setPosts([...posts,id])
        updateDoc(doc(db,'tweets',id), {likes: tweetLikes + 1});
        updateDoc(doc(db,'users',user.uid), {likedPosts:[...posts,id]})
        setLike(true);
    }else{
        getDoc(doc(db,'tweets',id)).then((result) => {
            setTweetLikes(result.data().likes);
        })
        let newArr = posts.filter((post) => {
            return post !== id
        });
        setPosts(newArr)
        updateDoc(doc(db,'tweets',id), {likes: tweetLikes - 1});
        updateDoc(doc(db,'users',user.uid), {likedPosts:newArr})
        setLike(false);
    }
}
  const icons = [
      {
          icon: <BiComment className='text-lg cursor-pointer'/>,
      },
  
      {
          icon : <AiOutlineRetweet className='text-lg cursor-pointer'/>,
      },
        
      {
          icon : like?<AiFillHeart onClick={handleLike} className={`text-lg cursor-pointer`}/>:<AiOutlineHeart onClick={handleLike} className={`text-lg cursor-pointer`}/>,
          type: 'heart'
      },
  
      {
          icon : <FiUpload className='text-lg cursor-pointer'/>, 
      }
  ]
  const handleKeyUp = (e) => {
    e.target.style.height = `56px`;
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  const handleComment = () => {
    let commentID = uuidv4();
    if(tweet !== ''){
      setDoc(doc(db,'comments',commentID),{comment:comment,tweet:id,uid:user.uid,commentID,likes:0,replies:[]});
      setComment('');
    }
  }
  return (
    <div className='flex flex-col bg-white'>
        <div className='flex gap-4 items-center p-4'>
            <div className='w-14 h-14 rounded-full overflow-hidden bg-red-400'>
                <img src={author.photo} alt="" />
            </div>
            <div className='flex flex-col'>
                <p className='font-bold'>{author.name}</p>
                <span className='text-dark5'>{author.email}</span>
            </div>
        </div>
        <div className='p-4'>{tweet}</div>
        <div className=' border-y border-y-dark7 p-4 flex gap-4'>
            <span>{tweetComments.length} comments</span>
            <span>{tweetLikes} likes</span>
        </div>
        <div className='flex border-b-dark7 border-b p-4'>
            {icons.map((item,index) => {
                const {icon,type} = item;
                return(
                    <div key={index} className={`flex-1 flex justify-center items-center gap-2 text-dark5 ${(type === 'heart' && like)&&'text-red-500'}`}>
                        {icon}
                    </div>
                )
            })}
        </div>
        <div className='flex p-4 w-full gap-6 border-b-dark7 border-b'>
            <div className='w-12 h-12 rounded-full bg-blue overflow-hidden flex items-start'>
                <img src={user?.photoURL}/>
            </div>
            <div className='flex-1'>
                <textarea onChange={(e)=>setComment(e.target.value)} value={comment} onKeyUp={(e) => handleKeyUp(e)} placeholder="What's on your mind" className='w-full py-3 resize-none h-14 text outline-none focus:border-b focus:border-b-dark7'/>
            </div>
            <div className='flex items-end'>
                <button onClick={handleComment} className='py-2 px-5 rounded-full bg-blue text-white justify-self-end'>Reply</button>
            </div>
        </div>
        <div>
            {tweetComments.map((tweetComment) => {
                if(tweetComment){
                    const {comment,commentID,uid} = tweetComment;
                    getDoc(doc(db,'users',uid)).then((result) => {
                        setCommentAuthor(result.data());
                    })
                    return(
                        <div key={commentID} className='flex p-4 gap-4 border-b-dark7 border-b'>
                            <div className='w-12 h-12 rounded-full overflow-hidden bg-red-300'>
                                <img src={commentAuthor?.photo} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <p className='font-bold'>{commentAuthor?.name}</p>
                                    <span className='text-dark5 text-sm'> {commentAuthor?.email} </span>
                                </div>
                                <div className='py-4'> {comment} </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default TweetInfo