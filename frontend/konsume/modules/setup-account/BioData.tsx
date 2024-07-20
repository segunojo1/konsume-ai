import Image from "next/image";
import line from "../../public/assets/line.png";
import React from "react";
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z, { number } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  age: z.string().min(1, { message: "Dob is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
});
const BioData = () => {
  const {
    nextPage,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    gender,
    setGender,
  } = useSetupContext();
  const checkForm = () => {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: age,
      height: height,
      gender: gender,
      weight: weight,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setAge(values.age);
    setWeight(values.weight);
    setHeight(values.height);
    setGender(values.gender);
    localStorage.setItem("biodata", JSON.stringify(values));
    nextPage();
  }
  return (
    <div className="mt-12">
      <div className="relative w-[83%] m-auto">
        <h1 className=" font-bold text-4xl leading-[73px]">
          Basic Information
        </h1>
        <div className="dash_img"></div>
        <div className="signup_container md:p-[50px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="signup_content grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-2 md:gap-y-16 gap-y-7"
            >
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-xl font-medium !leading-10">
                      Date of birth
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Input your age"
                        {...field}
                        className="h-[48px] bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm md:text-xl font-medium !leading-10">
                      Height - m
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your height"
                        {...field}
                        className="h-[48px] bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-xl font-medium !leading-10">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-[48px] bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] w-full md:p-6 rounded-full outline-none">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        ref={field.ref}
                        className="bg-[#D6FBC4] py-[5.5px] px-16 w-full"
                      >
                        <SelectItem value="Male" className="w-full">
                          Male
                        </SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm md:text-xl font-medium !leading-10">
                      Weight - kg
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your height"
                        {...field}
                        className=" h-[48px] bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=" right-0 left-0 -bottom-16 absolute w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center mx-auto"
              >
                <Image
                  alt="line"
                  src={line}
                  width="30"
                  height="30"
                  className=" rotate-180"
                />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BioData;
