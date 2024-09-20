import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OtpModal from "@/modules/OtpModal";
import { useState } from "react";
import { axiosKonsumeInstance } from "@/http/konsume";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SignupActions } from "./SignupActions";
import { SignupFields } from "./SignupFields";

const formSchema = z.object({
  Datee: z.string().min(1, { message: "Date of establishemnt is required" }),
  Location: z.string().min(1, { message: "Loation is required" }),
  Name: z.string().min(1, { message: "Restaurant name is required" }),
  Email: z.string().min(6, { message: "Email is required" }),
  Password: z.string().min(6, { message: "Passwordis required" }),
});

export const SignupForm = () => {
  const [showOtp, setShowOtp] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Datee: "",
      Location: "",
      Name: "",
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await toast.promise(
        axiosKonsumeInstance.post(
          "/api/Restaurant",
          {
            Datee: values.Datee,
            Location: values.Location,
            Name: values.Name,
            cac: "cac",
            Email: values.Email,
            Password: values.Password,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ),
        {
          pending: "Processing...",
          success: `Restaurant account succesfully added to waitlist!👌`,
          error: `Failed to create your account 🤯`,
        }
      );
      // Cookies.set('userid', data.value.id);

      // setShowOtp(true);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    const errorMessage =
      error?.response?.data || "An unexpected error occurred";
    toast.error(errorMessage);
    console.error(error);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <SignupFields />
        <SignupActions />
      </form>
      {/* {showOtp && <OtpModal />} */}
    </Form>
  );
};
