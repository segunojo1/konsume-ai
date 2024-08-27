import React from "react";
import { parseBoldText } from "./parseBoldText";

export const renderTextWithBold = (text: any) => {
    const parts = parseBoldText(text);

    return parts.map((part, index) => {
      if (typeof part === "string") {
        return part;
      } else {
        return (
          <React.Fragment key={index}>
            <br />
            {part}
            <br />
          </React.Fragment>
        );
      }
    });
  };