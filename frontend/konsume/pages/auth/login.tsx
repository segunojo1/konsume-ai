'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import google from '../../public/assets/google.png';
import Image from 'next/image';
import axios from 'axios';
import { axiosKonsumeInstance } from '../../http/konsume';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSetupContext } from '../../context/SetupContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
const Login = () => {
  const route = useRouter();
  const {
    setPossibleDiseases,
    setUserGoal,
    setWeight,
    setDiet,
    setAge,
    age,
    gender,
    weight,
    diet,
    possibleDiseases,
    userGoal,
  } = useSetupContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    Cookies.remove('age');
    Cookies.remove('gender');
    Cookies.remove('height');
    Cookies.remove('diet');
    Cookies.remove('possibleDiseases');
    Cookies.remove('goal');
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    console.log('login');
    try {
      toast.info('Signing you in, please wait...');
      const { data } = await axiosKonsumeInstance.post('/api/auth/login', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Cookies.set('ktn', data.token);
      Cookies.set('konsumeUsername', data.value.fullName);
      Cookies.set('userid', data.value.id);

      toast.success(data.message);
      checkUser();

      console.log(data);
    } catch (error: any) {
      toast.error(error?.response?.data);
    }
  }

  const checkUser = async () => {
    try {
      const resp = await axiosKonsumeInstance.get('/api/profile/profileByUserId', {
        headers: {
          Authorization: `Bearer ${Cookies.get('ktn')}`,
        },
        params: {
          id: Cookies.get('userid'),
        },
      });
      console.log(resp);

      // setPossibleDiseases(data?.value?.allergies.$values);
      // setUserGoal(data?.value?.userGoals.$values);
      // setWeight(data?.value?.weight);
      // setDiet(data?.value?.dietType);
      // setAge(data?.value?.age);
      if (resp.data.value) {
        // setPossibleDiseases(data?.value?.allergies.$values);
        // setUserGoal(data?.value?.userGoals.$values);
        // setWeight(data?.value?.weight);
        // setDiet(data?.value?.dietType);
        // setAge(data?.value?.age);
        const { data } = await axiosKonsumeInstance.get(`/api/profile/${Cookies.get('userid')}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('ktn')}`,
          },
        });
        Cookies.set('age', data?.value?.age);
        Cookies.set('gender', data?.value?.gender);
        Cookies.set('height', data?.value?.weight);
        Cookies.set('diet', data?.value?.dietType);
        Cookies.set('possibleDiseases', data?.value?.allergies.$values);
        Cookies.set('goal', data?.value?.userGoals.$values);
        console.log(data);
        route.push('/dashboard');
      } else {
        route.push('/setup-account');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-[100vh] font-jakarta">
      <div className="md:p-10 p-6">
        <h1 className="md:text-3xl text-xl font-bold leading-relaxed">Welcome Back!</h1>
        <p className="md:text-xl text-sm mb-10  rounded-">
          Your personalized Nutrition journey awaits.
          <br /> Please log in to continue.
        </p>
        <div className="relative w-[83%] m-auto">
          <div className="signup_img"></div>
          {/* <div className="signup_container md:p-[50px]">
                        <form  className="signup_content grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-2 md:gap-y-16 gap-y-7">
                            <div className="grid ">
                                <label htmlFor="email" className=" text-sm md:text-xl font-bold">Email</label>
                                <input type="text" placeholder="Email Address" id="email" className=" bg-[#D6FBC4] p-3 md:p-6 rounded-full outline-none"/>
                            </div>
                            <div className="grid ">
                                <label htmlFor="password" className=" text-sm md:text-xl font-bold">Password</label>
                                <input type="password" placeholder="Password" id="password" className=" bg-[#D6FBC4] p-3 md:p-6 rounded-full outline-none"/>
                            </div>
                        </form>
                        <button type="submit" className="py-[7px] px-[84px] bg-[#8DCF38] rounded-[34.71px] mx-auto w-fit flex">Login</button>
                    </div> */}
          {/* input */}
          <div className="signup_container md:p-[50px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="signup_content grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-2 md:gap-y-10 gap-y-7">
                  <FormField
                    control={form.control}
                    name="email"
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
                    name="password"
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
                </div>
                <div className="flex flex-col justify-between gap-10 mt-8 ">
                  <Button
                    className="mx-auto bg-[#8DCF384D] p-[10px] flex-[.7] border-2 w-full border-[#D6FBC4] rounded-[30px] flex items-center gap-[10px]"
                    type="submit"
                  >
                    Login
                  </Button>
                  <div>
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/signup" className="font-semibold underline">
                      Signup
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

export default Login;
