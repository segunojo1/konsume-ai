import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import { NutritionalInfoBox } from "./nutritional-info-box";
import { getColorsByMealType, getRandomColor } from "../utils";
import { MealDatatype } from "@/@types/timetable";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type Props = {
  data: MealDatatype;
  className: string;
};

export const MealsInfoCard = ({
  className,
  data: {
    label,
    mealType,
    foodName,
    foodDescription,
    tags,
    cookTime,
    caloriesPerServing,
    nutritionalInfo,
  },
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { primaryColor, secondaryColor } = getColorsByMealType(label);

  return (
    <CardContainer className="inter-var w-full">
      <div
        style={{ backgroundColor: primaryColor }}
        className="lg:min-w-[245px] max-w-[260px] w-full [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d] rounded-[30px] shadow-meal-card px-2 py-6 space-y-[30px]"
      >
        <MealBriefDetail
          bg={secondaryColor}
          name={mealType}
          foodName={foodName}
          foodDescription={foodDescription}
        />
        <Dialog open={isOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)} asChild>
            <CardItem className=" cursor-pointer text-desktop-caption gap-3   flex items-center px-0">
              <CardItem
                rotateZ="30"
                className="  w-max roundsetIsOpen(!isOpen)setIsOpen(!isOpen)ed-[3.8px] bg-neutrals-100 p-[4px] -rotate-[8deg]"
              >
                <ArrowUpRight className="rotate-[14deg]" />
              </CardItem>
              <CardItem translateZ="20" className="font-bold text-[14px]">
                Expand Meal Card
              </CardItem>
            </CardItem>
          </DialogTrigger>
          <DialogContent
            closeIcon={false}
            className="font-satoshi max-w-[363px] 2xl:px-[49px] px-9 shadow-meal-card-modal !rounded-[32px] 2xl:space-y-8 space-y-2 "
          >
            <div className="2xl:space-y-7 space-y-3">
              <MealBriefDetail
                bg={secondaryColor}
                name={mealType}
                foodName={foodName}
                foodDescription={foodDescription}
              />
              <div className="flex justify-between">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="text-desktop-caption gap-3 px-0"
                >
                  <div className=" rounded-[3.8px] bg-neutrals-100 p-[4px] rotate-[8deg]">
                    <ArrowDownRight className="-rotate-[14deg]" />
                  </div>
                  Close Meal Card
                </Button>
                <Image src="/shop-icon.svg" alt="" width={28} height={21} />
              </div>
              <div className="flex flex-wrap gap-[6px] max-w-[184px]">
                {tags &&
                  tags.map((tag, index) => (
                    <TagInfo key={index} bg="#D6FBC4" name={tag} />
                  ))}
              </div>
            </div>
            <div className="bg-base-white p-[10px] rounded-sm shadow-meal-card-modal-last-item 2xl:space-y-10 space-y-4">
              <div className="flex gap-4">
                <div className="py-[10px] px-[24px] space-y-[10px] bg-primary-bg rounded-[5px]">
                  <p className="text-[10px] font-bold ">Cook Time</p>
                  <div className="flex justify-between items-center gap-[10px]">
                    <Clock />
                    <span className="font-bold text-[12px]">
                      {cookTime}mins
                    </span>
                  </div>
                </div>
                <div className="p-[10px] space-y-[10px] bg-primary-bg rounded-[5px]">
                  <p className="text-[10px] font-bold ">Calories per Serving</p>
                  <div className="flex justify-between items-center gap-[10px]">
                    <Clock />
                    <span className="font-bold text-[12px]">
                      {caloriesPerServing} Kcal
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                {nutritionalInfo &&
                  nutritionalInfo.map(({ name, value, unit }, index) => {
                    const bg = getRandomColor("#FFFFFF");
                    return (
                      <NutritionalInfoBox
                        key={index}
                        bg={bg}
                        name={name}
                        value={value}
                        unit={unit}
                      />
                    );
                  })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CardContainer>
  );
};

const MealBriefDetail = ({
  bg,
  name,
  foodName,
  foodDescription,
}: {
  bg: string;
  name: string;
  foodName: string;
  foodDescription: string;
}) => (
  <CardItem
    translateZ="50"
    style={{ backgroundColor: bg }}
    className="relative w-full bg-primary-bg shadow-meal-card-item py-3 px-[14px] rounded-lg space-y-7"
  >
    <CardItem translateZ="10" className="font-bold text-[12px]">
      {name}
    </CardItem>
    <CardItem translateX="10" className="pb-8">
      <p className="text-[15px]  font-bold text-primarygtext">{foodName}</p>
      <p className="text-[11px] text-color8-700">{foodDescription}</p>
    </CardItem>

    <CardItem
      translateY="10"
      className="h-9 rounded-md px-3 bg-base-white text-secondary absolute right-0 bottom-0 text-[12px] p-[10px]"
    >
      View Recipe and Details
    </CardItem>
  </CardItem>
);

const TagInfo = ({ bg, name }: { bg: string; name: string }) => (
  <div
    style={{ backgroundColor: bg }}
    className=" rounded-sm text-[9px] font-medium p-[7px] w-max"
  >
    {name}
  </div>
);
