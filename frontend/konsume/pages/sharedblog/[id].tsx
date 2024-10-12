import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { axiosKonsumeInstance } from "@/http/konsume";
import MainBlogText from "@/modules/blog/MainBlogText";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type blogData = {
  $id: string;
  id: number;
  title: string;
  category: string;
  text: string;
};

const SharedBlog = () => {
  const router = useRouter();
  const { id } = router.query; // Extract id from query params
  const [blog, setBlog] = useState<blogData | null>(null); // Use null as the initial state to check if data is loaded
  const [loading, setLoading] = useState(true); // Add loading state to handle the initial fetch state

  useEffect(() => {
    const getBlogContent = async () => {
      if (!id) return; // Ensure id is available before making the request
      try {
        const { data } = await axiosKonsumeInstance.get(
          `/api/Blog/GetBlogById/${id}`
        );
        console.log(data);
        setBlog(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (id) {
      getBlogContent(); // Call the function only when id is available
    }
  }, [id]);

  // Render a loading message or spinner until blog data is available
  if (loading) {
    return (
      <MainLayout
        topBarIcon="blog"
        topBarText="Blogs"
        fixedTopbar={true}
        className="relative"
      >
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // Conditionally render content only when blog data exists
  if (!blog) {
    return (
      <MainLayout
        topBarIcon="blog"
        topBarText="Blogs"
        fixedTopbar={true}
        className="relative"
      >
        <div className="flex justify-center items-center">
          <p>Blog not found.</p>
        </div>
      </MainLayout>
    );
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
        <Link href="/auth/signup">
          <Image
            alt="banner"
            width={999}
            height={263}
            src="/blogbanner1.png"
            className=""
          />
        </Link>
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
      </div>
    </MainLayout>
  );
};

export default SharedBlog;
