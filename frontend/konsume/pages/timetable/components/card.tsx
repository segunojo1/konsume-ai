import { cn } from "@/lib/utils";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={cn(className)}>{children}</div>;
};
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(" rounded-[20px] bg-secondary-100 p-5 relative", className)}
    >
      {children}
    </div>
  );
};

Card.Container = Container;

export default Card;
