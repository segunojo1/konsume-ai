import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { axiosKonsumeInstance } from '../../http/konsume';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useSetupContext } from '../../context/SetupContext';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
const Signup = () => {
  const route = useRouter();
  const { userID, setUserID } = useSetupContext();

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      toast.info('Creating your account... please wait');
      const { data } = await axiosKonsumeInstance.post('/api/auth/register', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(data.message);
      Cookies.set('userid', data.value.id);
      setUserID(data.value.id);
      console.log(data);
      route.push('/auth/otp');
    } catch (error: any) {
      toast.error(error?.response?.data);
    }
  }
  // const signupWithGoogle = async () => {
  //   try {
  //     const { data } = await axiosKonsumeInstance.get('/api/account/google-response');
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="h-[100vh] font-jakarta">
      <div className="md:p-10 p-2">
        <h1 className="md:text-3xl text-xl font-bold">Sign Up to Konsume</h1>
        <p className="md:text-xl text-sm">Please provide your information to create an account</p>
        <div className="imgg_container">
          <div className="signup_img"></div>
          <div className="signup_container md:p-[50px]">
            {/* <form className="signup_content md:p-[20px] grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-2 md:gap-y-16 gap-y-7">
              <div className="grid mx-auto">
                <label htmlFor="name" className="text-sm md:text-xl font-bold">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  className="bg-[#D6FBC4] p-2 text-sm md:text-lg  md:p-6 rounded-full outline-none"
                />
              </div>
              <div className="grid mx-auto">
                <label htmlFor="email" className="text-sm md:text-xl font-bold">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  id="email"
                  className="bg-[#D6FBC4] text-sm md:text-lg p-2 md:p-6 rounded-full outline-none"
                />
              </div>
              <div className="grid mx-auto">
                <label htmlFor="password" className="text-sm md:text-xl font-bold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="bg-[#D6FBC4] p-2  text-sm md:text-lg  md:p-6 rounded-full outline-none"
                />
              </div>
            </form>
            <button
              type="submit"
              className="md:py-[7px] py-1 md:px-[84px] px-2 bg-[#8DCF38] rounded-[34.71px] mx-auto w-fit flex"
            >
              Join Now
            </button> */}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="signup_content grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-2 md:gap-y-10 gap-y-7">
                  <FormField
                    control={form.control}
                    name="FirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm md:text-xl font-medium !leading-10">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your first name"
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
                    name="LastName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-sm md:text-xl font-medium !leading-10">Last Name</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Input your last name"
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
                    name="Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm md:text-xl font-medium !leading-10">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your email"
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
                    name="Password"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-sm md:text-xl font-medium !leading-10">Password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Input your password"
                            type="password"
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
                    name="ConfirmPassword"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-sm md:text-xl font-medium !leading-10">Confirm Password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Confirm your password"
                            {...field}
                            type="password"
                            className="  h-[48px] bg-[#D6FBC4] py-[5.5px] pr-[31.45px] pl-[14.8px] md:p-6 rounded-full outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col justify-between gap-10 mt-8">
                  <Button
                    className="mx-auto bg-[#8DCF384D] p-[10px] flex-[.7] border-2 w-full border-[#D6FBC4] rounded-[30px] flex items-center gap-[10px]"
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <div>
                    Already have an account?{' '}
                    <Link href="/auth/login" className=" font-semibold underline">
                      Login
                    </Link>{' '}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
