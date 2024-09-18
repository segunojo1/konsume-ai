import React, { useContext, useEffect, useState } from "react";
import withAuth from "../../helpers/withAuth";
import MainLayout from "@/components/Layout/MainLayout";
import ChatBotContext from "@/context/ChatBotContext";
import Image from "next/image";
import ChatHeader from "@/modules/chat/ChatHeader";
import ChatQuestions from "@/modules/chat/ChatQuestions";
import ChatInput from "@/modules/chat/ChatInput";
import ChatMessages from "@/modules/chat/ChatMessages";
import Link from "next/link";

const Chat = () => {
  const {
    userMessage,
    setUserMessage,
    chatLog,
    isContentReplaced,
    setIsContentReplaced,
    sendMessage,
    loading,
    containerRef,
  } = useContext(ChatBotContext);

  const handleMessage = (e: any) => {
    setUserMessage(e.target.value);
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  };

  return (
    <div>
      <MainLayout fixedTopbar activePage="chat" className=" overflow-y-hidden pb-3 " includeMarginTop>
        {!isContentReplaced ? (
          <div className="justify-between flex flex-col min-h-[80vh] ">
            <ChatHeader />
            <ChatQuestions
              isContentReplaced={isContentReplaced}
              setIsContentReplaced={setIsContentReplaced}
              sendMessage={sendMessage}
            />
            <ChatInput
              userMessage={userMessage}
              handleMessage={handleMessage}
              handleEnter={handleEnter}
              sendMessage={sendMessage}
            />
          </div>
        ) : (
          <div className="md:p-8 flex flex-col justify-between ">
            <Link href="/scanner" className="left-0  absolute">
              <Image src="/tryscanner.svg" alt="multi line" height={141} width={100} className="" />
            </Link>
            <ChatMessages chatLog={chatLog} loading={loading} containerRef={containerRef} />
            <ChatInput
              userMessage={userMessage}
              handleMessage={handleMessage}
              handleEnter={handleEnter}
              sendMessage={sendMessage}
            />
          </div>
        )} 
      </MainLayout>
    </div>
  );
};

export default withAuth(Chat);
