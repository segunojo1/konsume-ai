'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { axiosKonsumeInstance } from '@/http/konsume';
import Header from '@/modules/auth/login/Header';
import LoginForm from '@/modules/auth/login/LoginForm';
import SocialLogin from '@/modules/auth/login/SocialLogin';
import Cookies from 'js-cookie';
import { z } from 'zod';
import SignUpLink from '@/modules/auth/login/SignupLink';


// Schema for form validation using zod
const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Clear session-related cookies when the component mounts
    const sessionCookies = ['age', 'gender', 'height', 'diet', 'possibleDiseases', 'goal'];
    sessionCookies.forEach((cookie) => Cookies.remove(cookie));
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission and login
    try {
      toast.info('Signing you in, please wait...');
      const { data } = await axiosKonsumeInstance.post('/api/auth/login', values, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Set user-specific cookies after successful login
      Cookies.set('ktn', data.token);
      Cookies.set('userid', data.value.id);
      Cookies.set('konsumeUsername', data.value.fullName);
      toast.success(data.message);
      checkUser();
    } catch (error: any) {
      toast.error(error?.response?.data);
    }
  };

  const checkUser = async () => {
    // Check if the user's profile is complete
  
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
      if (resp.data.value) {
      //save profile data when found
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
        router.push('/dashboard');
      } else {
        router.push('/setup-account');
      }
    } catch (error) {
      console.error(error);
    }
}
  return (
    <div className="font-satoshi flex flex-col gap-5 w-fit mx-auto pb-5 py-10 px-5">
      <Header />
      <LoginForm form={form} onSubmit={onSubmit} />
      <SocialLogin />
      <SignUpLink />
    </div>
  );
};

export default Login