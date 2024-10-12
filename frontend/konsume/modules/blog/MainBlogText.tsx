import { BlogProps } from "@/@types";
import { axiosKonsumeInstance } from "@/http/konsume";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/UserContext";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Blog {
  text: string | undefined;
  category: string | undefined;
  titlee: string | undefined;
  id: number | undefined;
}
const MainBlogText = ({ id, text, category, titlee }: Blog) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const {getProfileID} = useUserContext();
  const [copied, setCopied] = useState(false);

  // Function to handle copying
  const handleCopy = () => {
    const link = `https://konsume-web-yzto.vercel.app/sharedblog/${id}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);

      // Reset the "Copied" message after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch((error) => {
      console.error('Failed to copy text: ', error);
    });
  };

  //function to format blog text to headers
  const formatText = (etxt: string) => {
    const sections = etxt.split("\n\n");

    return sections.map((section, index) => {
      // Check if ':' exists in the section
      if (section.includes(":")) {
        const [heading, ...rest] = section.split(":");
        return (
          <React.Fragment key={index}>
            <h1 className="text-secondary-500 font-bold text-desktop-feature">
              {heading}
            </h1>
            <p>{rest.join(":")}</p>
          </React.Fragment>
        );
      } else {
        // If no ':' is found, return it as a paragraph
        return (
          <div>
            <p key={index}>{section}</p>
            <p>--</p>
          </div>
        );
      }
    });
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    console.log(bookmarks);

    // Check if the text passed as a prop exists in the array
    const isBookmarked = bookmarks.some(
      (bookmark: { title: string }) =>
        bookmark.title.trim().toLowerCase() === titlee?.trim().toLowerCase()
    );
    if (isBookmarked) {
      setBookmarked(true);
      console.log("in bookmarks");
    } else {
      console.log("not in bookmarks");
    }
  }, [router.query, titlee]);

  //add to bookmarks
  const bookMarkBlog = async () => {
    try {
      if (bookmarked) {
        toast.info("Already bookmarked");
      } else {
        const { data } = await toast.promise(
          axiosKonsumeInstance.post("/api/Bookmark", {
            profileId: await getProfileID(),
            message: text,
            title: titlee,
            category: category,
            url: "no url",
          }),
          {
            pending: "Adding to bookmarks",
            success: "Added to bookmarks 👌",
            error: "Failed to add to bookmarks 🤯",
          }
        );
        setBookmarked(true);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col gap-16 bg-color8-100 rounded-[10px] py-5 px-14 max-w-[900px] mx-auto">
      <div className="flex justify-between ">
        <div className="flex flex-col items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image
              src="/meals.svg"
              alt="meal"
              height={30}
              width={30}
              className=""
            />
            <p className="text-[18px]/[120%] font-bold">By Foodie</p>
          </div>
          <p className="text-desktop-content">.</p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={`${bookmarked ? "/bookmarkfill" : "/bookmark"}.svg`}
            alt="bookmark"
            height={30}
            width={22}
            className="cursor-pointer"
            onClick={bookMarkBlog}
          />
          <Dialog>
      <DialogTrigger asChild>
      <Image
            src="/share.svg"
            alt="share"
            height={25}
            width={22}
            className="cursor-pointer"
          />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`https://konsume-web-yzto.vercel.app/sharedblog/${id}`}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
          {copied ? (
          <span className="text-green-600">Copied!</span> // Show "Copied" message
        ) : (
          <>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </>
        )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          
        </div>
      </div>
      <div>
        <p className="flex flex-col">{formatText(text ?? "")}</p>
        <p className="font-bold mx-auto w-fit">KonsumeAI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
};
export default MainBlogText;
