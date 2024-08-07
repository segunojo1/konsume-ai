import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
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
import Image from 'next/image';
import { gsap } from 'gsap'

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
  const router = useRouter();
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
      Cookies.set('userid', data.value.id, { secure: true });
      setUserID(data.value.id);
      router.push('/auth/otp');
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
    toast.error(errorMessage);
    console.error(error);
  };

  const [currentPosition, setCurrentPosition] = useState(0); // 0 for first button, 160 for second button
  const gssRef = useRef(null);

  const animateTo = (targetPos: any) => {
    const currentPos = gsap.getProperty(gssRef.current, "x");
    if (currentPos !== targetPos) {
      gsap.to(gssRef.current, {
        x: targetPos,
        duration: .5,
        onComplete: () => {
          setCurrentPosition(targetPos);
        },
      });
    }
  };

  const handleFirstButtonClick = () => {
    console.log("hi");
    
    animateTo(0);
  };

  const handleSecondButtonClick = () => {
    animateTo(160);
  };
  return (
    <div className="font-satoshi gap-5 flex-col flex w-fit mx-auto pb-5">
      <div className='flex flex-col items-center gap-[23px] max-w-[767px] pb-8'>
        <div className='flex items-center gap-4 relative w-fit'>
          <h1 className='text-[55.02px]/[89.4px] font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] '>Thank you for </h1>
          <div className=' '>
            <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='absolute top-5 -right-[14px] -z-10' />
            <h1 className=' text-[55px]/[120%] italic font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] z-50'>Joining Us</h1>
          </div>
        </div>
        <p className='text-desktop-feature text-center'>Create your account to embark on a healthier, happier lifestyle, <br />
          <b className='italic'>Choose your account type.</b>
        </p>
        <div className=' text-[22.4px]/[120%] font-normal px-5 py-[10px] flex items-center relative w-fit  drop-shadow-[0_2px_2px_rgba(0,0,0,0.14)] rounded-[10px] bg-primary-bg-main'>
          <div className=' gss bg-neutrals-200 w-[146.4px] h-[43.2px] -z-10 absolute rounded-md' ref={gssRef}>
            <p className='hidden'>Personal</p>
          </div>
          <div className='py-2 px-[30px] w-fit cursor-pointer' onClick={handleFirstButtonClick} >
            <p>Personal</p>
          </div>
          <div className='py-2 px-[30px] w-fit cursor-pointer' onClick={handleSecondButtonClick}>
            <p>Restaurants</p>
          </div>
        </div>
      </div>

      <div className='max-w-[402.5px] mx-auto'>
        <h3 className='text-desktop-highlight font-bold mb-16'>Sign up for yourself and get personalized meal<br /> recommendations, progress tracking, and more.</h3>
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className=" flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="FirstName"
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel className=" text-[19.63px]/[120%] font-bold mb-2 ">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your first name"
                            {...field}
                            className="font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
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
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-[19.63px]/[120%] font-bold">Last Name</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Input your last name"
                            {...field}
                            className=" font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
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
                      <FormItem className='flex flex-col gap-2'>
                        <FormLabel className="text-[19.63px]/[120%] font-bold">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your email"
                            {...field}
                            className=" font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
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
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-[19.63px]/[120%] font-bold">Password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Input your password"
                            type="password"
                            {...field}
                            className="font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
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
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-[19.63px]/[120%] font-bold">Confirm Password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Confirm your password"
                            {...field}
                            type="password"
                            className="font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] bg-primary-bg outline-none shadow-shad"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col justify-between gap-10 mt-8">
                  <Button
                    className="mx-auto bg-[#8DCF384D] p-[10px] flex-[.7] border-2 w-full border-[#D6FBC4] rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold min-h-[52px]"
                    type="submit"
                  >
                    Continue
                  </Button>
                  <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
                  <Button
                    className=" mx-auto bg-[#8DCF384D] p-[10px] flex-[.7] border-2 w-full border-[#D6FBC4] rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
                    type="submit"
                  >
                    <Image src="/assets/google.png" width={32} height={32} alt='google'/>
                    Sign up with Google
                  </Button>
                  <div className='font-bold text-desktop-content text-center'>
                    Already have an account?{' '}
                    <Link href="/auth/login" className="  text-secondary">
                      Login
                    </Link>{' '}
                  </div>
                </div>
              </form>
            </Form>
      </div>
    </div>
  );
};

export default Signup;
