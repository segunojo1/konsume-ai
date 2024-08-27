import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import React, { ChangeEvent, useState } from "react";
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import upload from "../../public/upload.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const ScannerBody = ({showScanner, setShowScanner}: any) => {
  const API_KEY: string | undefined = process.env.NEXT_PUBLIC_GEMINI_KEY;
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(API_KEY);
  enum HarmBlockThreshold {
    NONE = "NONE",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | StaticImport>("");
  const [bitImage, setBitImage] = useState("");
  const [result, setResult] = useState("");
  const { userGoal, possibleDiseases, name, age, gender, weight } =
    useSetupContext();
  const [queryText, setQueryText] = useState(
    `Whats in this image? Is it a food? What is in this food? with my information like my goal of ${userGoal}, health conditions i have like ${possibleDiseases}`
  );

  const safetySettings: any = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.NONE,
    },
  ];

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement> | any
  ): void => {
    const file: any = event.target.files[0];

    if (file) {
      getBase64(file)
        .then((file: any) => {
          setImage(file);
        })
        .catch((e) => console.log(e));

      generativeFile(file).then((img: any) => {
        setBitImage(img);
      });
    }
  };

  const generativeFile = async (file: any) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader: any = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };
  const getBase64 = (file: File) =>
    new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(`Error: ${error}`);
    });

  const handleRecognize = async (): Promise<void> => {
    if (image) {
      setShowScanner((prev:any) => !prev)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      try {
        setLoading(prev => !prev);
      const result: any = await model.generateContent([queryText, bitImage]);

        const response = await result.response;
        const text = await response.text();
        setResult(text);
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult("");
      } finally {
        setLoading(prev => !prev);
      }
    } else {
      toast.error("Input an image!");
    }
  };
  return (
    <div>
      {
        loading ? (
          <div className="loader m-auto"></div>
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
        <p>Result: {loading ? <LoaderCircle className=" animate-spin" /> : result}</p>
      </div>
            )}
      </div>
        )
      }
      
      
      
    </div>
  );
};

export default ScannerBody;
