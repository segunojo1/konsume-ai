import React from "react";
import Image from "next/image";
import { renderTextWithBold } from "@/helpers/renderTextWithBold";

interface ChatMessagesProps {
  chatLog: any[];
  loading: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatLog,
  loading,
  containerRef,
}) => {
  return (
    <div className="text-white md:p-5 flex flex-col gap-2 overflow-y-auto xl:h-[50vh]   scroll-smooth" ref={containerRef}>
      {chatLog.map((chat: any) => {
        if (chat.user == "me") {
          return (
            <p
              className="px-5 py-[10px] w-fit rounded-[40px] border-2 border-primarytext ml-auto"
              key={chat.message}
            >
              {chat.message}
            </p>
          );
        } else {
          return (
            <div className="flex items-start justify-start gap-4" key={chat.message}>
              <p className="px-5 py-[10px] w-fit bg-color8-200 text-primarytext rounded-[40px]">
                {renderTextWithBold(chat.message)}
              </p>
            </div>
          );
        }
      })}
      <div className={`${loading ? "block " : "hidden"} loader2`}>
        <p> .</p>
      </div>
    </div>
  );
};

export default ChatMessages;
