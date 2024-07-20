import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { axiosKonsumeInstance } from '../../http/konsume';
import { useSetupContext } from '../../context/SetupContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
  pin: z.string().min(5, {
    message: 'Your one-time password must be 5 characters.',
  }),
});
const Otp = () => {
  const { userID } = useSetupContext();
  const route = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const numPin = parseFloat(data.pin);
    console.log(Cookies.get('userid'));

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
    <div className="h-[100vh] font-jakarta">
      <div className="md:p-10 p-6">
        <h1 className="md:text-3xl text-xl font-bold leading-relaxed">Enter 0TP code!</h1>
        <p className="md:text-xl text-sm mb-10">Please enter the 5-digit code sent to your email.</p>
        <div className="imgg_container">
          <div className="signup_img"></div>
          <div className="signup_container md:p-[50px]">
            <div className="signup_content flex flex-col gap-16 items-center">
              {/* <form
                className="signup_content"
              >
                        <input
                          placeholder="Input your email"
                          className="bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                        />
                      <label className="text-sm md:text-xl font-medium !leading-10">Password</label>
                        <input
                          placeholder="Input your password"
                          className=" bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                        />
              </form> */}
              {/* <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className=' ring-[#8DCF38]  ' />
                                    <InputOTPSlot index={1} className='ring-[#8DCF38] ' />
                                    <InputOTPSlot index={2} className='ring-[#8DCF38] ' />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} className='ring-[#8DCF38] ' />
                                    <InputOTPSlot index={4} className='ring-[#8DCF38] ' />
                                    <InputOTPSlot index={5} className='ring-[#8DCF38] ' />
                                </InputOTPGroup>
                            </InputOTP>

                            <div className="flex flex-col gap-3 items-center font-medium text-base">
                                <p>Enter OTP code - </p>
                                <p>Didn't receive the code? Check your spam folder or try resending</p>
                                <p className=' text-[#8DCF38] mt-3'>Resend OTP code</p>
                            </div> */}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 items-center flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center gap-10">
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={5}
                            {...field}
                            className="mx-auto w-fit flex items-center gap-2 has-[:disabled]:opacity-50"
                          >
                            <InputOTPGroup className="flex items-center gap-3">
                              <InputOTPSlot
                                index={0}
                                className="ring-2 rounded ring-[#8DCF38] ring-offset-white  w-[50px] h-[50px]"
                              />
                              <InputOTPSlot index={1} className="ring-[#8DCF38] ring-2 rounded w-[50px] h-[50px]" />
                              <InputOTPSlot index={2} className="ring-[#8DCF38] ring-2 rounded w-[50px] h-[50px]" />

                              <InputOTPSlot index={3} className="ring-[#8DCF38] ring-2 rounded w-[50px] h-[50px]" />
                              <InputOTPSlot index={4} className="ring-[#8DCF38] ring-2 rounded w-[50px] h-[50px]" />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription className="flex flex-col gap-3 items-center font-medium text-base text-center">
                          Enter OTP code - <br />
                          <br />
                          Didn&apos;t receive the code? Check your spam folder or try resending
                          <br />
                          <span className=" text-[#8DCF38] mt-3">Resend OTP code</span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="mt-7 w-fit mx-auto bg-[#8DCF38] py-[7px] px-[84px] rounded-[34.71px] text-[#1E5E08] font-medium text-base leading-7"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
