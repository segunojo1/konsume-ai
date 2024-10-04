import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FAQs = () => {
  return (
    <div>
      <div id="faqs" className="flex flex-col md:flex-row md:gap-[40px] justify-center items-start">
        <div>
          <div className="flex items-center gap-[135px] mt-[64px] mb-[50px]">
            <h1 className="font-bold lg:text-[96px] text-[34px] text-primarytext">
              FAQ&apos;s
            </h1>
            <Image src="/faqimg.svg" alt="" width={151} height={162} className="md:block hidden"/>
          </div>
          <div className="font-satoshi px-[30px] lg:py-8 py-4  lg:text-[40px]/[54px] text-[18px] rounded-t-[8.5px]  w-full max-w-[590px]  border-[2.5px] border-b-0 border-[#030A00]">
            <Accordion
              type="single"
              collapsible
              className="max-h-[700px] overflow-y-scroll custom-scrollbar  w-full font-satoshi  text-[#030A00]"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Konsume, and how does it help with healthy eating?</AccordionTrigger>
                <AccordionContent>
                Konsume is an AI-powered app designed to help you achieve your health and nutrition goals by providing personalized meal recommendations. It tailors 30-day meal plans based on your preferences, health conditions, and goals, and keeps you on track with daily AI-generated blogs and a streak feature.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does Konsume recommend meals based on my health?</AccordionTrigger>
                <AccordionContent>
                Konsume uses advanced algorithms and data from experts to analyze your health conditions, dietary preferences, and goals. Based on this information, it generates customized meal plans and recommendations designed to help you eat healthier.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What features does Konsume offer?</AccordionTrigger>
                <AccordionContent>
                Konsume offers:

AI-powered meal recommendations tailored to your needs.
A 30-day personalized meal timetable.
An AI scanner to identify foods and provide nutritional details.
Daily AI-generated blogs to keep you informed and motivated.
A streak feature to track your progress and stay engaged.
Blog bookmarking and sharing options.
A waitlist for restaurants interested in partnering with Konsume.
Multi-language support for a global audience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How will Konsume integrate restaurants in the future?</AccordionTrigger>
                <AccordionContent>
                We&apos;re working on a feature where partnered restaurants can join Konsume, allowing you to convert the points you earn from streaks into discounts or credits when ordering food. For now, restaurants can sign up for a waitlist, and this feature will be available soon to enhance your dining experience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I personalize the meal recommendations to fit my dietary needs?</AccordionTrigger>
                <AccordionContent>
                Yes! Konsume is designed to adapt to your dietary preferences, whether you're vegan, gluten-free, or managing specific health conditions like diabetes. It takes all this into account to suggest meals that suit your unique needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How does the 30-day meal timetable work?</AccordionTrigger>
                <AccordionContent>
                Konsume generates a personalized 30-day meal plan based on your goals and preferences. The timetable helps you stay consistent, with daily meal recommendations that are easy to follow, and you can view your meal plan by day or week.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger> What is the streak feature, and how does it work?</AccordionTrigger>
                <AccordionContent>
                The streak feature tracks your daily progress, encouraging you to stay consistent with your health goals by reading AI-generated blogs and engaging with the app regularly. In the future, you will also be able to earn points from streaks, which can be converted into discounts or money to order food from partnered restaurants. Currently, streaks focus on helping you monitor your health journey.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div id="contact" className="bg-primarygtext rounded-[10px] md:mt-[275px] px-[22px] py-5 flex flex-col gap-[30px] w-full max-w-[484px]">
          <div className="flex relative">
            <h1 className="text-primary-bg-100 text-[82px]/[78px]">
              Reach Out
              <span className="text-[#BEFFA7]"> to Us.</span>
            </h1>
            <img
              src="/star1.svg"
              alt=""
              className="absolute bottom-0 right-20"
            />
          </div>
          <Input
            className="w-full p-[10px]  border-[3px] border-[#BEFFA7] rounded-[38px] bg-[transparent] py-[10px] focus:bg-[transparent] focus:border-[#BEFFA7] text-[#ffffff7e] text-[23px]/[60px] font-normal"
            placeholder="Email Address"
          />
          <Textarea
            placeholder=" Type your Message"
            rows={10}
            className="  border-[3px] border-[#BEFFA7] rounded-[38px] bg-[transparent] focus:bg-[transparent] focus:border-[#BEFFA7] text-[#ffffff7e] text-[23px] font-normal"
          />
          <Button className="w-full text-[23px]/[60px] bg-[#BEFFA7] rounded-[38px]">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
