import React, { createContext, useEffect, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import { toast } from 'react-toastify';
import gemini from '@/http/gemini';

const ChatBotContext = createContext({} as any);
export default ChatBotContext;

export function ChatBotContextProvider({ children }: { children: React.ReactNode }) {
  const [userMessage, setUserMessage] =useState('');
  const [chatLog, setChatLog]: any = useState([]);
  const [isContentReplaced, setIsContentReplaced] = useState(false);
 
  const sendMessage = async (e: any) => {
      console.log(userMessage);
    if (chatLog.length < 1) {
      setIsContentReplaced(true)
    }
    
    // e.preventDefault();
    setChatLog((prevChatLog: any) => [
      ...prevChatLog,
      { user: "me", message: userMessage },
    ]);
    // setUserMessage("");
    console.log(userMessage);
    setUserMessage('')
    try {
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [
          {
            parts: [
              {
                text: `${userMessage} `,
              },
            ],
          },
        ],
      });


      const response = data.candidates[0].content.parts[0].text;
      setChatLog((prevChatLog: any) => [
        ...prevChatLog,
        {
          user: "chat",
          message: `${response} `,
        },
      ]);
      
      console.log(data.candidates[0]);
      console.log(userMessage);
    } catch (error: any) {
      toast.error(error);
    }
    console.log(chatLog);
  };
  useEffect(() => {
    const handleClick = () => {
      sendMessage();
    };
  
    if (userMessage) {
      console.log('Updated userMessage:', userMessage); // This will log the updated state
  
      if (chatLog.length === 0) {
        document.addEventListener('click', handleClick);
      } else {
        // If chatLog length is greater than 0, remove the event listener
        document.removeEventListener('click', handleClick);
      }
    }
  
    // Optional cleanup to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [userMessage, chatLog.length]); 

  const contextValue: any = {
    chatLog, 
    setChatLog,
    userMessage,
    setUserMessage,
    isContentReplaced, 
    setIsContentReplaced,
    sendMessage
  };

  return <ChatBotContext.Provider value={contextValue}>{children}</ChatBotContext.Provider>;
}
