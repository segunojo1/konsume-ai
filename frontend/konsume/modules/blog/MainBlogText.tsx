import { BlogProps } from "@/@types";
import { axiosKonsumeInstance } from "@/http/konsume";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Blog {
    text: string | undefined;
    category: string | undefined;
    titlee: string | undefined;
}
const MainBlogText = ({ text, category, titlee }: Blog) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);

  //function to format blog text to headers
  const formatText = (etxt: string) => {
    const sections = etxt.split("\n\n");

    return sections.map((section, index) => {
      // Check if ':' exists in the section
      if (section.includes(":")) {
        const [heading, ...rest] = section.split(":");
        return (
          <React.Fragment key={section}>
            <h1 className="text-secondary-500 font-bold text-desktop-feature">
              {heading}
            </h1>
            <p>{rest.join(":")}</p>
          </React.Fragment>
        );
      }
      // If no ':' is found, return it as a paragraph
      return (
        <div key={section}>
          <p>{section}</p>
          <p>--</p>
        </div>
      );
    });
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    console.log(bookmarks);

    // Check if the title passed as a prop exists in the array
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
            profileId: Cookies.get("userid"),
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
          <p className="text-desktop-content">3rd, Aug. 2024</p>
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
          <Image
            src="/share.svg"
            alt="share"
            height={25}
            width={22}
            className=""
          />
        </div>
      </div>
      <div>
        <p className="flex flex-col">{text && formatText(text)}</p>
      </div>
    </div>
  );
};
export default MainBlogText;