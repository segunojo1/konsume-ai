"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "@/modules/Sidebar";
import ScannerHead from "@/modules/scanner/ScannerHead";
import DashboardNav from "@/modules/dashboard/DashboardNav";
import withAuth from "../../helpers/withAuth";
import kons from "../../public/arrowup.svg";
import Image from "next/image";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
import { parseBoldText } from "../../helpers/parseBoldText";
import { Input } from "@/components/ui/input";
import { useSetupContext } from "../../context/SetupContext";
import MainLayout from "@/components/Layout/MainLayout";
import ChatQuestion from "@/modules/chat/ChatQuestion";
import MainLayoutContext from "@/context/LayoutContext";
import ChatBotContext from "@/context/ChatBotContext";
import Cookies from "js-cookie";

const Chat = () => {
  const { toggled, setToggled } = useContext(MainLayoutContext);
  const {userMessage, setUserMessage, chatLog, isContentReplaced, setIsContentReplaced, sendMessage, loading, setIsLoading, containerRef} = useContext(ChatBotContext);
  
  
 const {name}:any = useContext(MainLayoutContext);
 const [user, setUser] = useState<string | undefined>();
 useEffect(() => {
   setUser(Cookies.get('konsumeUsername'))
 }, [])

  useEffect(() => {
    if (userMessage) {
      console.log('Updated userMessage:', userMessage); // This will log the updated state
    }
  }, [userMessage]); 

  
  /**
   * handleMessage: handles settin state of message while typing
   * @param e
   */
  const handleMessage = (e: any) => {
    setUserMessage(e.target.value);
  };


  /**
   * handleEnter: handle when enter key is pressed
   * @param event
   */
  const handleEnter = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  };

  const renderTextWithBold = (text: any) => {
    const parts = parseBoldText(text);

    return parts.map((part, index) => {
      if (typeof part === "string") {
        return part;
      } else {
        return (
          <React.Fragment key={index}>
            <br />
            {part}
            <br />
          </React.Fragment>
        );
      }
    });
  };
 



  return (
    <div className="">
      <MainLayout activePage="chat" className="overflow-y-hidden" includeMarginTop={false}>
        {/* <DashboardNav toggled={toggled} setToggled={setToggled} /> */}
        <div
          className="mt-5"
        >
          <Image src="/ellipsebg.svg" height={700} width={1274.12} alt="background" className=" max-h-fit absolute top-10 bottom-0 left-0 right-0 w-full h-full opacity-50 -z-[60]" />
          {/* <ScannerHead /> */}
          {/* <DashboardBody /> */}
          {
            !isContentReplaced ? (

              <div className=" justify-between flex flex-col min-h-[80vh]">
                <div className="flex justify-between md:p-0 p-6">
                  <div className="flex flex-col gap-7">

                    <div className="relative w-fit">
                      <Image src='/multipleline.svg' alt='multi line' height={141} width={153} className='  absolute bottom-0 top-0 my-auto right-0 -z-50' />
                      <h1 className="md:text-desktop-heading1 text-[28px]/[40px] font-bold z-50">Hello, {user ? Cookies.get('konsumeUsername') : '..'} </h1>
                    </div>
                    <p className=" text-desktop-highlight italic max-w-[450px]">Chat with our AI bot for personalized nutrition tips, recipes, and meal plans. Get instant, tailored advice to reach your health goals!</p>
                  </div>
                  <div className=" backdrop-blur-lg">
                    <Image src='/tryscanner.svg' alt='multi line' height={141} width={153} className='backdrop-blur-sm bg-white md:block hidden' />
                  </div>
                </div>
                <div className="flex  gap-4 max-w-[1000px] flex-wrap items-center mx-auto justify-center">
                  <ChatQuestion isContentReplaced={isContentReplaced} setIsContentReplaced={setIsContentReplaced} sendMessage={sendMessage} img="/chatlogo.svg" text="Generate the recipe for the perfect Jollof Rice." />
                  <ChatQuestion isContentReplaced={isContentReplaced} setIsContentReplaced={setIsContentReplaced} sendMessage={sendMessage} img="/chatlogo.svg" text="Provide The nutrition Info for Egusi Soup." />
                  <ChatQuestion isContentReplaced={isContentReplaced} setIsContentReplaced={setIsContentReplaced} sendMessage={sendMessage} img="/chatlogo.svg" text="Show me workout plans for weight loss." />
                </div>
                <form>
                  <div className="relative  w-full">
                    <Input
                      value={userMessage ?? ""}
                      onChange={handleMessage}
                      onKeyDown={handleEnter}
                      placeholder=""
                      className=" shadow-shad focus:bg- rounded-[40px] px-5"
                    />
                    <button
                      type="submit"
                      className="absolute right-9 my-auto top-0 bottom-0"
                    >
                      <Image
                        alt="kons"
                        src={kons}
                        className="md:w-[43px] w-[30px]"
                        onClick={sendMessage}
                      />
                    </button>
                  </div>
                </form>
              </div>
            ) : (

              <div className="relative  p-8 mt-auto">
                <div className="right-0 -top-5 absolute">
                  <Image src='/tryscanner.svg' alt='multi line' height={141} width={153} className=' ' />
                </div>
                <div className="text-white p-5 flex flex-col gap-2 overflow-y-auto  h-[60vh] pb-32 scroll-smooth " ref={containerRef}>
                  {chatLog.map((chat: any) => {
                    if (chat.user == "me") {
                      return (
                        <p
                          className="px-5 py-[10px] w-fit rounded-[40px] border-2 border-primarytext  ml-auto"
                          key={chat.message}
                        >
                          {chat.message}
                        </p>
                      );
                    } else {
                      return (
                        <div
                          className="flex items-start justify-start gap-4"
                          key={chat.message}
                        >
                          <p className="px-5 py-[10px] w-fit bg-color8-200 text-primarytext rounded-[40px] ">
                            {renderTextWithBold(chat.message)}
                          </p>
                        </div>
                      );
                    }
                  })}
                  <div className={ `${loading ? "block " : "hidden"} loader2` }>
                    <p> .</p>
                  </div>
                </div>
                <form>
                  <div className="relative  w-full">
                    <Input
                      value={userMessage ?? ""}
                      onChange={handleMessage}
                      onKeyDown={handleEnter}
                      placeholder="Message FoodieAI"
                      className=" shadow-inner focus:bg- rounded-[40px] px-5"
                    />
                    <button
                      type="submit"
                      className="absolute right-5 my-auto top-0 bottom-0"
                    >
                      <Image
                        alt="kons"
                        src={kons}
                        className="md:w-[43px] w-[30px]"
                        onClick={sendMessage}
                      />
                    </button>
                  </div>
                </form>
              </div>
            )
          }

          {/* <div className="font-jakarta bg-[#8C77EC] dashboardhead p-8">
          <div className="text-white p-5 flex flex-col gap-2 overflow-y-scroll h-[70vh] ">
            {chatLog.map((chat) => {
              if (chat.user == "me") {
                return (
                  <p
                    className="p-1 w-fit rounded-lg rounded-br-none ml-auto"
                    key={chat.message}
                  >
                    {chat.message}
                  </p>
                );
              } else {
                return (
                  <div
                    className="flex items-start justify-start gap-4"
                    key={chat.message}
                  >
                    <Image
                      src={kons}
                      alt="logo"
                      className="w-[50px] h-[44px]"
                    />
                    <p className="p-1 w-fit text-[#D6FBC4] rounded-lg rounded-bl-none">
                      {renderTextWithBold(chat.message)}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <form>
            <div className="relative  w-full">
              <Input
                value={userMessage ?? ""}
                onChange={handleMessage}
                onKeyDown={handleEnter}
                placeholder="What are some good post-workout snacks?"
                className=" px-5 text-[#0C250380] font-medium leading-[47.69px] bg-[#FFFFFF] border-[3.5px] border-[#D7F2CD] rounded-[46.5px]"
              />
              <button
                type="submit"
                className="absolute right-5 my-auto top-0 bottom-0"
              >
                <Image
                  alt="kons"
                  src={kons}
                  className="md:w-[43px] w-[30px]"
                  onClick={sendMessage}
                />
              </button>
            </div>
          </form>
        </div> */}
        </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(Chat);
