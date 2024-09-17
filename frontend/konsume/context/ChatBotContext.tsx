import React, { createContext, useEffect, useRef, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import { toast } from 'react-toastify';
import gemini from '@/http/gemini';
import { useSetupContext } from './SetupContext';
import { axiosKonsumeInstance } from '@/http/konsume';
import Cookies from 'js-cookie';

const ChatBotContext = createContext({} as any);
export default ChatBotContext;

export function ChatBotContextProvider({ children }: { children: React.ReactNode }) {
  const [userMessage, setUserMessage] =useState('');
  const [chatLog, setChatLog]: any = useState([]);
  const [isContentReplaced, setIsContentReplaced] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const containerRef:any = useRef(null);
  const { userGoal, possibleDiseases } = useSetupContext();

  
  /*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "tunedModels/foodieai2-8unujji78ikd",
// });

// const generationConfig = {
//   temperature: 0,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run() {
  
// }

  const sendMessage = async (e: any) => {
      console.log(userMessage);
      e.preventDefault();
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
      setIsLoading(prev => !prev);
      const {data} = await axiosKonsumeInstance.post("/api/ChatBot/ChatBot", null, {
        params: {
          profileId: 2,
          request: userMessage
        }
      });
      console.log(data);
      
    //   const chatSession = model.startChat({
    //     generationConfig,
    //  // safetySettings: Adjust safety settings
    //  // See https://ai.google.dev/gemini-api/docs/safety-settings
    //     history: [
    //     ],
    //   });
    
    //   const result = await chatSession.sendMessage(`${userMessage}, i wan to ${userGoal} and i suffer from ${possibleDiseases}`);
    //   console.log(result.response.text());


      // const response = result.response.text()
      setChatLog((prevChatLog: any) => [
        ...prevChatLog,
        {
          user: "chat",
          message: `${data} `,
        },
      ]);
      setIsLoading(false)
      
      // console.log(data.candidates[0]);
      console.log(userMessage);
    } catch (error: any) {
      toast.error(error);
    }
    console.log(chatLog);
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    const handleClick = (e:any) => {
      sendMessage(e);
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
    sendMessage,
    loading,
    setIsLoading,
    containerRef
  };

  return <ChatBotContext.Provider value={contextValue}>{children}</ChatBotContext.Provider>;
}
