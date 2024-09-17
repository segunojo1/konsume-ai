import React from "react";

type Props = {
  bg: string;
  name: string;
  value: string;
  unit: string;
};

const NutritionalInfoBox = ({ bg, name, value, unit }: Props) => {
  return (
    <div
      style={{ backgroundColor: bg }}
      className="px-3 py-2 rounded-lg backdrop-blur-sm flex justify-between items-center"
    >
      <span className="text-[8px] font-bold">{name}</span>
      <span className="text-[8px] font-bold text-neutrals-100">
        {value}
        {unit}
      </span>
    </div>
  );
};
export default NutritionalInfoBox