import { doc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { db } from '../firebase';
import Tweet from './Tweet'

const Tweets = () => {
  const {tweets} = useAuth();
  const [posts,setPosts] = useState([]);
  return (
    <div className='flex flex-col w-full'>
        {tweets.map((tweett) => {
            const {tweet,uid,tweetID,likes,comments} = tweett;
            return(
                <Tweet key={tweetID} posts={posts} setPosts={setPosts} tweet={tweet} tweeter={uid} id={tweetID} likes={likes} comments={comments} />
            )
        })}
    </div>
  )
}

export default Tweets