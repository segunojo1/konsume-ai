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
import OtpModal from '@/modules/OtpModal';

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
        ease: "power1.in",
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
    animateTo(150);
  };

  const section2Ref = useRef(null);

  const scrollToSection = (sectionRef: any) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="font-satoshi gap-5 flex-col flex w-fit mx-auto pb-5 py-10 px-5">
      <div className='absolute left-20 top-0 bottom-0 my-auto h-fit p-2 bg-primary-bg w-fit rounded-full shadow-[0_1px_4px_0_rgba(12,12,13,0.5)] cursor-pointer' onClick={() => scrollToSection(section2Ref)}>
        <Image src='/assets/google.png' width={32} height={32} alt='google'/>
      </div>
      <div className='flex flex-col items-center 2xl:gap-[36px] gap-3 max-w-[767px] '>
        <div className='flex items-center gap-4 relative w-fit mb-3'>
          <h1 className='2xl:text-desktop-heading2 lg:text-[42.67px]/[120%] text-mobile-heading1 font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] '>Thank you for </h1>
          <div className=' '>
            <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute 2xl:top-5 xl:top-1 2xl:-right-[14px] xl:-right-[48px] -z-10' />
            <h1 className=' 2xl:text-[55px]/[120%] lg:text-[42.67px]/[120%] text-mobile-heading1 italic font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] z-50'>Joining Us</h1>
          </div>
        </div>
        <p className='lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center'>Create your account to embark on a healthier, happier lifestyle, <br />
        </p>
        <b className='italic lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center'>Choose your account type.</b>
        <div className=' 2xl:text-[22.4px]/[120%] lg:text-[19.9px]/[120%] font-normal px-5 py-[10px] flex items-center relative w-fit  drop-shadow-[0_2px_2px_rgba(0,0,0,0.14)] rounded-full bg-primary-bg-main'>
          <div className=' gss bg-neutrals-200 w-[130.4px] h-[38.4px] -z-10 absolute rounded-full' ref={gssRef}>
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
      {/* <Image src='/assets/back-gradient.png' width={473.93} height={241.42} alt='gradient' className='rounded-[61469.42px] absolute'/> */}
      <div className='2xl:w-[473.93px] lg:w-[401px] 2xl:h-[241.42px] lg:h-[214px] rounded-[61469.42px] mx-auto bg-neutrals-100 fixed top-[180px] left-0 right-0 -z-10 blur-[170.6px]'></div>
      <div className='max-w-[807px] mx-auto'>
        <h3 className='lg:text-[16px]/[120%] 2xl:text-desktop-highlight  w-fit mx-auto'>Sign up for yourself and get personalized meal<br /> recommendations, progress tracking, and more.</h3>
        <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
          Already have an account?{' '}
          <Link href="/auth/login" className="  text-secondary">
            Login
          </Link>{' '}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className=" grid lg:grid-cols-2 grid-cols-1 gap-y-7 gap-x-16 items-end">
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
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-[19.63px]/[120%] font-bold">Last Name</FormLabel>
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
                name="Password"
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
                    <FormMessage className='block'/>
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
                className=" mx-auto bg-gradient-to-r hover:from-[#ebd68a80] hover:via-[#f0aeae53] hover:to-[#9fe8728a] p-[10px] flex-[.7] border-2 w-[350px] border-[#D6FBC4] rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
                type="submit"
                ref={ section2Ref}
              >
                <Image src="/assets/google.png" width={32} height={32} alt='google' />
                Sign up with Google
              </Button>

            </div>
          </form>
        </Form>
      </div>

      {/* <OtpModal /> */}
    </div>
  );
};

export default Signup;
