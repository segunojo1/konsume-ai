import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0", className)}
      classNames={{
        months:
          "flex flex-col  sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-between pt-1 relative items-center",
        caption_label: "text-sm font-medium ",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 "
        ),
        nav_button_previous:
          "bsolute right-4 !rounded-[100%] bg-[#393939] duration-150 !opacity-100 hover:!opacity-80 hover:bg-[#393939]/80 !w-[28px] !h-[28px]",
        nav_button_next:
          "abolute right-1 !rounded-[100%] bg-[#393939] duration-150 !opacity-100 hover:!opacity-80 hover:bg-[#393939]/80 !w-[28px] !h-[28px]",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground rounded-md w-7 text-[8.35px]/[120%] font-bold",
        row: "flex w-full justify-between items-center mt-2",
        cell: "flex h-7 w-7 text-center text-sm w-full p-0  relative [&:has([aria-selected].day-range-end)]:rounded-r-[100%] [&:has([aria-selected].day-range-start)]:rounded-l-[100%] [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-[#D3D3D3] first:[&:has([aria-selected])]:rounded-l-[100%] last:[&:has([aria-selected])]:rounded-r-[100%] focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal text-[8.35px]/[120%] font-bold aria-selected:opacity-100 hover:bg-[#393939]/50 rounded-[100%]"
        ),
        day_range_end: "day-range-end",
        day_range_start: "day-range-start",
        day_selected:
          "bg-[#393939] text-base-white hover:bg-primary  hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-[#393939]/50 text-base-white",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-[inherit] aria-selected:text-accent-foreground ",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" color="white" strokeWidth="4px" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" color="white" strokeWidth="4px" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
