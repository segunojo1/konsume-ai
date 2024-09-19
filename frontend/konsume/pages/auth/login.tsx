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
import { useUserContext } from '@/context/UserContext';


// Schema for form validation using zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const Login = () => {
  const router = useRouter();
  const { profileID } = useUserContext();
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
    const id = toast.loading("Processing...")
try {
  const {data} = await axiosKonsumeInstance.post('/api/auth/login', values, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  toast.update(id, { render: `Welcome back ${data.value.fullName}👨‍🍳!`, type: "success", isLoading: false, autoClose: 2000 });
  // Set user-specific cookies after successful login
  Cookies.set('ktn', data.token);
  Cookies.set('userid', data.value.id);
  if(typeof window !== 'undefined'){
    localStorage.setItem('konsumeUsername', data.value.fullName);
  }
  checkUser();
} catch (error: any) {
  toast.update(id, { render: `${error?.response?.data}😞`, type: "error", isLoading: false, autoClose: 2000 });
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
          Userid: Cookies.get('userid'),
        },
      });
      console.log(resp);
      if (resp.data.value) {
      //save profile data when found
      
      
        const { data } = await axiosKonsumeInstance.get(`/api/profile/${profileID}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('ktn')}`,
          },
        });
        console.log(data);
        
        Cookies.set('age', data?.value?.age);
        Cookies.set('gender', data?.value?.gender);
        Cookies.set('weight', data?.value?.weight);
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
    <div className="font-satoshi flex flex-col gap-5 w-fit mx-auto pb-5 py-10 px-2 md:px-5">
      <Header />
      <LoginForm form={form} onSubmit={onSubmit} />
      <SocialLogin />
      <SignUpLink />
    </div>
  );
};

export default Login