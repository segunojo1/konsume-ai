import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OtpModal from '@/modules/OtpModal';
import { useState } from 'react';
import { axiosKonsumeInstance } from '@/http/konsume';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { SignupActions } from './SignupActions';
import { SignupFields } from './SignupFields';


const formSchema = z.object({
  FirstName: z.string().min(1, { message: 'First name is required' }),
  LastName: z.string().min(1, { message: 'Last name is required' }),
  Email: z.string().min(1, { message: 'Email is required' }),
  Password: z.string().min(6, { message: 'Password must be more than six characters' }),
  ConfirmPassword: z.string().min(6, { message: 'Passwords do not match' }),
}).refine((data) => data.Password === data.ConfirmPassword, {
  path: ['ConfirmPassword'],
  message: 'Passwords do not match',
});

export const SignupForm = () => {
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
    try {
      const {data} = await toast.promise(
        axiosKonsumeInstance.post('/api/auth/register', values, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
        {
          pending: 'Creating your account...',
          success: `Welcome to Konsume ${values.FirstName} 👌`,
          error: 'Failed to create your account 🤯'
        })
      Cookies.set('userid', data.value.id);
      Cookies.set('konsumeUsername', values.FirstName);
      setShowOtp(true);
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
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <SignupFields />
        <SignupActions />
        </form>
        {showOtp && <OtpModal />}
      </Form>
  );
};
