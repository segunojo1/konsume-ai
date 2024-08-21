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
      // Cookies.set('konsumeUsername', data.value.fullName);
      Cookies.set('userid', data.value.id);
      Cookies.set('konsumeUsername', data.value.fullName)
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
        console.log(data);
        
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
    <div className="font-satoshi gap-5 flex-col flex w-fit mx-auto pb-5 py-10 px-5">
      <div className='absolute left-20 top-0 bottom-0 my-auto h-fit p-2 bg-primary-bg w-fit rounded-full shadow-[0_1px_4px_0_rgba(12,12,13,0.5)] cursor-pointer' >
        <Image src='/assets/google.png' width={32} height={32} alt='google' />
      </div>
      <div className='flex flex-col items-center 2xl:gap-[36px] gap-3 max-w-[767px] '>
        <div className='flex items-center gap-4 relative w-fit'>
          <h1 className='2xl:text-desktop-heading2 lg:text-[42.67px]/[120%] text-mobile-heading1 font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] '>Thank you for </h1>
          <div className=' '>
            <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute 2xl:top-5 xl:top-1 2xl:-right-[14px] xl:-right-[48px] -z-10' />
            <h1 className=' 2xl:text-[55px]/[120%] lg:text-[42.67px]/[120%] text-mobile-heading1 italic font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] z-50'>Joining Us</h1>
          </div>
        </div>

      </div>
      {/* <Image src='/assets/back-gradient.png' width={473.93} height={241.42} alt='gradient' className='rounded-[61469.42px] absolute'/> */}
      {/* <div className='2xl:w-[473.93px] lg:w-[401px] 2xl:h-[241.42px] lg:h-[214px] rounded-[61469.42px] mx-auto bg-neutrals-100 fixed top-[180px] left-0 right-0 -z-10 blur-[170.6px]'></div> */}
      <div className='max-w-[807px] mx-auto'>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-col items-center">
            <div className=" flex flex-col gap-6 w-full ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className="text-[19.63px]/[120%] font-bold">Email</FormLabel>
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
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-[19.63px]/[120%] font-bold">Password</FormLabel>
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
            </div>
            <Button
              className=" mt-8 mx-auto bg-[#8DCF384D] p-[10px] border-2 w-[348.9px] h-fit border-[#D6FBC4] rounded-[30px] text-desktop-highlight font-bold min-h-[52px]"
              type="submit"
            >
              Continue
            </Button>

          </form>
          <div className="flex flex-col justify-between gap-4 mt-4">
            <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
            <Button
              className=" mx-auto  p-[10px] flex-[.7] border-2 w-[350px] border-primary-bg-800 text-primarygtext rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
              type="submit"
            >
              <Image src="/assets/google.png" width={32} height={32} alt='google' />
              Sign in with Google
            </Button>
          </div>
          <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
            Dont have an account?{' '}
            <Link href="/auth/signup" className="  text-secondary">
              Sign up
            </Link>{' '}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
