import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card } from "./card";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

type Props = {};

export const RightPanel = (props: Props) => {
  const [user, setUser] = useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  useEffect(() => {
    const user = Cookies.get("konsumeUsername")!;
    const [firstName] = user.split(" ");
    setUser(firstName);
  }, []);

  return (
    <aside>
      <section>
        <h1 className=" text-desktop-heading4 font-bold">Hello, {user}!</h1>
      </section>
      <div>
        <Card.Container>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            className=""
          />
        </Card.Container>
      </div>
    </aside>
  );
};
