import ChatBotContext from '@/context/ChatBotContext';
import MainLayoutContext from '@/context/LayoutContext';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const ChatQuestion = ({isContentReplaced, setIsContentReplaced, img, text}: any) => {
  const {userMessage, setUserMessage, sendMessage} = useContext(ChatBotContext)

  useEffect(() => {
    if (userMessage) {
      console.log('Updated userMessage:', userMessage); // This will log the updated state
    }
  }, [userMessage]); 

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setUserMessage(text); // Ensure that `text` is defined in your component
    console.log();
    // setTimeout(() => {
    //   console.log(userMessage);
    //   sendMessage(e); // Passing the event to `sendMessage`
    //   console.log(userMessage);
      
    // }, 2000)
  };
  return (
    <div className=' cursor-pointer hover:bg-color8-200 px-5 py-[10px] border-2 border-primarytext rounded-[40px] flex items-center gap-2 min-w-fit' onClick={handleClick}>
        <Image src={img} alt='chat question' width={27.6} height={27.6}/>
        <p className='text-desktop-caption'>{text}</p>
    </div>
  )
}

export default ChatQuestion