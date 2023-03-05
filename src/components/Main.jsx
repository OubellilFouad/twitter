import React from 'react'
import Tweets from './Tweets'
import TypeTweet from './TypeTweet'

const Main = () => {
  return (
    <div className='flex flex-col gap-3'>
      <TypeTweet/>
      <Tweets/>
    </div>
  )
}

export default Main