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
  nationality: z.string().min(1, { message: "Nationality is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
});
const BioData = () => {
  const {
    nextPage,
    age,
    setAge,
    nationality,
    setNationality,
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
      nationality: nationality,
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
    setNationality(values.nationality);
    setGender(values.gender);
    localStorage.setItem("biodata", JSON.stringify(values));
    nextPage();
  }
  return (
    <div className="mt-16 bg-[transparent] z-60 relative mx-auto max-w-[391px]">
      <div className="relative ">
        <div className="">
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" flex flex-col w-full  gap-6 md:gap-5 "
            >
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[18px]/[120%] md:text-desktop-content">
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Input your age"
                        {...field}
                        className="h-[48px] pt-[11px] pb-[14px] px-[14px] md:p-6 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-[18px]/[120%] md:text-[16px]">
                      Weight - kg
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your weight"
                        {...field}
                        type="number"
                        className="h-[48px] pt-[11px] pb-[14px] px-[14px] md:p-6"
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
                    <FormLabel className="text-[18px]/[21.6px] md:text-xl font-medium">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-[48px] pt-[11px] pb-[14px] px-[14px] md:p-6 bg-primary-bg">
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        ref={field.ref}
                        className=" "
                      >
                        <SelectItem value="Male" className="">
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
                name="nationality"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-[18px]/[21.6px] md:text-desktop-content font-medium">
                      Nationality
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your nationality"
                        {...field}
                        className="h-[48px] pt-[11px] pb-[14px] px-[14px] md:p-6 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="mt-16 flex items-center justify-center mx-auto p-2 w-full h-[2.9rem] text-primary-bg-100 bg-primarygtext"
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BioData;
