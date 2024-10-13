
import React, { useContext } from "react";
import upload from "../../public/upload.svg";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScannerContext from "@/context/ScannerContext";
import { renderTextWithBold } from "@/helpers/renderTextWithBold";
import Markdown from "react-markdown";

const ScannerBody = () => {

  const {loading, image, handleRecognize, handleImageChange, result, showScanner} :any = useContext(ScannerContext)
  return (
    <div>
      {
        loading ? (
          <div className="loader "></div>
        ) : (
          <div>
            {showScanner ? (
<div>
        <div className="border-[2.6px] border-primarygtext flex flex-col md:flex-row gap-3 items-center justify-center bg-base-white md:w-[450px] py-6 rounded-[19.7px] mx-auto font-jakarta">
          {image !== "" && (
            <Image
              src={image}
              width={150}
              height={150}
              alt="img"
              className="w-[150px] rounded-md flex-[.5]"
            />
          )}

          <div className="flex flex-col gap-4 items-center mx-auto flex-[.5] border">
            <Image src={upload} alt="upload" />
            <p>Upload Image.</p>
            <p>Drag and Drop files or...</p>
            <div className="file-input-wrapper">
              <input type="file" id="fileInput" onChange={handleImageChange} />
              <label className="file-input-label" htmlFor="fileInput">
                Choose a file
              </label>
            </div>
            <div id="fileName"></div>
          </div>
        </div>
        <Button
          className=" p-4 w-fit bg-[#B0D2C1] mx-auto flex mt-3"
          onClick={handleRecognize}
        >
          Recognize Image
        </Button>
        </div>
            ) : (
              <div className=" bg-color8-200 px-[30px] py-5 max-w-[800px] rounded-[40px] flex flex-col gap-4">
                <Image
              src={image}
              width={150}
              height={150}
              alt="img"
              className="w-[150px] rounded-md flex-[.5]"
            />
        <p>Result: {loading ? <LoaderCircle className=" animate-spin" /> : <Markdown>{result}</Markdown>}</p>
      </div>
            )}
      </div>
        )
      }
      
      
      
    </div>
  );
};

export default ScannerBody;
