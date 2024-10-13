import React from "react";
import ChatQuestion from "@/modules/chat/ChatQuestion";
import Marquee from "@/components/ui/marquee";

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
    <div className=" gap-4 mt-3 flex-wrap items-center  justify-center">
      <Marquee className="">
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Is it okay to eat chocolate every day?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="What's a good vegan protein source."
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="What's a healthy recipe for oatmeal?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="What are some healthy dessert options?"
        />
      </Marquee>
      <Marquee className="">
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Is coconut oil good for cooking?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Can I eat junk food and still stay fit?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Show me workout plans for weight loss."
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="How does eating pizza affect my health?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Do you have a recipe for gluten-free bread?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="Can I drink alcohol if I&apos;m on a diet?"
        />
      </Marquee>
      <Marquee className="">
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="What foods help improve stamina?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="How does eating too much red meat affect me?"
        />
        <ChatQuestion
          isContentReplaced={isContentReplaced}
          setIsContentReplaced={setIsContentReplaced}
          sendMessage={sendMessage}
          img="/chatlogo.svg"
          text="What are the healthiest fruits to eat daily?"
        />
      </Marquee>
    </div>
  );
};

export default ChatQuestions;
