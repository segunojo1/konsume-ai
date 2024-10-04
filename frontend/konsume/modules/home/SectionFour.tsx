import first from "../../public/firstCollage.svg";
import second from "../../public/secondCollage.svg";
import third from "../../public/thirdcollage.svg";
import fourth from "../../public/fourthCollage.svg";
import fifth from "../../public/fifthCollage.svg";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";

const SectionFour = () => {
  return (
    <div className="bg-color8-200 flex w-full items-center justify-between px-[26px] min-h-[632px]">
  <Marquee className="md:hidden flex">
      <Image src={first} alt="first" className="" width={217} height={162} />
      <Image src={second} alt="first" className="" width={217} height={162} />
      <Image src={third} alt="first" className="" width={217} height={162} />
      <Image src={fourth} alt="first" className="" width={217} height={162} />
      <Image src={fifth} alt="first" className="" width={217} height={162} />
  </Marquee>
  <div className="bg-color8-200 md:flex hidden w-full items-center justify-between px-[26px] min-h-[632px]">
  <Image src={first} alt="first" className="" width={217} height={162} />
      <Image src={second} alt="first" className="" width={217} height={162} />
      <Image src={third} alt="first" className="" width={217} height={162} />
      <Image src={fourth} alt="first" className="" width={217} height={162} />
      <Image src={fifth} alt="first" className="" width={217} height={162} />
      </div>
    </div>
  );
};

export default SectionFour;
