import React from "react";
import ChatQuestion from "@/modules/chat/ChatQuestion";

interface ChatQuestionsProps {
  isContentReplaced: boolean;
  setIsContentReplaced: (value: boolean) => void;
  sendMessage: (event: any) => void;
}

const ChatQuestions: React.FC<ChatQuestionsProps> = ({
  isContentReplaced,
  setIsContentReplaced,
  sendMessage,
}) => {
  return (
    <div className="flex gap-4 max-w-[1000px] flex-wrap items-center mx-auto justify-center">
      <ChatQuestion
        isContentReplaced={isContentReplaced}
        setIsContentReplaced={setIsContentReplaced}
        sendMessage={sendMessage}
        img="/chatlogo.svg"
        text="Generate the recipe for the perfect Jollof Rice."
      />
      <ChatQuestion
        isContentReplaced={isContentReplaced}
        setIsContentReplaced={setIsContentReplaced}
        sendMessage={sendMessage}
        img="/chatlogo.svg"
        text="Provide The nutrition Info for Egusi Soup."
      />
      <ChatQuestion
        isContentReplaced={isContentReplaced}
        setIsContentReplaced={setIsContentReplaced}
        sendMessage={sendMessage}
        img="/chatlogo.svg"
        text="Show me workout plans for weight loss."
      />
    </div>
  );
};

export default ChatQuestions;
