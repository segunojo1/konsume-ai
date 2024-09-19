import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  userMessage: string;
  handleMessage: (e: any) => void;
  handleEnter: (event: any) => void;
  sendMessage: (event: any) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  userMessage,
  handleMessage,
  handleEnter,
  sendMessage,
}) => {
  return (
    <form className="w-full lg:mt-20 xl:mt-28">
      <div className="relative w-full">
        <Input
          value={userMessage ?? ""}
          onChange={handleMessage}
          onKeyDown={handleEnter}
          placeholder="Message FoodieAI"
          className="shadow-inner focus:bg- rounded-[40px] px-5"
        />
        <button type="submit" className="absolute right-5 my-auto top-0 bottom-0">
          <Image
            alt="kons"
            src="/arrowup.svg"
            width={43} // You need to specify width here
            height={43} // You need to specify height here
            className="md:w-[43px] w-[30px]"
            onClick={sendMessage}
          />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
