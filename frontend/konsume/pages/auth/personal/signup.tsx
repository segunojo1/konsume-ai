import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSetupContext } from '@/context/SetupContext';
import { axiosKonsumeInstance } from '@/http/konsume';
import OtpModal from '@/modules/OtpModal';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z
  .object({
    FirstName: z.string().min(1, { message: 'First name is required' }),
    LastName: z.string().min(1, { message: 'Last name is required' }),
    Email: z.string().min(1, { message: 'Email is required' }),
    Password: z.string().min(6, { message: 'Password must be more than six characters' }),
    ConfirmPassword: z.string().min(6, { message: 'Passwords does not match' }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });
const signup = () => {

  const { userID, setUserID } = useSetupContext();
  const [showOtp, setShowOtp] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      toast.info('Creating your account... please wait');

      const { data } = await axiosKonsumeInstance.post('/api/auth/register', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(data.message);
      sessionStorage.setItem('userid', data.value.id);
      sessionStorage.setItem("konsumeUsername", values.FirstName)
      setUserID(data.value.id);
      setShowOtp((prev) => !prev)
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    const errorMessage = error?.response?.data || 'An unexpected error occurred';
    toast.error(errorMessage);
    console.error(error);
  };

  return (
    <div className='py-10 mx-auto max-w-[358px] font-satoshi'>
      <div>
        <h3 className=' text-desktop-content font-bold mb-8'>Sign up for yourself and get personalized meal recommendations, progress tracking, and more.</h3>
      </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="FirstName"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className=" text-[17.7px]/[120%] font-bold  ">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input your first name"
                          {...field}
                          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="LastName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel className="text-[17.7px]/[120%] font-bold">Last Name</FormLabel>
                      <FormControl className="">
                        <Input
                          placeholder="Input your last name"
                          {...field}
                          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className="text-[17.7px]/[120%] font-bold">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input your email"
                          {...field}
                          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[17.7px]/[120%] font-bold">Password</FormLabel>
                      <FormControl className="">
                        <Input
                          placeholder="Input your password"
                          type="password"
                          {...field}
                          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px]"
                        />
                      </FormControl>
                      <FormMessage className='block' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ConfirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[17.7px]/[120%] font-bold">Confirm Password</FormLabel>
                      <FormControl className="">
                        <Input
                          placeholder="Confirm your password"
                          {...field}
                          type="password"
                          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="  bg-[#8DCF384D] p-[10px] border-2 w-[348.9px] h-fit bottom-0 border-[#D6FBC4] rounded-[30px] text-desktop-highlight font-bold min-h-[52px]"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
              <div className="flex flex-col justify-between gap-8 mt-8">
                <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
                <Button
                  className=" mx-auto  p-[10px] flex-[.7] border-2 w-[350px] border-primary-bg-800 rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
                  type="submit"
                >
                  <Image src="/assets/google.png" width={32} height={32} alt='google' />
                  Sign up with Google
                </Button>

              </div>
            </form>
            <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
          Already have an account?{' '}
          <Link href="/auth/login" className="  text-secondary">
            Login
          </Link>{' '}
        </div>
          {showOtp && <OtpModal />}
          </Form>
    </div>
  )
}

export default signup