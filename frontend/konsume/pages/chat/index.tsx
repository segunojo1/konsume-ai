import React, { useState } from "react";
import Sidebar from "@/modules/dashboard/Sidebar";
import ScannerHead from "@/modules/scanner/ScannerHead";
import DashboardNav from "@/modules/dashboard/DashboardNav";
import withAuth from "../../helpers/withAuth";
import kons from "../../public/assets/kons.png";
import Image from "next/image";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
import { parseBoldText } from "../../helpers/parseBoldText";
import { Input } from "@/components/ui/input";
import { useSetupContext } from "../../context/SetupContext";

const Chat = () => {
  const [toggled, setToggled] = useState(false);
  const [userMessage, setUserMessage] = useState(``);
  const { userGoal, possibleDiseases } = useSetupContext();
  const [chatLog, setChatLog] = useState([
    { user: "chat", message: "Ask anything about nutrition, food etc. :)" },
  ]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    setUserMessage("");
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { user: "me", message: userMessage },
    ]);
    console.log(userMessage);

    try {
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [
          {
            parts: [
              {
                text: `${userMessage} My goal is to ${userGoal}. I have some health conditions: ${possibleDiseases}. Please provide a short and straightforward response based on my goal and health conditions. Only answer questions related to food, eating, health, or goals. If a question is unrelated, please respond with "I am a food chatbot and can only answer questions about food, eating, and health."`,
              },
            ],
          },
        ],
      });
      const response = data.candidates[0].content.parts[0].text;
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          user: "chat",
          message: `${response} `,
        },
      ]);
      console.log(data.candidates[0]);
    } catch (error: any) {
      toast.error(error);
    }
    console.log(chatLog);
  };
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
    <div>
      <Sidebar toggled={toggled} setToggled={setToggled} />
      <div
        className={`${toggled ? "" : "md:ml-[280px]"} gap-5 flex flex-col px-5`}
      >
        <DashboardNav toggled={toggled} setToggled={setToggled} />
        <ScannerHead />
        {/* <DashboardBody /> */}
        <div className="font-jakarta bg-[#8C77EC] dashboardhead p-8">
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
        </div>
      </div>
    </div>
  );
};

export default withAuth(Chat);
