import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { axiosKonsumeInstance } from "@/http/konsume";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const formSchema = z.object({
  nationality: z.string().min(1, { message: "Nationality is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  weight: z.number().min(1, { message: "Weight is required" }),
  allergies: z.string(),
  height: z.number().min(1, { message: "height is required" }),
  dietType: z.string(),
  userGoals: z.array(z.string()),
});
const EditProfileModal = () => {
  const {
    username,
    email,
    nationality,
    userGoals,
    allergies,
    DOB,
    weight,
    gender,
    dietType,
    setUpdating,
    getProfileDetails,
    updating,
    profileID
  } = useUserContext();

  useEffect(() => {
    getProfileDetails();
  }, [updating])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: gender,
      height: 2147483647,
      weight: weight,
      nationality: nationality,
      dietType: dietType,
      allergies: allergies[0],
      userGoals: userGoals,
    },
  });
  const requestBody = {
    dateOfBirth: "2024-09-17",
    gender: "Female",
    height: 2147483647,
    weight: 2147483647,
    nationality: "string",
    dietType: "string",
    allergies: ["string"],
    userGoals: ["string"],
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const { data } = await toast.promise(
        axiosKonsumeInstance.put(
          `/api/profile/${profileID}`,
          {
            gender: values.gender,
            height: 2147483647,
            weight: values.weight,
            nationality: values.nationality,
            dietType: values.dietType,
            allergies: [values.allergies],
            userGoals: values.userGoals,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("ktn")}`,
            },
            params: { id: profileID }, // Adding id to the params object
          }
        ),
        {
          pending: "Updating...",
          success: `Profile updated!👌`,
          error: `Failed update your profile 🤯`,
        }
      );
      setUpdating(!updating);
      console.log("Profile updated successfully:", data);
    } catch (error: any) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid md:grid-cols-2 w-full gap-2 md:gap-5 "
            >
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-[14px]/[21px] md:text-xl font-medium">
                      Weight - kg
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your weight"
                        {...field}
                        type="number"
                        value={field.value || ""} // Ensures value is not `undefined`
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || "")
                        }
                        className="h-[37px] pt-[5px] pb-[9px] px-[9px] md:p-3"
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
                    <FormLabel className="text-[14px]/[21.6px] md:text-xl font-medium">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-[37px] pt-[5px] pb-[9px] px-[9px] md:p-3 bg-primary-bg">
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent ref={field.ref} className=" ">
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
                    <FormLabel className="text-[14px]/[21.6px] md:text-xl font-medium">
                      Nationality
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Input your nationality"
                        {...field}
                        className="h-[37px]  md:p-3 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="allergies"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px]/[21.6px] md:text-xl font-medium">
                      Allergies
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-[37px] pt-[11px] pb-[14px] px-[14px] md:p-3 bg-primary-bg">
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select your allergy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent ref={field.ref} className=" ">
                        <SelectItem value="Diabetes" className="">
                          Diabetes
                        </SelectItem>
                        <SelectItem value="Hypertension" className="">
                          Hypertension
                        </SelectItem>
                        <SelectItem value="Food allergies" className="">
                          Food allergies
                        </SelectItem>
                        <SelectItem value="Digestive issues" className="">
                          Digestive issues
                        </SelectItem>
                        <SelectItem value="Cholesterol management" className="">
                          Cholesterol management
                        </SelectItem>
                        <SelectItem
                          value="Vegetarian/vegan preferences"
                          className=""
                        >
                          Vegetarian/vegan preferences
                        </SelectItem>
                        <SelectItem value="Gluten sensitivity" className="">
                          Gluten sensitivity
                        </SelectItem>
                        <SelectItem value="Lactose intolerance" className="">
                          Lactose intolerance
                        </SelectItem>
                        <SelectItem value="Nut allergies" className="">
                          Nut allergies
                        </SelectItem>
                        <SelectItem
                          value="Fish and Shellfish allergies (Shrimps, Tuna, Salmon, Crab, e.t.c)"
                          className=""
                        >
                          Fish and Shellfish allergies (Shrimps, Tuna, Salmon,
                          Crab, e.t.c)
                        </SelectItem>
                        <SelectItem
                          value="Grain and Legume-Based Allergies (Wheat, Soy, e.t.c)"
                          className=""
                        >
                          Grain and Legume-Based Allergies (Wheat, Soy, e.t.c)
                        </SelectItem>
                        <SelectItem value="None" className="">
                          None
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="dietType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px]/[21.6px] md:text-xl font-medium">
                      Diet Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-[37px] pt-[11px] pb-[14px] px-[14px] md:p-3 bg-primary-bg">
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select your allergy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent ref={field.ref} className=" ">
                        <SelectItem value="Vegetarian" className="">
                          Vegetarian
                        </SelectItem>
                        <SelectItem value="Vegan" className="">
                          Vegan
                        </SelectItem>
                        <SelectItem value="Pascatarian" className="">
                          Pascatarian
                        </SelectItem>
                        <SelectItem value="Keto" className="">
                          Keto
                        </SelectItem>
                        <SelectItem value="Paleo" className="">
                          Paleo
                        </SelectItem>
                        <SelectItem value="Mediterranean" className="">
                          Mediterranean
                        </SelectItem>
                        <SelectItem value="Other" className="">
                          Other
                        </SelectItem>
                        <SelectItem value="None" className="">
                          None
                        </SelectItem>
                        <SelectItem
                          value="Improve Cardiovascular Health"
                          className=""
                        >
                          Improve Cardiovascular Health
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogClose>
              <Button
                type="submit"
                className=" mt-7 flex items-center justify-center mx-auto p-2 w-full h-[2.9rem] text-primary-bg-100 bg-primarygtext"
              >
                Save Changes
              </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
