import Image from "next/image";
import mascot from "../../public/mascot1.png";
import paper from "../../public/paper-texture.png";
import blogscard from "../../public/blogs-card.svg";
import timetablecard from "../../public/timetable-card.svg";
import dailymealscard from "../../public/dailymeals-card.svg";
import spotlightmealscard from "../../public/spotlightmeal-card.svg";
import streakscard from "../../public/streaks-card.svg";
import multilanguage from "../../public/multilang-card.svg";
import chatbotcard from "../../public/chatbot-card.svg";
import readwithai from "../../public/read-card.svg";
import onemeal from "../../public/onemeal-card.svg";
import Marquee from "@/components/ui/marquee";

const SectionThree = () => {
  return (
    <div className="font-satoshi bg-primary-bg z-20">
      <div className="md:flex hidden items-center justify-center gap-[136px] pt-[171px] pb-[104px]">
        <div className="relative max-w-[468px]">
          <div className="absolute bottom-[77px] right-6 z-[1]">
            <Image height={186} width={186} alt="mascot" src={mascot} />
          </div>
          <h1 className="text-[54.95px]/[65.94px] font-bold z-[999999] relative">
            Konsume has your meals covered!
          </h1>
        </div>

        <p className="text-[20.58px]/[24.7px] font-medium max-w-[517px]">
          Get personalized meal plans, chat with our AI-powered assistant, scan
          foods for nutritional info, and even generate your own blog—all to
          help you eat better, smarter, and easier.
        </p>
      </div>
      <div id="features" className="relative h-screen flex mt-[46px] md:mt-0">
  <Image
    height={897}
    width={2026}
    alt="mascot"
    src={paper}
    className="h-screen absolute"
  />
  
  <div className="z-50 relative my-auto flex w-full items-center justify-between h-screen">
    <Marquee pauseOnHover className="w-fit items-center h-fit flex gap-0">
    <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={spotlightmealscard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={timetablecard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={blogscard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={dailymealscard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={streakscard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={multilanguage}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={chatbotcard}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={readwithai}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="h-[90vh] flex items-center">
        <Image
          alt="card"
          src={onemeal}
          className="h-full w-auto object-contain"
        />
      </div>
    </Marquee>
  </div>
</div>

    </div>
  );
};

export default SectionThree;
