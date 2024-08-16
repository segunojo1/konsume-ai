import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSetupContext } from "@/context/SetupContext"
import { axiosKonsumeInstance } from "@/http/konsume"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const FormSchema = z.object({
    pin: z.string().min(5, {
        message: "Your one-time password must be 5 characters.",
    }),
})

const OtpModal = () => {
    const route = useRouter();
    const {userID} = useSetupContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast.success(`${data.pin} done`)
        try {
            toast.info('Verifying code...');
            const resp = await axiosKonsumeInstance.get(`/api/VerificationCode/VerifyCode/${data.pin}/${userID}`);
            console.log(resp);
            toast.success(resp.data.message);
            route.push('/auth/login');
          } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.title);
          }
    }

    return (
        <div className="fixed backdrop-blur-sm mx-auto w-fit right-0 left-0 top-10">
            <div className="max-w-[700px] flex flex-col items-center gap-8 border-[3px] border-secondary-100 p-6 rounded-[32px]">
                <div className='md:text-desktop-heading2 text-mobile-heading1 flex items-center gap-4 relative w-fit mb-3'>
                    <h1 className='font-bold '>Please enter </h1>
                    <div className=' '>
                        <Image src='/curved_line2.png' alt='curved line' height={41.5} width={282} className='md:w-[232px] w-[141px] absolute top-1 xl:top-1 right-2 -z-10' />
                        <h1 className=' font-bold '>OTP code!</h1>
                    </div>
                </div>
                <p className="md:text-desktop-feature text-mobile-highlight">Please Enter 6-digit code sent to your email.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" mx-auto space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <h3 className=" md:text-desktop-highlight text-desktop-caption font-bold text-center">Enter OTP code - <br />
                    Didn't receive the code? Check your spam folder or try resending</h3>
                <p className="md:text-desktop-feature text-desktop-highlight font-bold text-secondary-900">Resend OTP code</p>
            </div>

        </div>
    )
}

export default OtpModal