// pages/blog/[id].tsx

import { BlogProps } from "@/@types";
import MainLayout from "@/components/Layout/MainLayout";
import { axiosKonsumeInstance } from "@/http/konsume";
import MainBlogText from "@/modules/blog/MainBlogText";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route ID
  const [blog, setBlog] = useState<BlogProps | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Track loading state
  const { profileID } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!id) return; // Wait until 'id' is available

    const fetchBlogData = async () => {
      try {
        // Check localStorage for the blog
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        const selectedBlog = blogs.find((blog: any) => blog.id === id);

        if (selectedBlog) {
          // Blog found in localStorage
          setBlog(selectedBlog);
        } else {
          // Blog not found, fetch from API
          const { data } = await axiosKonsumeInstance.get(
            `/api/Blog/GetBlogByGuid/${id}`
          );

          if (data) {
            setBlog(data);
            console.log("blog fetchedd");

            // Save blog to localStorage
            const updatedBlogs = [...blogs, data];
            localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
          }
        }
      } catch (error) {
        console.error("Error fetching blog from API:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogData();
  }, [id]); // Trigger effect whenever 'id' changes

  useEffect(() => {
    const addToStreaks = async () => {
      if (!profileID) return; // Guard for profileID
      try {
        const { data } = await axiosKonsumeInstance.get(
          "/api/Streak/update-reading-streak",
          {
            params: { profileId: profileID },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    addToStreaks();
  }, [profileID]);

  useEffect(() => {
    // Check if 'ktn' cookie is present
    const token = Cookies.get("ktn");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <MainLayout
      topBarIcon="blog"
      topBarText="Blogs"
      fixedTopbar={true}
      className="relative"
    >
      <div className="shadow-inner absolute cursor-pointer rounded-full hover:shadow-md">
        <Image
          alt="logo"
          width={31}
          height={31}
          src="/backbtn.png"
          onClick={() => router.back()}
        />
      </div>
      <div className="font-satoshi mt-7 gap-8 flex items-center flex-col">
        {!isLoggedIn && (
          <Link href="/auth/signup">
            <Image
              alt="banner"
              width={999}
              height={263}
              src="/blogbanner1.png"
              className=""
            />
          </Link>
        )}
        <div className="flex justify-center max-w-[975px] w-full relative mx-auto">
          <div className="relative">
            <Image
              src="/curved_line.svg"
              alt="curved line"
              height={500}
              width={282}
              className="2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute left-0 -z-10"
            />
            <h1 className="text-desktop-heading4 font-bold z-50">
              {blog.title}
            </h1>
          </div>
          <Image
            alt="logo"
            width={40}
            height={40}
            src="/blogplaceholder.svg"
            className="absolute right-0"
          />
        </div>
        <MainBlogText
          id={blog.id}
          text={blog.text}
          category={blog.category}
          titlee={blog.title}
        />
        {!isLoggedIn && (
        <div className="flex flex-col relative overflow-hidden bg-[#000000] bg-[url(/bgblog.png)] bg-cover h-[436px] w-full rounded-[20px] p-20 mb-[100px] items-center justify-center gap-6">
          <Image
            alt="logo"
            width={258}
            height={148}
            src="/blogasset.png"
            className="absolute -top-2"
          />
          <Image
            alt="logo"
            width={223}
            height={231}
            src="/blogasset1.png"
            className="absolute -bottom-2"
          />
          <h1 className="font-bold text-[34px] text-[#EDFAE7]">
            Join Konsume today!
          </h1>
          <div className="flex gap-6 items-center">
            <Button className="font-[14px]/[120%] font-bold w-[150px] bg-[#0C2503] text-[#D6FBC4]">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
            <Button className="font-[14px]/[120%] font-bold w-[150px] text-[#0C2503] bg-[#D6FBC4]">
              <Link href="/auth/login">Log in</Link>
            </Button>
          </div>
        </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogDetail;
